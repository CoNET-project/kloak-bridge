import { ApplicationKeys, KeyChain, PGPKeys, KeyPairType, MessengerKey } from './define';
import EncryptHelper from './EncryptHelper';
import IDBDatabaseHelper from './IDBDatabaseHelper';

class KeyContainer {
    private IDBHelper: IDBDatabaseHelper = new IDBDatabaseHelper();
    private keyContainerEncrypt: EncryptHelper;
    private deviceKey: PGPKeys | {};
    private kloakAccountKey: PGPKeys | {};
    private storageKey: PGPKeys | {};
    private messengerKeys: {
        [keyID: string]: MessengerKey
    }
    private applicationKeys: ApplicationKeys

    constructor(encryptHelper: EncryptHelper, keyContainer: KeyChain) {
        this.keyContainerEncrypt = encryptHelper;
        this.deviceKey = keyContainer.deviceKey;
        this.kloakAccountKey = keyContainer.kloakAccountKey;
        this.storageKey = keyContainer.storageKey;
        this.messengerKeys = keyContainer.messengerKeys;
        this.applicationKeys = keyContainer.applicationKeys;
    }

    private saveKeyContainer = (): Promise<boolean> => (
        new Promise<boolean>(async (resolve, reject) => {
            try {
                const encryptedMessage = await this.keyContainerEncrypt.encryptMessage(JSON.stringify(this.getKeyChain()));
                await this.IDBHelper.save('KeyContainer', encryptedMessage);
                return resolve(true);
            } catch (err) {
                return reject(err);
            }
        })
    )

    public getKeyChain = (): Promise<KeyChain> => (
        new Promise<KeyChain>((resolve, _) => {
            const keyChain: KeyChain = {
                deviceKey: this.deviceKey,
                kloakAccountKey: this.kloakAccountKey,
                storageKey: this.storageKey,
                messengerKeys: this.messengerKeys,
                applicationKeys: this.applicationKeys
            };
            return resolve(keyChain);
        })
    )

    public getKey = (keyType: KeyPairType, keyID?: string, appID?: string): Promise<PGPKeys | {}> => (
        new Promise<PGPKeys | {}>((resolve, reject) => {
            if (keyType === 'device') resolve(this.deviceKey);
            if (keyType === 'kloak') resolve(this.kloakAccountKey);
            if (keyType === 'storage') resolve(this.storageKey);
            if (keyType === 'messenger') {
                if (!keyID) {
                    return reject(new Error('Please provide a valid keyID.'));
                }
                return resolve(this.messengerKeys[keyID]);
            }
            if (keyType === 'application') {
                if (!this.applicationKeys) {
                    return reject(new Error('No application keys.'));
                }
                if (!appID || !keyID) {
                    return reject(new Error('Please provide an AppID or KeyID.'));
                }
                return resolve(this.applicationKeys[appID][keyID]);
            }
            return reject(new Error('Empty preferences!'));
        })
    )

    public setKey = (keyType: 'device' | 'kloak' | 'storage' | 'messenger', pgpKeys: PGPKeys): Promise<boolean> => (
        new Promise<boolean>(async (resolve, reject) => {
            if (keyType === 'device') this.deviceKey = pgpKeys;
            if (keyType === 'kloak') this.kloakAccountKey = pgpKeys;
            if (keyType === 'storage') this.storageKey = pgpKeys;
            if (keyType === 'messenger') {
                if (this.messengerKeys[pgpKeys.keyID]) {
                    return reject(new Error('This keyID already exists in preferences.'));
                }
                this.messengerKeys[pgpKeys.keyID].pgpKeys = pgpKeys;
            }
            try {
                const saved = await this.saveKeyContainer();
                return resolve(saved);
            } catch (err) {
                return reject(err);
            }
        })
    )

    public addApplicationKey = (appID: string, pgpKeys: PGPKeys): Promise<boolean> => (
        new Promise<boolean>(async (resolve, reject) => {
            if (this.applicationKeys) {
                const tempAppKeys = {
                    ...this.applicationKeys,
                    [appID]: {
                        [pgpKeys.keyID]: pgpKeys
                    }
                };
                this.applicationKeys = tempAppKeys;
                return resolve(true);
            }
            this.applicationKeys = {
                appID: {
                    [pgpKeys.keyID]: pgpKeys
                }
            };

            try {
                const saved = await this.saveKeyContainer();
                return resolve(saved);
            } catch (err) {
                return reject(err);
            }
        })
    )
}

export default KeyContainer;
