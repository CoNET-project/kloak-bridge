import EncryptHelper from './EncryptHelper';
import IDBDatabaseHelper from './IDBDatabaseHelper';
import { KeyChainContainer, KeyChain, KeyPairType, KloakFileIndex, PGPGenerateOptions, PGPKeys } from './define';
import DisassemblyHelper from './DisassemblyHelper';
import AssemblyHelper from './AssemblyHelper';
import { createRandomValues, getUUIDv4 } from './utils';
import KeyContainer from './KeyContainer';

class KloakBridge {

    private uploadHelpers: {[name: string]: DisassemblyHelper} = {};
    private assemblyHelpers: {[name: string]: AssemblyHelper} = {};
    private encryptHelpers: {[name: string]: EncryptHelper} = {}
    private keyContainer: KeyContainer | undefined
    private IDBHelper = new IDBDatabaseHelper();

    /**
     * Check if IndexedDB contains a "KeyChainContainer".
     */
    public checkKeyContainer = (): Promise<KeyChainContainer> => (
        new Promise<any>(async (resolve, reject) => {
            const keyChainContainer = await this.IDBHelper.retrieve('KeyContainer');
            if (!keyChainContainer) {
                return reject(new Error('No key container.'));
            }
            return resolve(keyChainContainer);
        })
    );

    /**
     * Unlock a "KeyChainContainer".
     * If no KeyChainContainer exists in IndexedDB, return error.
     */
    public unlockContainer = (passphrase: string): Promise<boolean> => (
        new Promise<boolean>(async (resolve, reject) => {
            try {
                const { pgpKeys, keyChain } = await this.checkKeyContainer();
                if (pgpKeys && keyChain) {
                    const tempEncrypt = new EncryptHelper();
                    await tempEncrypt.checkPassword(pgpKeys, passphrase);
                    const decryptedKeyChain = await tempEncrypt.decryptMessage(keyChain);
                    this.keyContainer = new KeyContainer(tempEncrypt, decryptedKeyChain);
                    return resolve(true);
                }
            } catch (err) {
                return reject(err);
            }
        })
    )

    /**
     * Create a KeyChainContainer and save into IndexedDB.
     */
    public createKeyContainer = (passphrase: string): Promise<KeyChainContainer> => (
        new Promise<KeyChainContainer>(async (resolve, reject) => {
            try {
                const tempEncrypt = new EncryptHelper();
                const containerKey: PGPKeys = await tempEncrypt.generateKey({ passphrase });
                await tempEncrypt.checkPassword(containerKey, passphrase);
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
                const encryptedKeyChain = await tempEncrypt.encryptMessage(JSON.stringify(keyChain));
                const container: KeyChainContainer = {
                    pgpKeys: {
                        keyID: containerKey.keyID,
                        armoredPrivateKey: containerKey.armoredPrivateKey,
                        armoredPublicKey: containerKey.armoredPublicKey
                    },
                    keyChain: encryptedKeyChain
                };
                this.keyContainer = new KeyContainer(tempEncrypt, keyChain);
                await this.IDBHelper.save('KeyContainer', container);
                return resolve(container);
            } catch (err) {
                return reject(err);
            }
        })
    );

