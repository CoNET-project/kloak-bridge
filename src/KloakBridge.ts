import EncryptHelper from './EncryptHelper';
import IDBDatabaseHelper from './IDBDatabaseHelper';
import {
    KeyChainContainer, KeyChain,
    PGPGenerateOptions, PGPKeys,
    KeyResolve, CreateContainerResolve,
    UnlockContainerResolve, CheckContainerResolve,
    LockContainerResolve, ChangeKeyContainerResolve,
    DeleteKeychainResolve, EncryptSaveResolve, RetrieveDecryptResolve, UnlockKeyResolve
} from './define';
import DisassemblyHelper from './DisassemblyHelper';
import AssemblyHelper from './AssemblyHelper';
import { getUUIDv4 } from './utils';
import KeyContainer from './KeyContainer';

class KloakBridge {

    private uploadHelpers: {[name: string]: DisassemblyHelper} = {};
    private assemblyHelpers: {[name: string]: AssemblyHelper} = {};
    public keyContainer: KeyContainer | undefined
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
            if (this.keyContainer) {
                return resolve(['ALREADY_UNLOCKED']);
            }
            const [status, keyChainContainer] = await this.checkKeyContainer();
            switch (status) {
                case 'EXISTS':
                    if (keyChainContainer?.pgpKeys && keyChainContainer?.keyChain) {
                        const tempEncrypt = new EncryptHelper();
                        const [checkStatus, pgpKeys] = await tempEncrypt.checkPassword(keyChainContainer?.pgpKeys, passphrase);
                        console.log('UNLOCK CONTAINER', checkStatus, pgpKeys);
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
                const [, containerPGPKey] = await tempEncrypt.generateKey({ passphrase });
                await tempEncrypt.checkPassword(containerPGPKey as PGPKeys, passphrase);
                const keyChain: KeyChain = {
                    device: {},
                    kloak: {},
                    apps: {}
                };
                const [, deviceKey] = await tempEncrypt.generateKey({ passphrase: '' });
                const [, kloakKey] = await tempEncrypt.generateKey({ passphrase: '' });
                keyChain.device = deviceKey as PGPKeys;
                keyChain.kloak = kloakKey as PGPKeys;
                const [, encryptedKeyChain] = await tempEncrypt.encryptMessage(JSON.stringify({}));
                const keyContainer: KeyChainContainer = {
                    pgpKeys: {
                        keyID: containerPGPKey?.keyID as string,
                        armoredPrivateKey: containerPGPKey?.armoredPrivateKey as string,
                        armoredPublicKey: containerPGPKey?.armoredPublicKey as string
                    },
                    keyChain: encryptedKeyChain as string
                };
                this.keyContainer = new KeyContainer(tempEncrypt, keyChain);
                await this.IDBHelper.save('KeyContainer', keyContainer);
                return resolve(<CreateContainerResolve>['SUCCESS', keyContainer]);
            } catch (err) {
                console.log(err);
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

    public addAppID = async (appKeyID: string, publicKey: string) => this.keyContainer?.addAppID(appKeyID, publicKey);
    public addAppKey = async (appKeyID: string, pgpKeys: PGPKeys) => this.keyContainer?.addAppKey(appKeyID, pgpKeys);
    public getKey = async (appKeyID: string, keyId?: string) => this.keyContainer?.getKey(appKeyID, keyId)
    /**
     * Change password from KeyChainContainer.
     */
    public changeKeyContainer = (oldPassphrase: string, newPassphrase: string): Promise<ChangeKeyContainerResolve> => (
        new Promise<ChangeKeyContainerResolve>(async (resolve, _) => {
            const tempEncrypt = new EncryptHelper();
            const [, newPGPKeys] = await tempEncrypt.generateKey({ passphrase: newPassphrase });
            try {
                const oldContainer: KeyChainContainer = await this.IDBHelper.retrieve('keyContainer');
                const [status] = await tempEncrypt.checkPassword(oldContainer.pgpKeys, oldPassphrase);
                if (status === 'SUCCESS') {
                    const [, decryptedKeyChain] = await tempEncrypt.decryptMessage(oldContainer.keyChain);
                    await tempEncrypt.checkPassword(newPGPKeys as PGPKeys, newPassphrase);
                    const [, encryptedKeyChain] = await tempEncrypt.encryptMessage(JSON.stringify(decryptedKeyChain));
                    const newContainer: KeyChainContainer = {
                        pgpKeys: newPGPKeys as PGPKeys,
                        keyChain: encryptedKeyChain as string
                    };
                    await this.IDBHelper.save('keyContainer', JSON.stringify(newContainer));
                    this.keyContainer = new KeyContainer(tempEncrypt, decryptedKeyChain as unknown as KeyChain);
                    return resolve(['SUCCESS', newContainer ]);
                }
                return resolve(['FAILURE']);
            } catch (err) {
                return resolve(['FAILURE']);
            }
            // const tempEncrypt = new EncryptHelper();
            // const [, pgpKeys] = await tempEncrypt.generateKey({ passphrase: newPassphrase });
            // await tempEncrypt.checkPassword(pgpKeys as PGPKeys, newPassphrase);
            // const [, encryptedKeyChain] = await tempEncrypt.encryptMessage(JSON.stringify(keyChain));
            // const newContainer: KeyChainContainer = {
            //     pgpKeys: {
            //         keyID: (pgpKeys?.keyID as string),
            //         armoredPrivateKey: (pgpKeys?.armoredPrivateKey as string),
            //         armoredPublicKey: (pgpKeys?.armoredPublicKey as string)
            //     },
            //     keyChain: encryptedKeyChain as string
            // };
            // return resolve(<ChangeKeyContainerResolve>['SUCCESS', newContainer]);
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

    public encryptWithDeviceKey = (data: string): Promise<[status: 'SUCCESS' | 'FAILURE', encryptedData?: string]> => (
        new Promise<[status: 'SUCCESS' | 'FAILURE', encryptedData?: string]>(async (resolve, _) => {
            if (!this.keyContainer) {
                return resolve(['FAILURE']);
            }
            try {
                const devicePGPKey = this.keyContainer.getKeyChain().device;
                const tempEncrypt = new EncryptHelper();
                await tempEncrypt.checkPassword(devicePGPKey as PGPKeys, '');
                const [status, encryptedMessage] = await tempEncrypt.encryptMessage(data);
                if (status === 'SUCCESS') {
                    return resolve(['SUCCESS', encryptedMessage]);
                }
                return resolve(['FAILURE']);
            } catch (err) {
                return resolve(['FAILURE']);
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
