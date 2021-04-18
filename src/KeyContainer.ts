import { ApplicationKeys, KeyChain, PGPKeys } from './define';
import EncryptHelper from './EncryptHelper';
import IDBDatabaseHelper from './IDBDatabaseHelper';

class KeyContainer {
    private IDBHelper: IDBDatabaseHelper = new IDBDatabaseHelper();
    private keyContainerEncrypt: EncryptHelper;
    private device: PGPKeys | {};
    private kloak: PGPKeys | {};
    private applications: ApplicationKeys

    constructor(encryptHelper: EncryptHelper, keyContainer: KeyChain) {
        this.keyContainerEncrypt = encryptHelper;
        this.device = keyContainer.device;
        this.kloak = keyContainer.kloak;
        this.applications = keyContainer.applications;
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
                device: this.device,
                kloak: this.kloak,
                applications: this.applications
            };
            return resolve(keyChain);
        })
    )

    public getKey = (appID: string): Promise<PGPKeys | {}> => (
        new Promise<PGPKeys | {}>((resolve, _) => {
            switch (appID) {
                case 'device':
                    return resolve(this.device);
                case 'kloak':
                    return resolve(this.kloak);
                default:
                    if (!this.applications[appID]) {
                        return resolve({});
                    }
                    return resolve(this.applications[appID]);
            }
        })
    )

    public addKey = (appID: string, pgpKeys: PGPKeys): Promise<boolean> => (
        new Promise<boolean>(async (resolve, _) => {
            if (appID === 'device' || appID === 'kloak') {
                return resolve(false);
            }
            this.applications = Object.assign(this.applications, {
                [appID]: [...this.applications[appID] || [], pgpKeys]
            });
            try {
                const saved = await this.saveKeyContainer();
                return resolve(saved);
            } catch (err) {
                return resolve(false);
            }
        })
    )
}

export default KeyContainer;