    /**
     * Delete KeyChainContainer from IndexedDB.
     */
    public deleteKeyContainer = (): Promise<boolean> => (
        new Promise<boolean>(async (resolve, reject) => {
            try {
                await this.IDBHelper.delete('KeyContainer');
                return resolve(true);
            } catch (err) {
                return reject(err);
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
    public changeContainer = (newPassphrase: string, keyChain: KeyChain): Promise<KeyChainContainer> => (
        new Promise<KeyChainContainer>(async (resolve, _) => {
            const tempEncrypt = new EncryptHelper();
            const { keyID, armoredPrivateKey, armoredPublicKey } = await tempEncrypt.generateKey({ passphrase: newPassphrase });

            await tempEncrypt.checkPassword({ keyID, armoredPublicKey, armoredPrivateKey }, newPassphrase);
            const encryptedKeyChain = await tempEncrypt.encryptMessage(JSON.stringify(keyChain));
            const newContainer: KeyChainContainer = {
                pgpKeys: {
                    keyID,
                    armoredPrivateKey,
                    armoredPublicKey
                },
                keyChain: encryptedKeyChain
            };
            return resolve(newContainer);
        })
    )

    /**
     * Create an OpenPGP key pair.
     */
    public createKey = (instanceName: string, options: PGPGenerateOptions, unlock?: boolean): Promise<PGPKeys> => (
        new Promise(async (resolve, reject) => {
            this.encryptHelpers[instanceName] = await new EncryptHelper();
            const pgpKeys: PGPKeys = await this.encryptHelpers[instanceName].generateKey(options);
            pgpKeys.unlocked = false;
            if (unlock) {
                try {
                    const isUnlocked = await this.encryptHelpers[instanceName].checkPassword(pgpKeys, options.passphrase);
                    pgpKeys.unlocked = isUnlocked.valueOf();
                } catch (err) {
                    reject(err);
                }
            }
            return resolve(pgpKeys);
        })
    )

    /**
     * Unlock an OpenPGP key pair.
     */
    public unlockKey = (instanceName: string, pgpKeys: PGPKeys, passphrase: string): Promise<boolean> => (
        new Promise<boolean>(async (resolve, reject) => {
            try {
                if (!this.encryptHelpers[instanceName]) {
                    this.encryptHelpers[instanceName] = await new EncryptHelper();
                }
                const unlocked = await this.encryptHelpers[instanceName].checkPassword(pgpKeys, passphrase);
                resolve(unlocked.valueOf());
            } catch (err) {
                reject(err);
            }
        })
    )

    public retrieve = (uuid: string): Promise<any> => this.IDBHelper.retrieve(uuid);

    public save = (uuid: string, data: any): Promise<any> => this.IDBHelper.save(uuid, data);

    public delete = (uuid: string): Promise<any> => this.IDBHelper.delete(uuid);

    public encryptSave = (instanceName: string, data: ArrayBuffer | Uint8Array | string, uuid?: string): Promise<string> => (
        new Promise<string>(async (resolve, reject) => {
            if (!this.encryptHelpers[instanceName]) {
                return reject(new Error(`No Encrypt instance with ${instanceName}`));
            }
            if (!this.encryptHelpers[instanceName].isUnlocked()) {
                return reject(new Error(`${instanceName} EncryptHelper is locked.`));
            }
            try {
                const encryptedMsg = await this.encryptHelpers[instanceName].encryptMessage(data);
                const savedUuid = await this.save(uuid || getUUIDv4(), encryptedMsg);
                return resolve(savedUuid);
            } catch (err) {
                return reject(err);
            }
        })
    )

    public retrieveDecrypt = (instanceName: string, uuid: string, buffer?: boolean): Promise<any> => (
        new Promise<any>(async (resolve, reject) => {
            let decryptedMsg = '';
            if (!this.encryptHelpers[instanceName]) {
                return reject(new Error(`No Encrypt instance with ${instanceName}`));
            }
            if (!this.encryptHelpers[instanceName].isUnlocked()) {
                return reject(new Error(`${instanceName} EncryptHelper is locked.`));
            }
            try {
                const encryptedMsg = await this.retrieve(uuid);
                decryptedMsg = await this.encryptHelpers[instanceName].decryptMessage(encryptedMsg, buffer);
            } catch (err) {
                return reject(err);
            }
            return resolve(decryptedMsg);
        })
    )

    public upload = (encryptInstance: string, source: File | Blob, callback: (err: Error | null, progress: number, done: boolean) => void): Promise<string> => (
        new Promise<string>((resolve, _) => {
            const uuid = getUUIDv4();
            const disassemblyHelper = new DisassemblyHelper(source, async (err, current, next) => {
                if (err) {
                    return callback(err, 0, !next);
                }
                if (current && current.progress && current.chunk) {
                    try {
                        this.encryptSave(encryptInstance, current.chunk.data, current.chunk.uuid).then(() => {
                            if (next) {
                                next();
                            }
                            callback(null, current.progress as number, !next);
                        });
                        if (current.metadata && current.index) {
                            await this.encryptSave(encryptInstance, JSON.stringify(current.index), uuid);
                            // SHOULD STORE THIS METADATA INTO A MASTER STORAGE LIST
                            console.log(current.metadata, current.index);
                            return resolve(uuid);

                        }
                    } catch (error) {
                        return callback(err, 0, !next);
                    }
                }
            });
            this.uploadHelpers[uuid] = disassemblyHelper;
        })
    )

    public download = (encryptInstance: string, uuid: string, callback: (err: Error | null, progress: number) => void): Promise<unknown> => (
        new Promise<unknown>(async (resolve, reject) => {
            const index: KloakFileIndex = await this.retrieveDecrypt(encryptInstance, uuid);
            const assemblyHelper: AssemblyHelper = new AssemblyHelper(index, async (error, progress, nextChunk, data) => {
                if (error) {
                    return reject(new Error(error));
                }
                if (progress) {
                    callback(null, progress);
                }
                if (nextChunk) {
                    const data = await this.retrieveDecrypt(encryptInstance, nextChunk, true);
                    console.log(data);
                    return assemblyHelper.append(nextChunk, data);
                }
                if (data) {
                    callback(null, 100);
                    return resolve(uuid);
                }
            });
            this.assemblyHelpers[uuid] = assemblyHelper;
        })
    )
}

export default KloakBridge;