import EncryptHelper from './EncryptHelper';
import IDBDatabaseHelper from './IDBDatabaseHelper';
import {
    KeyChainContainer, KeyChain,
    KeyPairType,
    PGPGenerateOptions, PGPKeys,
    KeyResolve, CreateContainerResolve,
    UnlockContainerResolve, CheckContainerResolve,
    LockContainerResolve, ChangeKeyContainerResolve,
    DeleteKeychainResolve, EncryptSaveResolve, RetrieveDecryptResolve, UnlockKeyResolve
} from './define';
import DisassemblyHelper from './DisassemblyHelper';
import AssemblyHelper from './AssemblyHelper';
import { createRandomValues, getUUIDv4 } from './utils';
import KeyContainer from './KeyContainer';

class KloakBridge {

    private uploadHelpers: {[name: string]: DisassemblyHelper} = {};
    private assemblyHelpers: {[name: string]: AssemblyHelper} = {};
    private keyContainer: KeyContainer | undefined
    private IDBHelper = new IDBDatabaseHelper();

    public lockKeyContainer = (): Promise<LockContainerResolve> => (
        new Promise<LockContainerResolve>((resolve, _) => {
            this.keyContainer = undefined;
            return resolve(<LockContainerResolve>['SUCCESS']);
        })
    )

    /**
     * Check if IndexedDB contains a "KeyChainContainer".
     */
    public checkKeyContainer = (): Promise<CheckContainerResolve> => (
        new Promise<CheckContainerResolve>(async (resolve, _) => {
            const keyChainContainer: KeyChainContainer = await this.IDBHelper.retrieve('KeyContainer');
            if (!keyChainContainer) {
                return resolve(<CheckContainerResolve>['DOES_NOT_EXIST']);
            }
            return resolve(<CheckContainerResolve>['EXISTS', keyChainContainer]);
        })
    );

    /**
     * Unlock a "KeyChainContainer".
     * If no KeyChainContainer exists in IndexedDB, return error.
     */
    public unlockKeyContainer = (passphrase: string): Promise<UnlockContainerResolve> => (
        new Promise<UnlockContainerResolve>(async (resolve, _) => {
            const [status, keyChainContainer] = await this.checkKeyContainer();
            switch (status) {
                case 'EXISTS':
                    if (keyChainContainer?.pgpKeys && keyChainContainer?.keyChain) {
                        const tempEncrypt = new EncryptHelper();
                        const [checkStatus] = await tempEncrypt.checkPassword(keyChainContainer?.pgpKeys, passphrase);
                        if (checkStatus === 'SUCCESS') {
                            const [, decryptedKeyChain] = await tempEncrypt.decryptMessage(keyChainContainer?.keyChain);
                            this.keyContainer = new KeyContainer(tempEncrypt, decryptedKeyChain as unknown as KeyChain);
                            return resolve(['SUCCESS']);
                        }
                        return resolve(['INVALID_PASSPHRASE']);
                    }
                    return resolve(['MISSING_KEYCHAIN']);

                case 'DOES_NOT_EXIST':
                    return resolve(['MISSING_CONTAINER']);
                default:
                    break;
            }
        })
    )

    /**
     * Create a KeyChainContainer and save into IndexedDB.
     */
    public createKeyContainer = (passphrase: string): Promise<CreateContainerResolve> => (
        new Promise<CreateContainerResolve>(async (resolve, _) => {
            try {
                const tempEncrypt = new EncryptHelper();
                const [, pgpKeys] = await tempEncrypt.generateKey({ passphrase });
                await tempEncrypt.checkPassword(pgpKeys as PGPKeys, passphrase);
                const keyChain: KeyChain = {
                    deviceKey: {},
                    kloakAccountKey: {},
                    storageKey: {},
                    messengerKeys: {},
                    applicationKeys: {}
                };
                keyChain.deviceKey = await tempEncrypt.generateKey({ passphrase: await createRandomValues() });
                keyChain.kloakAccountKey = await tempEncrypt.generateKey({ passphrase: await createRandomValues() });
                keyChain.storageKey = await tempEncrypt.generateKey({ passphrase: await createRandomValues() });
                const [, encryptedKeyChain] = await tempEncrypt.encryptMessage(JSON.stringify(keyChain));
                const keyContainer: KeyChainContainer = {
                    pgpKeys: {
                        keyID: pgpKeys?.keyID as string,
                        armoredPrivateKey: pgpKeys?.armoredPrivateKey as string,
                        armoredPublicKey: pgpKeys?.armoredPublicKey as string
                    },
                    keyChain: encryptedKeyChain as string
                };
                this.keyContainer = new KeyContainer(tempEncrypt, keyChain);
                await this.IDBHelper.save('KeyContainer', keyContainer);
                return resolve(<CreateContainerResolve>['SUCCESS', keyContainer]);
            } catch (err) {
                return resolve(<CreateContainerResolve>['FAILURE']);
            }
        })
    );

