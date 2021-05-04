describe('Network test', () => {
    test('Should pass', () => {});
});
// import EncryptHelper from '../EncryptHelper';
// import { PGPKeys } from '../../dist';
// import Network from '../Network';
// import { connectRequest, IMAPAccount } from '../define';
//
// describe('Network', () => {
//     const encrypter = new EncryptHelper();
//     let device: PGPKeys;
//     let kloak: PGPKeys;
//     let connRequest: connectRequest;
//     const nextConnectInfo: {imapAccount: IMAPAccount, serverFolder: string} = {
//         imapAccount: {
//             imap_server: '',
//             imap_user_password: '',
//             imap_port_number: 0,
//             imap_username: ''
//         },
//         serverFolder: ''
//     };
//
//     jest.setTimeout(1000000);
//
//     beforeAll(() => {
//         // eslint-disable-next-line global-require
//         const textEncoding = require('text-encoding-utf-8');
//         global.TextEncoder = textEncoding.TextEncoder;
//         global.TextDecoder = textEncoding.TextDecoder;
//     });
//
//     test('Create PGP Keys', async () => {
//         const [, devicePGPKeys] = await encrypter.generateKey({ passphrase: '' });
//         const [, kloakPGPKeys] = await encrypter.generateKey({ passphrase: '' });
//         device = devicePGPKeys as PGPKeys;
//         kloak = kloakPGPKeys as PGPKeys;
//     });
//
//     test('Should connect and get back next_connect_info', async () => {
//         const [status, request] = await Network.connection(device, kloak.armoredPublicKey,
//             'http://localhost:3000/getInformationFromSeguro');
//         if (status === 'SUCCESS') {
//             console.log(request);
//             connRequest = request as connectRequest;
//             nextConnectInfo.imapAccount = connRequest?.next_time_connect?.imap_account as unknown as IMAPAccount;
//             nextConnectInfo.serverFolder = connRequest?.next_time_connect?.server_folder as string;
//         }
//     });

// test('Should connect using connect_info', (done) => {
//     const ws = Network.wsConnect('ws://localhost:3000/connectToSeguro', connRequest.connect_info, (err, data) => {
//         if (err) {
//             console.log(err);
//         }
//         if (data) {
//             console.log(data);
//             if (/Connected/.test(data.status)) {
//                 ws.close();
//                 done();
//             }
//         }
//     });
// });

// test('Should connect using next_connect_info and connect to webSocket', async () => {
//     const [status, request] = await Network.connection(device, kloak.armoredPublicKey,
//         'http://localhost:3000/getInformationFromSeguro', nextConnectInfo.imapAccount, nextConnectInfo.serverFolder);
//     if (status === 'SUCCESS') {
//         Network.wsConnect('ws://localhost:3000/connectToSeguro', request?.connect_info, (err, data) => {
//             if (err) {
//                 console.log(err);
//             }
//             if (data) {
//                 console.log(data);
//             }
//         });
//     }
// });
// });
