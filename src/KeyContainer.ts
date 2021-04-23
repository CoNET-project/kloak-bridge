import { GetAppDataUUID, KeyChain, PGPKeys } from './define';
import EncryptHelper from './EncryptHelper';
import IDBDatabaseHelper from './IDBDatabaseHelper';
import { getUUIDv4 } from './utils';

class KeyContainer {
    private IDBHelper: IDBDatabaseHelper = new IDBDatabaseHelper();
    private encryptHelper: EncryptHelper | null = null
    private keyChain: KeyChain = {
        device: {},
        kloak: {},
        apps: {}
    }

    constructor(encryptHelper: EncryptHelper, keyChain: KeyChain) {
        this.encryptHelper = encryptHelper;
        this.keyChain = keyChain;
    }

    private saveKeyContainer = (): Promise<boolean> => (
        new Promise<boolean>(async (resolve, reject) => {
            try {
                const encryptedMessage = await this.encryptHelper?.encryptMessage(JSON.stringify(this.keyChain));
                await this.IDBHelper.save('KeyContainer', encryptedMessage);
                return resolve(true);
            } catch (err) {
                return reject(err);
            }
        })
    )

    public getKeyChain = () => this.keyChain

    public addAppID = (appKeyID: string, publicKey: string): Promise<[status: 'SUCCESS' | 'ALREADY_EXISTS']> => (
        new Promise<[status: 'SUCCESS' | 'ALREADY_EXISTS']>(async (resolve, _) => {
            if (this.keyChain.apps[appKeyID]) {
                return resolve(['ALREADY_EXISTS']);
            }
            const tempEncrypter = new EncryptHelper();
            const [, encryptionKeys] = await tempEncrypter.generateKey({ passphrase: '' });
            this.keyChain.apps[appKeyID] = {
                encryptionKeys: encryptionKeys as PGPKeys,
                publicKey,
                dataUUID: getUUIDv4()
            };
            await this.saveKeyContainer();
            return resolve(['SUCCESS']);
        })
    )

    // public addAppKey = (appID: string, pgpKeys: PGPKeys, options?: {dataUUID: string}): Promise<[status: 'SUCCESS' | 'APP_DOES_NOT_EXIST']> => (
    //     new Promise<[status: 'SUCCESS' | 'APP_DOES_NOT_EXIST']>(async (resolve, _) => {
    //         if (!this.keyChain.apps[appID]) {
    //             return resolve(['APP_DOES_NOT_EXIST']);
    //         }
    //         this.keyChain.apps[appID].keys[pgpKeys.keyID] = {
    //             keyID: pgpKeys.keyID,
    //             armoredPublicKey: pgpKeys.armoredPublicKey,
    //             armoredPrivateKey: pgpKeys.armoredPrivateKey,
    //             ...options
    //         };
    //         await this.saveKeyContainer();
    //         return resolve(['SUCCESS']);
    //     })
    // )

    // public getKey = (appID: string, keyId?: string): Promise<[status: 'SUCCESS' | 'DOES_NOT_EXIST' | 'FAILURE', pgpKeys?: PGPKeys]> => (
    //     new Promise<[status: 'SUCCESS' | 'DOES_NOT_EXIST' | 'FAILURE', pgpKeys?: PGPKeys]>((resolve, _) => {
    //         switch (appID) {
    //             case 'device':
    //                 return resolve(['SUCCESS', this.keyChain.device as PGPKeys]);
    //             case 'kloak':
    //                 return resolve(['SUCCESS', this.keyChain.kloak as PGPKeys]);
    //             default:
    //                 if (!keyId) {
    //                     return resolve(['FAILURE']);
    //                 }
    //                 if (!this.keyChain.apps[appID] || !this.keyChain.apps[appID].keys[keyId]) {
    //                     return resolve(['DOES_NOT_EXIST']);
    //                 }
    //                 return resolve(['SUCCESS', this.keyChain.apps[appID].keys[keyId]]);
    //         }
    //     })
    // )

    public getAppDataUUID = (appID: string): Promise<GetAppDataUUID> => (
        new Promise<GetAppDataUUID>((resolve, _) => {
            if (!appID || !this.keyChain.apps[appID] || !this.keyChain.apps[appID].dataUUID) {
                return resolve(['DOES_NOT_EXIST']);
            }
            return resolve(['SUCCESS', { encryptionKeys: this.keyChain.apps[appID].encryptionKeys as PGPKeys, dataUUID: this.keyChain.apps[appID].dataUUID }]);
        })
    )
}

export default KeyContainer;