    /**
     * Delete KeyChainContainer from IndexedDB.
     */
    public deleteKeyContainer = (): Promise<DeleteKeychainResolve> => (
        new Promise<DeleteKeychainResolve>(async (resolve, _) => {
            try {
                await this.IDBHelper.delete('KeyContainer');
                return resolve(<DeleteKeychainResolve>['SUCCESS']);
            } catch (err) {
                return resolve(<DeleteKeychainResolve>['FAILURE']);
            }
        })
    )

    public getKeyChain = () => this.keyContainer?.getKeyChain()

    public addApplicationKey = async (appID: string, pgpKeys: PGPKeys) => this.keyContainer?.addApplicationKey(appID, pgpKeys);

    public setKey = async (keyType: 'device' | 'kloak' | 'storage' | 'messenger', pgpKeys: PGPKeys): Promise<boolean | undefined> => this.keyContainer?.setKey(keyType, pgpKeys)

    public getKey = (keyType: KeyPairType, keyID?: string, appID?: string): Promise<PGPKeys | {}> | undefined => this.keyContainer?.getKey(keyType, keyID, appID)

    /**
     * Change password from KeyChainContainer.
     */
    public changeKeyContainer = (newPassphrase: string, keyChain: KeyChain): Promise<ChangeKeyContainerResolve> => (
        new Promise<ChangeKeyContainerResolve>(async (resolve, _) => {
            const tempEncrypt = new EncryptHelper();
            const { keyID, armoredPrivateKey, armoredPublicKey } = (await tempEncrypt.generateKey({ passphrase: newPassphrase }))[1] as PGPKeys;

            await tempEncrypt.checkPassword({ keyID, armoredPublicKey, armoredPrivateKey }, newPassphrase);
            const [, encryptedKeyChain] = await tempEncrypt.encryptMessage(JSON.stringify(keyChain));
            const newContainer: KeyChainContainer = {
                pgpKeys: {
                    keyID,
                    armoredPrivateKey,
                    armoredPublicKey
                },
                keyChain: encryptedKeyChain as string
            };
            return resolve(<ChangeKeyContainerResolve>['SUCCESS', newContainer]);
        })
    )

    /**
     * Create an OpenPGP key pair.
     */
    public createKey = (options: PGPGenerateOptions, unlock?: boolean): Promise<KeyResolve> => (
        new Promise<KeyResolve>(async (resolve, _) => {
            const tempEncrypt = await new EncryptHelper();
            const [, pgpKeys] = await tempEncrypt.generateKey(options);
            if (unlock) {
                try {
                    const [status] = await tempEncrypt.checkPassword(pgpKeys as PGPKeys, options.passphrase);
                    (pgpKeys as PGPKeys).unlocked = status === 'SUCCESS';
                } catch (err) {
                    return resolve(<KeyResolve><unknown>['FAILURE', null]);
                }
            }
            return resolve(<KeyResolve>['SUCCESS', pgpKeys]);
        })
    )

    /**
     * Unlock an OpenPGP key pair.
     */
    public unlockKey = (pgpKeys: PGPKeys, passphrase: string): Promise<UnlockKeyResolve> => (
        new Promise<UnlockKeyResolve>(async (resolve, _) => {
            try {
                const tempEncrypt = await new EncryptHelper();
                const [status] = await tempEncrypt.checkPassword(pgpKeys, passphrase);
                if (status === 'SUCCESS') {
                    return resolve(<UnlockKeyResolve>['SUCCESS', tempEncrypt]);
                }
                return resolve(<UnlockKeyResolve>['INVALID_PASSPHRASE']);

            } catch (err) {
                return resolve(<UnlockKeyResolve>['FAILURE']);
            }
        })
    )

