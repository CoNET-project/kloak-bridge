import Encrypt from './Encrypt';
import IDBDatabaseHelper from './IDBDatabaseHelper';
// eslint-disable-next-line import/no-unresolved
import { PGPGenerateOptions, StringPGPKeys } from './define';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class StorageHelper {
    private encrypt: Encrypt = new Encrypt();
    private IDBHelper = new IDBDatabaseHelper();
    public createKey = (options: PGPGenerateOptions, unlock?: boolean): Promise<StringPGPKeys | boolean> => (
        new Promise(async (resolve, reject) => {
            const stringPGPKeys: StringPGPKeys = await this.encrypt.generateKey(options);
            if (unlock) {
                const isUnlocked = await this.encrypt.checkPassword(stringPGPKeys, options.passphrase);
                stringPGPKeys.unlocked = isUnlocked;
                if (isUnlocked) {
                    return resolve(stringPGPKeys);
                }
                return reject(new Error('Unable to unlock your new OpenPGP key.'));
            }
            return resolve(stringPGPKeys);
        })
    )
    public encryptSave = (data: ArrayBuffer | Uint8Array | string): Promise<string> => (
        new Promise<string>((resolve, reject) => {

        })
    )

}
