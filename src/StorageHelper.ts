import { v4 as uuidv4 } from 'uuid';
import Encrypt from './Encrypt';
import IDBDatabaseHelper from './IDBDatabaseHelper';
import { PGPGenerateOptions, StringPGPKeys } from './define';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class StorageHelper {
    private encryptHelpers: {[name: string]: Encrypt} = {}
    private IDBHelper = new IDBDatabaseHelper();
    public createKey = (instanceName: string, options: PGPGenerateOptions, unlock?: boolean): Promise<StringPGPKeys> => (
        new Promise(async (resolve, reject) => {
            this.encryptHelpers[instanceName] = await new Encrypt();
            const stringPGPKeys: StringPGPKeys = await this.encryptHelpers[instanceName].generateKey(options);
            stringPGPKeys.unlocked = false;
            if (unlock) {
                try {
                    const isUnlocked = await this.encryptHelpers[instanceName].checkPassword(stringPGPKeys, options.passphrase);
                    console.log(isUnlocked);
                    stringPGPKeys.unlocked = isUnlocked;
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
                    this.encryptHelpers[instanceName] = await new Encrypt();
                }
                const unlocked = await this.encryptHelpers[instanceName].checkPassword(keyPair, passphrase);
                resolve(unlocked);
            } catch (err) {
                reject(err);
            }
        })
    )
    public retrieve = (uuid: string): Promise<any> => this.IDBHelper.retrieve(uuid);
    public save = (uuid: string, data: any): Promise<any> => this.IDBHelper.save(uuid, data);
    public delete = (uuid: string): Promise<any> => this.IDBHelper.delete(uuid);
    public encryptSave = (instanceName: string, data: ArrayBuffer | Uint8Array | string, uuid: string = uuidv4()): Promise<string> => (
        new Promise<string>(async (resolve, reject) => {
            if (!this.encryptHelpers[instanceName]) {
                return reject(new Error(`No Encrypt instance with ${instanceName}`));
            }
            if (!this.encryptHelpers[instanceName].isUnlocked()) {
                return reject(new Error(`${instanceName} EncryptHelper is locked.`));
            }
            try {
                const encryptedMsg = await this.encryptHelpers[instanceName].encryptMessage(data);
                const savedUuid = await this.save(uuid, encryptedMsg);
                return resolve(savedUuid);
            } catch (err) {
                return reject(err);
            }
        })
    )
    public retrieveDecrypt = (instanceName: string, uuid: string): Promise<any> => (
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
                decryptedMsg = await this.encryptHelpers[instanceName].decryptMessage(encryptedMsg);
            } catch (err) {
                return reject(err);
            }
            return resolve(decryptedMsg);
        })
    )
}

export default StorageHelper;
