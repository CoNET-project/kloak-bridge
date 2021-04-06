import { ApplicationKeys, KeyChain, PGPKeys } from './define';

type KeyPairType = 'device' | 'kloak' | 'storage' | 'messenger' | 'application'

class KeyContainer {
    private deviceKey: PGPKeys | {};
    private kloakAccountKey: PGPKeys | {};
    private storageKey: PGPKeys | {};
    private messengerKeys: {
        [keyID: string]: PGPKeys
    }
    private applicationKeys: ApplicationKeys

    constructor(keyContainer: KeyChain) {
        this.deviceKey = keyContainer.deviceKey;
        this.kloakAccountKey = keyContainer.kloakAccountKey;
        this.storageKey = keyContainer.storageKey;
        this.messengerKeys = keyContainer.messengerKeys;
        this.applicationKeys = keyContainer.applicationKeys;
    }

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

    public setKey = (keyType: 'device' | 'kloak' | 'storage' | 'messenger', pgpKeys: PGPKeys): Promise<void> => (
        new Promise<void>((resolve, reject) => {
            if (keyType === 'device') this.deviceKey = pgpKeys;
            if (keyType === 'kloak') this.kloakAccountKey = pgpKeys;
            if (keyType === 'storage') this.storageKey = pgpKeys;
            if (keyType === 'messenger') {
                if (this.messengerKeys[pgpKeys.keyID]) {
                    return reject(new Error('This keyID already exists in preferences.'));
                }
                this.messengerKeys[pgpKeys.keyID] = pgpKeys;
            }
            return resolve();
        })
    )

    public addApplicationKey = (appID: string, pgpKeys: PGPKeys): Promise<boolean> => (
        new Promise<boolean>((resolve, _) => {
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
            return resolve(true);

        })
    )
}

export default KeyContainer;