    public retrieve = (uuid: string): Promise<any> => this.IDBHelper.retrieve(uuid);

    public save = (uuid: string, data: any): Promise<any> => this.IDBHelper.save(uuid, data);

    public delete = (uuid: string): Promise<any> => this.IDBHelper.delete(uuid);

    public encryptSave = (encryptHelper: EncryptHelper, data: ArrayBuffer | Uint8Array | string, uuid?: string): Promise<EncryptSaveResolve> => (
        new Promise<EncryptSaveResolve>(async (resolve, _) => {
            if (!encryptHelper.isUnlocked()) {
                return resolve(['FAILURE']);
            }
            try {
                const [, encryptedMessage] = await encryptHelper.encryptMessage(data);
                await this.save(uuid || getUUIDv4(), encryptedMessage);
                return resolve(['SUCCESS']);
            } catch (err) {
                return resolve(['FAILURE', err]);
            }
        })
    )

    public retrieveDecrypt = (encryptHelper: EncryptHelper, uuid: string, buffer?: boolean): Promise<RetrieveDecryptResolve> => (
        new Promise<RetrieveDecryptResolve>(async (resolve, reject) => {
            if (!encryptHelper.isUnlocked()) {
                return resolve(['FAILURE']);
            }
            try {
                const encryptedMsg = await this.retrieve(uuid);
                const [, decryptedMsg] = await encryptHelper.decryptMessage(encryptedMsg, buffer);
                return resolve(['SUCCESS', decryptedMsg as string]);
            } catch (err) {
                return reject(err);
            }
        })
    )

    // public upload = (encryptInstance: string, source: File | Blob, callback: (err: Error | null, progress: number, done: boolean) => void): Promise<string> => (
    //     new Promise<string>((resolve, _) => {
    //         const uuid = getUUIDv4();
    //         const disassemblyHelper = new DisassemblyHelper(source, async (err, current, next) => {
    //             if (err) {
    //                 return callback(err, 0, !next);
    //             }
    //             if (current && current.progress && current.chunk) {
    //                 try {
    //                     this.encryptSave(encryptInstance, current.chunk.data, current.chunk.uuid).then(() => {
    //                         if (next) {
    //                             next();
    //                         }
    //                         callback(null, current.progress as number, !next);
    //                     });
    //                     if (current.metadata && current.index) {
    //                         await this.encryptSave(encryptInstance, JSON.stringify(current.index), uuid);
    //                         // SHOULD STORE THIS METADATA INTO A MASTER STORAGE LIST
    //                         console.log(current.metadata, current.index);
    //                         return resolve(uuid);
    //
    //                     }
    //                 } catch (error) {
    //                     return callback(err, 0, !next);
    //                 }
    //             }
    //         });
    //         this.uploadHelpers[uuid] = disassemblyHelper;
    //     })
    // )
    //
    // public download = (encryptInstance: string, uuid: string, callback: (err: Error | null, progress: number) => void): Promise<unknown> => (
    //     new Promise<unknown>(async (resolve, reject) => {
    //         const index: KloakFileIndex = await this.retrieveDecrypt(encryptInstance, uuid);
    //         const assemblyHelper: AssemblyHelper = new AssemblyHelper(index, async (error, progress, nextChunk, data) => {
    //             if (error) {
    //                 return reject(new Error(error));
    //             }
    //             if (progress) {
    //                 callback(null, progress);
    //             }
    //             if (nextChunk) {
    //                 const data = await this.retrieveDecrypt(encryptInstance, nextChunk, true);
    //                 console.log(data);
    //                 return assemblyHelper.append(nextChunk, data);
    //             }
    //             if (data) {
    //                 callback(null, 100);
    //                 return resolve(uuid);
    //             }
    //         });
    //         this.assemblyHelpers[uuid] = assemblyHelper;
    //     })
    // )
}

export default KloakBridge;
