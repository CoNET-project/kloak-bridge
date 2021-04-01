import { KeyContainer, PGPKeys } from './define';

class Preferences {
    private deviceKey: PGPKeys;
    private accountKey: PGPKeys;
    private storageKey: PGPKeys;
    private messengerKeys: {
        [keyID: string]: PGPKeys
    }

    constructor(keyContainer: KeyContainer) {
        this.deviceKey = keyContainer.deviceKey;
        this.accountKey = keyContainer.accountKey;
        this.storageKey = keyContainer.storageKey;
        this.messengerKeys = keyContainer.messengerKeys;
    }

    // public getKey = (type: 'device') => {
    //
    // }
}

export default Preferences;
