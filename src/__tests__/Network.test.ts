import KloakBridge from '../KloakBridge';
import { connectRequest, PGPKeys } from '../define';
import Network from '../Network';
require('fake-indexeddb/auto');

describe('Network Class Test', () => {
    jest.setTimeout(100000000);
    let kb: KloakBridge;
    let testDeviceKey: PGPKeys;
    let testKloakKey: PGPKeys;
    let seguroNextConnect: connectRequest['next_time_connect'];
    beforeAll(() => {
        // eslint-disable-next-line global-require
        const textEncoding = require('text-encoding-utf-8');
        global.TextEncoder = textEncoding.TextEncoder;
        global.TextDecoder = textEncoding.TextDecoder;
        kb = new KloakBridge();
    });

    test('Should generate a Key Container', async () => {
        const [status] = await kb.createKeyContainer('mypassword');
        if (status === 'SUCCESS') {
            const [, deviceKey] = (await kb.getKey('device') as [status: 'SUCCESS' | 'DOES_NOT_EXIST' | 'FAILURE', pgpKeys?: PGPKeys]);
            const [, kloakKey] = (await kb.getKey('device') as [status: 'SUCCESS' | 'DOES_NOT_EXIST' | 'FAILURE', pgpKeys?: PGPKeys]);
            testDeviceKey = deviceKey as PGPKeys;
            testKloakKey = kloakKey as PGPKeys;
        }
    });

    test('Should establish connection to Seguro', async () => {
        const [status, response] = await Network.connection(testDeviceKey, testKloakKey.armoredPublicKey, 'http://localhost:3000/getInformationFromSeguro');
        const newImapAccount = response?.next_time_connect?.imap_account;
        const newServerFolder = response?.next_time_connect?.server_folder;
        // seguroNextConnect = response?.next_time_connect;
        const [nextStatus, nextResponse] = await Network.connection(testDeviceKey, testKloakKey.armoredPublicKey, 'http://localhost:3000/getInformationFromSeguro', newImapAccount, newServerFolder);
        console.log(nextResponse);
        expect(status).toBe('SUCCESS');
        expect(nextStatus).toBe('SUCCESS');
    });

    // test('Should establish connection with Websocket', async () => {
    //     await Network.wsConnect('ws://localhost:3000/connectToSeguro', seguroConnectInfo as connectRequest['connect_info'], (err, data) => {
    //         console.log(err, data);
    //     });
    // });
});
