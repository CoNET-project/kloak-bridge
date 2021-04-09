import { v4 as uuidv4 } from 'uuid';
import StorageHelper from '../StorageHelper';
import { KeyChainContainer, KeyChain, PGPKeys } from '../define';
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
    let keyPair: PGPKeys;
    let storageHelper: StorageHelper;
    const keyChain: KeyChain = {
        deviceKey: {},
        kloakAccountKey: {},
        storageKey: {},
        messengerKeys: {},
        applicationKeys: {}
    };

    let keyContainer: KeyContainer | null;

    beforeAll(() => {
        // eslint-disable-next-line global-require
        const textEncoding = require('text-encoding-utf-8');
        global.TextEncoder = textEncoding.TextEncoder;
        global.TextDecoder = textEncoding.TextDecoder;
        storageHelper = new StorageHelper();
    });

    test('Should create a new key pair and NOT unlock', async () => {
        keyPair = await storageHelper.createKey(encryptTestData.instanceName,
            { passphrase: encryptTestData.passphrase },
            false);
        expect(keyPair.armoredPublicKey).toBeTruthy();
        expect(keyPair.armoredPrivateKey).toBeTruthy();
        expect(keyPair.unlocked).toBe(false);
    });

    test('Should unlock a key pair', async () => {
        keyPair = await storageHelper.createKey(encryptTestData.instanceName,
            { passphrase: encryptTestData.passphrase },
            false);
        const unlocked = await storageHelper.unlockKey(encryptTestData.instanceName, keyPair, encryptTestData.passphrase);
        expect(unlocked).toBe(true);
    });

    test('Should create a new key pair and unlock', async () => {
        keyPair = await storageHelper.createKey(
            encryptTestData.instanceName,
            { passphrase: encryptTestData.passphrase },
            true
        );
        expect(keyPair.armoredPublicKey).toBeTruthy();
        expect(keyPair.armoredPrivateKey).toBeTruthy();
        expect(keyPair.unlocked).toBe(true);
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
        const encryptSaveUuid = await storageHelper.encryptSave(encryptTestData.instanceName, originalData);
        expect(encryptSaveUuid).not.toBeNull();
    });

    test('Should encrypt and save data, returning provided UUID', async () => {
        const encryptSaveUuid = await storageHelper.encryptSave(encryptTestData.instanceName, originalData, uuid);
        expect(encryptSaveUuid).toBe(uuid);
    });

    test('Should retrieve and decrypt data, with provided UUID', async () => {
        const retrieveDecryptData = await storageHelper.retrieveDecrypt(encryptTestData.instanceName, uuid, false);
        expect(retrieveDecryptData).toBe(originalData);
    });

    test('Should check keychain and return no keychain.', async () => {
        // const preferences = await storageHelper.checkPreferences();
        await expect(storageHelper.checkKeyContainer())
            .rejects
            .toThrowError();
    });

    test('Should check keychain and return keychain', async () => {
        await storageHelper.save('KeyContainer', keyChain);
        await expect(storageHelper.checkKeyContainer())
            .resolves
            .toBeTruthy();
    });

    test('Should create new container with encrypted keychain', async () => {
        const container: KeyChainContainer = await storageHelper.createKeyContainer('mysecretpassword');
        const { keyID, armoredPublicKey, armoredPrivateKey } = container.pgpKeys;
        expect(keyID).toBeTruthy();
        expect(armoredPublicKey).toBeTruthy();
        expect(armoredPrivateKey).toBeTruthy();
    });

    test('Should create new container and be able to decrypt keychain.', async () => {
        const container: KeyChainContainer = await storageHelper.createKeyContainer('mysupersecretpassword');
        const { keyID, armoredPublicKey, armoredPrivateKey } = container.pgpKeys;
        const tempEncrypt = new EncryptHelper();
        await tempEncrypt.checkPassword({ keyID, armoredPublicKey, armoredPrivateKey }, 'mysupersecretpassword');
        await expect(tempEncrypt.decryptMessage(container.keyChain)).resolves.toBeTruthy();
    });

    test('Should create new container, decrypt keychain and create new KeyContainer class', async () => {
        const container: KeyChainContainer = await storageHelper.createKeyContainer('mysupersecretpassword');
        const { keyID, armoredPublicKey, armoredPrivateKey } = container.pgpKeys;
        const tempEncrypt = new EncryptHelper();
        await tempEncrypt.checkPassword({ keyID, armoredPublicKey, armoredPrivateKey }, 'mysupersecretpassword');
        const keychain = await tempEncrypt.decryptMessage(container.keyChain);
        keyContainer = new KeyContainer(tempEncrypt, keychain);
        const tempKey = JSON.stringify(await keyContainer.getKeyChain());
        expect(tempKey).toBe(JSON.stringify(keychain));
    });

    test('Should add new key to KeyContainer class', async () => {
        const tempEncrypt = new EncryptHelper();
        const pgpKeys: PGPKeys = await tempEncrypt.generateKey({ passphrase: 'supersecretpassword' });
        await keyContainer?.addApplicationKey('GAME', pgpKeys);
        const key = await keyContainer?.getKey('application', pgpKeys.keyID, 'GAME');
        expect(JSON.stringify(key)).toBe(JSON.stringify(pgpKeys));
    });

    test('Should switch KeyContainers class', async () => {
        const { pgpKeys, keyChain } = await storageHelper.changeContainer('mynewsuperpassword', await keyContainer?.getKeyChain() as KeyChain);
        const tempEncrypt = new EncryptHelper();
        await tempEncrypt.checkPassword(pgpKeys, 'mynewsuperpassword');
        const decryptedKeyChain = await tempEncrypt.decryptMessage(keyChain);
        const newKeyContainer = new KeyContainer(tempEncrypt, decryptedKeyChain);
        expect(JSON.stringify(newKeyContainer.getKeyChain())).toBe(JSON.stringify(keyContainer?.getKeyChain()));
    });

    test('Should create new container, save into IndexedDB.', async () => {
        await storageHelper.createKeyContainer('mypassword');
        const unlocked = await storageHelper.unlockContainer('mypassword');
        expect(unlocked).toBe(true);
    });

    test('Should create new container, save into IndexedDB and delete container', async () => {
        await storageHelper.createKeyContainer('mypassword');
        await storageHelper.deleteKeyContainer();
        await expect(storageHelper.checkKeyContainer()).rejects.toThrowError();
    });
});
