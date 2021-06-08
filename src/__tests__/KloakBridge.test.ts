describe('Testing in browser', () => {
    test('Should pass', () => {});
});
// import { v4 as uuidv4 } from 'uuid';
// import KloakBridge from '../KloakBridge';
// import { KeyChain, PGPKeys } from '../define';
// import EncryptHelper from '../EncryptHelper';
// import KeyContainer from '../KeyContainer';
// import IDBDatabaseHelper from '../IDBDatabaseHelper';
// require('fake-indexeddb/auto');
//
// describe('StorageHelper Class', () => {
//     const originalData = 'importantInformation';
//     const uuid = uuidv4();
//     const encryptTestData = {
//         instanceName: 'MyImportantKey',
//         passphrase: '12345'
//     };
//     let kloakBridge: KloakBridge;
//     const keyChain: KeyChain = {
//         device: {},
//         seguro: {},
//         apps: {}
//     };
//     let encryptHelper: EncryptHelper | null;
//     let keyContainer: KeyContainer | null;
//     const IDBHelper = new IDBDatabaseHelper();
//
//     beforeAll(() => {
//         // eslint-disable-next-line global-require
//         const textEncoding = require('text-encoding-utf-8');
//         global.TextEncoder = textEncoding.TextEncoder;
//         global.TextDecoder = textEncoding.TextDecoder;
//         kloakBridge = new KloakBridge(() => {}, {
//             onConnected: () => {
//                 console.log(new Date().toISOString());
//                 console.log('NETWORK CONNECTED');
//             },
//             onConnecting: () => {
//                 console.log('NETWORK CONNECTING');
//             },
//             onConnectionFail: () => {
//                 console.log('NETWORK CONNECTION FAIL');
//             },
//             onMessage: () => {},
//             onDisconnected: () => {}
//         }, true, 'http://localhost:3000/');
//     });
//
//     test('Should create a new key pair and NOT unlock', async () => {
//         const [status] = await kloakBridge.createKey({ passphrase: encryptTestData.passphrase },
//             false);
//         expect(status).toBe('SUCCESS');
//     });
//
//     test('Should unlock a key pair', async () => {
//         const [, pgpKeys] = await kloakBridge.createKey({ passphrase: encryptTestData.passphrase },
//             false);
//         const [ status, encrypt ] = await kloakBridge.unlockKey(pgpKeys as PGPKeys, encryptTestData.passphrase);
//         encryptHelper = encrypt as EncryptHelper;
//         expect(status).toBe('SUCCESS');
//     });
//
//     test('Should create a new key pair and unlock', async () => {
//         const [ status, pgpKeys ] = await kloakBridge.createKey({ passphrase: encryptTestData.passphrase },
//             true);
//         expect(pgpKeys?.armoredPublicKey).toBeTruthy();
//         expect(pgpKeys?.armoredPrivateKey).toBeTruthy();
//         expect(status).toBe('SUCCESS');
//     });
//
//     test('Should save data', async () => {
//
//         const saveActionUuid = await kloakBridge.save(uuid, originalData);
//         expect(saveActionUuid).toBe(uuid);
//     });
//
//     test('Should retrieve data', async () => {
//         const data = await kloakBridge.retrieve(uuid);
//         expect(data).toBe(originalData);
//     });
//
//     test('Should delete data', async () => {
//         const deleteActionUuid = await kloakBridge.delete(uuid);
//         expect(deleteActionUuid).toBe(uuid);
//     });
//
//     test('Should encrypt and save data, returning generated UUID', async () => {
//         const [status] = await kloakBridge.encryptSave(encryptHelper as EncryptHelper, originalData);
//         expect(status).toBe('SUCCESS');
//     });
//
//     test('Should encrypt and save data, returning provided UUID', async () => {
//         const [status] = await kloakBridge.encryptSave(encryptHelper as EncryptHelper, originalData, uuid);
//         expect(status).toBe('SUCCESS');
//     });
//
//     test('Should retrieve and decrypt data, with provided UUID', async () => {
//         const [, data] = await kloakBridge.retrieveDecrypt(encryptHelper as EncryptHelper, uuid, false);
//         expect(data).toBe(originalData);
//     });
//
//     test('Should check keychain and return no keychain.', async () => {
//         const [ status ] = await kloakBridge.checkKeyContainer();
//         expect(status).toBe('DOES_NOT_EXIST');
//     });
//
//     test('Should check keychain and return keychain', async () => {
//         await kloakBridge.save('KeyContainer', keyChain);
//         await expect(kloakBridge.checkKeyContainer())
//             .resolves
//             .toBeTruthy();
//     });
//
//     test('Should create new container with encrypted keychain', async () => {
//         const [, newContainer ] = await kloakBridge.createKeyContainer('mysecretpassword');
//         console.log(newContainer);
//         const { keyID, armoredPublicKey, armoredPrivateKey } = newContainer!!.pgpKeys;
//         expect(keyID).toBeTruthy();
//         expect(armoredPublicKey).toBeTruthy();
//         expect(armoredPrivateKey).toBeTruthy();
//     });
//
//     test('Should create new container and be able to decrypt keychain.', async () => {
//         const [, newContainer ] = await kloakBridge.createKeyContainer('mysupersecretpassword');
//         const { keyID, armoredPublicKey, armoredPrivateKey } = newContainer!!.pgpKeys;
//         const tempEncrypt = new EncryptHelper();
//         await tempEncrypt.checkPassword({ keyID, armoredPublicKey, armoredPrivateKey }, 'mysupersecretpassword');
//         const [tx] = await IDBHelper.getTransaction();
//         if (tx) {
//             const encryptedKeychain = await IDBHelper.retrieve(tx, newContainer?.keychain as string);
//             const [, decryptedKeychain] = await tempEncrypt.decryptMessage(encryptedKeychain);
//             expect(decryptedKeychain).toBeTruthy();
//         }
//     });
//
//     test('Should create new container, decrypt keychain and create new KeyContainer class', async () => {
//         const [, newContainer] = await kloakBridge.createKeyContainer('mysupersecretpassword');
//         const { keyID, armoredPublicKey, armoredPrivateKey } = newContainer!!.pgpKeys;
//         const tempEncrypt = new EncryptHelper();
//         await tempEncrypt.checkPassword({ keyID, armoredPublicKey, armoredPrivateKey }, 'mysupersecretpassword');
//         const [tx] = await IDBHelper.getTransaction();
//         if (tx) {
//             const encryptedKeychain = await IDBHelper.retrieve(tx, newContainer?.keychain as string);
//             const [, keyChain] = await tempEncrypt.decryptMessage(encryptedKeychain);
//             keyContainer = new KeyContainer(tempEncrypt, newContainer?.keychain as string, keyChain as unknown as KeyChain);
//             const tempKey = JSON.stringify(keyContainer.getKeyChain());
//             expect(tempKey).toBe(JSON.stringify(keyChain));
//         }
//
//     });
//
//     test('Should get app data', async () => {
//         const [status, appData] = await kloakBridge.getAppData('1B3166C1914E82E6');
//         console.log(appData);
//         expect(status).toBe('SUCCESS');
//     });
//
//     test('Should get device key', async () => {
//         const [status, deviceKey] = await kloakBridge.getDeviceKey();
//         console.log(deviceKey);
//         expect(status).toBe('SUCCESS');
//     });
//
//     test('Should get kloak key', async () => {
//         const [status, kloakKey] = await kloakBridge.getSeguroKey();
//         console.log(kloakKey);
//         expect(status).toBe('SUCCESS');
//     });
//
//     test('Should switch KeyContainers class', async () => {
//         const [status, keyChainContainer] = await kloakBridge.changeKeyContainer('mysupersecretpassword', 'mynewpassword');
//         console.log(status, keyChainContainer);
//         // expect(JSON.stringify(newKeyContainer)).toBe(JSON.stringify(keyContainer?.getKeyChain()));
//     });
//
//     test('Should create new container, save into IndexedDB.', async () => {
//         const [ status ] = await kloakBridge.createKeyContainer('mypassword');
//         console.log(status);
//         expect(status).toBe('SUCCESS');
//     });
//
//     test('Should create new container, save into IndexedDB and delete container', async () => {
//         await kloakBridge.createKeyContainer('mypassword');
//         await kloakBridge.deleteKeyContainer();
//         const [ status ] = await kloakBridge.checkKeyContainer();
//         expect(status).toBe('DOES_NOT_EXIST');
//     });
//
//     // test('Should test network', async () => {
//     //     const [status] = await kloakBridge.testNetworkConnection('localhost', 3001);
//     //     console.log(status);
//     // }, 100000);
// });
