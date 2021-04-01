import { v4 as uuidv4 } from 'uuid';
import StorageHelper from '../StorageHelper';
import { PGPKeys } from '../define';
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

    test('Should check preferences and return no preferences.', async () => {
        // const preferences = await storageHelper.checkPreferences();
        await expect(storageHelper.checkPreferences())
            .rejects
            .toThrowError();
    });

    test('Should check preferences and return preferences', async () => {
        await storageHelper.save('preferences', 'mypreferences');
        await expect(storageHelper.checkPreferences())
            .resolves
            .toBeTruthy();
    });
});
