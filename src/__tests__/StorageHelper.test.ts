import { v4 as uuidv4 } from 'uuid';
import KloakBridge from '../KloakBridge';
import { KeyChain, PGPKeys } from '../define';
import EncryptHelper from '../EncryptHelper';
import KeyContainer from '../KeyContainer';
require('fake-indexeddb/auto');

describe('StorageHelper Class', () => {
    const originalData = 'importantInformation';
    const uuid = uuidv4();
    const encryptTestData = {
        instanceName: 'MyImportantKey',
        passphrase: '12345'
    };
    let storageHelper: KloakBridge;
    const keyChain: KeyChain = {
        deviceKey: {},
        kloakAccountKey: {},
        storageKey: {},
        messengerKeys: {},
        applicationKeys: {}
    };
    let encryptHelper: EncryptHelper | null;
    let keyContainer: KeyContainer | null;

    beforeAll(() => {
        // eslint-disable-next-line global-require
        const textEncoding = require('text-encoding-utf-8');
        global.TextEncoder = textEncoding.TextEncoder;
        global.TextDecoder = textEncoding.TextDecoder;
        storageHelper = new KloakBridge();
    });

    test('Should create a new key pair and NOT unlock', async () => {
        const [status] = await storageHelper.createKey({ passphrase: encryptTestData.passphrase },
            false);
        expect(status).toBe('SUCCESS');
    });

    test('Should unlock a key pair', async () => {
        const [, pgpKeys] = await storageHelper.createKey({ passphrase: encryptTestData.passphrase },
            false);
        const [ status, encrypt ] = await storageHelper.unlockKey(pgpKeys as PGPKeys, encryptTestData.passphrase);
        encryptHelper = encrypt as EncryptHelper;
        expect(status).toBe('SUCCESS');
    });

    test('Should create a new key pair and unlock', async () => {
        const [ status, pgpKeys ] = await storageHelper.createKey({ passphrase: encryptTestData.passphrase },
            true);
        expect(pgpKeys?.armoredPublicKey).toBeTruthy();
        expect(pgpKeys?.armoredPrivateKey).toBeTruthy();
        expect(status).toBe('SUCCESS');
    });

    test('Should save data', async () => {
        const saveActionUuid = await storageHelper.save(uuid, originalData);
        expect(saveActionUuid).toBe(uuid);
    });

    test('Should retrieve data', async () => {
        const data = await storageHelper.retrieve(uuid);
        expect(data).toBe(originalData);
    });

    test('Should delete data', async () => {
        const deleteActionUuid = await storageHelper.delete(uuid);
        expect(deleteActionUuid).toBe(uuid);
    });

    test('Should encrypt and save data, returning generated UUID', async () => {
        const [status] = await storageHelper.encryptSave(encryptHelper as EncryptHelper, originalData);
        expect(status).toBe('SUCCESS');
    });

    test('Should encrypt and save data, returning provided UUID', async () => {
        const [status] = await storageHelper.encryptSave(encryptHelper as EncryptHelper, originalData, uuid);
        expect(status).toBe('SUCCESS');
    });

    test('Should retrieve and decrypt data, with provided UUID', async () => {
        const [, data] = await storageHelper.retrieveDecrypt(encryptHelper as EncryptHelper, uuid, false);
        expect(data).toBe(originalData);
    });

    test('Should check keychain and return no keychain.', async () => {
        // const preferences = await storageHelper.checkPreferences();
        const [ status ] = await storageHelper.checkKeyContainer();
        expect(status).toBe('DOES_NOT_EXIST');
    });

    test('Should check keychain and return keychain', async () => {
        await storageHelper.save('KeyContainer', keyChain);
        await expect(storageHelper.checkKeyContainer())
            .resolves
            .toBeTruthy();
    });

    test('Should create new container with encrypted keychain', async () => {
        const [, container ] = await storageHelper.createKeyContainer('mysecretpassword');
        const { keyID, armoredPublicKey, armoredPrivateKey } = container!!.pgpKeys;
        expect(keyID).toBeTruthy();
        expect(armoredPublicKey).toBeTruthy();
        expect(armoredPrivateKey).toBeTruthy();
    });

    test('Should create new container and be able to decrypt keychain.', async () => {
        const [, container ] = await storageHelper.createKeyContainer('mysupersecretpassword');
        const { keyID, armoredPublicKey, armoredPrivateKey } = container!!.pgpKeys;
        const tempEncrypt = new EncryptHelper();
        await tempEncrypt.checkPassword({ keyID, armoredPublicKey, armoredPrivateKey }, 'mysupersecretpassword');
        const keyChain = await tempEncrypt.decryptMessage(container!!.keyChain);
        expect(keyChain).toBeTruthy();
    });

    test('Should create new container, decrypt keychain and create new KeyContainer class', async () => {
        const [, container] = await storageHelper.createKeyContainer('mysupersecretpassword');
        const { keyID, armoredPublicKey, armoredPrivateKey } = container!!.pgpKeys;
        const tempEncrypt = new EncryptHelper();
        await tempEncrypt.checkPassword({ keyID, armoredPublicKey, armoredPrivateKey }, 'mysupersecretpassword');
        const [, keyChain] = await tempEncrypt.decryptMessage(container?.keyChain as string);
        keyContainer = new KeyContainer(tempEncrypt, keyChain as unknown as KeyChain);
        const tempKey = JSON.stringify(await keyContainer.getKeyChain());
        expect(tempKey).toBe(JSON.stringify(keyChain));
    });

    test('Should add new key to KeyContainer class', async () => {
        const tempEncrypt = new EncryptHelper();
        const [, pgpKeys] = await tempEncrypt.generateKey({ passphrase: 'supersecretpassword' });
        await keyContainer?.addApplicationKey('GAME', pgpKeys as PGPKeys);
        const key = await keyContainer?.getKey('application', pgpKeys?.keyID, 'GAME');
        expect(JSON.stringify(key)).toBe(JSON.stringify(pgpKeys));
    });

    test('Should switch KeyContainers class', async () => {
        const [ , keyChainContainer ] = await storageHelper.changeKeyContainer('mynewsuperpassword', await keyContainer!!.getKeyChain());
        const tempEncrypt = new EncryptHelper();
        await tempEncrypt.checkPassword(keyChainContainer!!.pgpKeys, 'mynewsuperpassword');
        const decryptedKeyChain = await tempEncrypt.decryptMessage(keyChainContainer!!.keyChain);
        const newKeyContainer = new KeyContainer(tempEncrypt, decryptedKeyChain as unknown as KeyChain);
        expect(JSON.stringify(newKeyContainer.getKeyChain())).toBe(JSON.stringify(keyContainer?.getKeyChain()));
    });

    test('Should create new container, save into IndexedDB.', async () => {
        await storageHelper.createKeyContainer('mypassword');
        const [ status ] = await storageHelper.unlockKeyContainer('mypassword');
        expect(status).toBe('SUCCESS');
    });

    test('Should get INVALID_PASSWORD from unlockKeyContainer', async () => {
        await storageHelper.createKeyContainer('mypassword');
        const [ status ] = await storageHelper.unlockKeyContainer('wrongpassword');
        console.log(status);
        expect(status).toBe('INVALID_PASSPHRASE');
    });

    test('Should create new container, save into IndexedDB and delete container', async () => {
        await storageHelper.createKeyContainer('mypassword');
        await storageHelper.deleteKeyContainer();
        const [ status ] = await storageHelper.checkKeyContainer();
        expect(status).toBe('DOES_NOT_EXIST');
    });
});
