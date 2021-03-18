import Encrypt from './Encrypt';
import IDBDatabaseHelper from './IDBDatabaseHelper';
import { PGPGenerateOptions, StringPGPKeys } from './define';

class StorageHelper {
    private encrypt = new Encrypt();
    private IDBHelper = new IDBDatabaseHelper();
    constructor() {

    }

    public newKey = (options: PGPGenerateOptions, unlock?: boolean): Promise<StringPGPKeys | boolean> => {
        return new Promise(async(resolve, reject) => {
            const stringPGPKeys: StringPGPKeys = await this.encrypt.generateKey(options);
            if (unlock) {
                const isUnlocked = await this.encrypt.checkPassword(stringPGPKeys, options.passphrase);
                stringPGPKeys['unlocked'] = isUnlocked;
                isUnlocked ? resolve(stringPGPKeys) : reject(new Error("Unable to unlock your new OpenPGP key."))
            }
            return resolve(stringPGPKeys);
        })
    }




}
