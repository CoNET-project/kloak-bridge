import { v4 as uuidv4 } from 'uuid';
import EncryptHelper from './EncryptHelper';
import IDBDatabaseHelper from './IDBDatabaseHelper';
import { KloakFileIndex, PGPGenerateOptions, StringPGPKeys } from './define';
import DisassemblyHelper from './DisassemblyHelper';
import AssemblyHelper from './AssemblyHelper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class StorageHelper {

    private uploadHelpers: {[name: string]: DisassemblyHelper} = {};
    private assemblyHelpers: {[name: string]: AssemblyHelper} = {};
    private encryptHelpers: {[name: string]: EncryptHelper} = {}
    private IDBHelper = new IDBDatabaseHelper();

    public createKey = (instanceName: string, options: PGPGenerateOptions, unlock?: boolean): Promise<StringPGPKeys> => (
        new Promise(async (resolve, reject) => {
            this.encryptHelpers[instanceName] = await new EncryptHelper();
            const stringPGPKeys: StringPGPKeys = await this.encryptHelpers[instanceName].generateKey(options);
            stringPGPKeys.unlocked = false;
            if (unlock) {
                try {
                    const isUnlocked = await this.encryptHelpers[instanceName].checkPassword(stringPGPKeys, options.passphrase);
                    stringPGPKeys.unlocked = isUnlocked.valueOf();
                } catch (err) {
                    reject(err);
                }
            }
            return resolve(stringPGPKeys);
        })
    )

    public unlockKey = (instanceName: string, keyPair: StringPGPKeys, passphrase: string): Promise<boolean> => (
        new Promise<boolean>(async (resolve, reject) => {
            try {
                if (!this.encryptHelpers[instanceName]) {
                    this.encryptHelpers[instanceName] = await new EncryptHelper();
                }
                const unlocked = await this.encryptHelpers[instanceName].checkPassword(keyPair, passphrase);
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
                const savedUuid = await this.save(uuid || uuidv4(), encryptedMsg);
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
            const uuid = uuidv4();
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

export default StorageHelper;
