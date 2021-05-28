describe('Network test', () => {
    test('Should pass', () => {});
});
// import Network from '../Network';
//
// describe('Network', () => {
//
//     beforeAll(() => {
//         // eslint-disable-next-line global-require
//         const textEncoding = require('text-encoding-utf-8');
//         global.TextEncoder = textEncoding.TextEncoder;
//         global.TextDecoder = textEncoding.TextDecoder;
//     });
//
//     test('Should test IMAP server', async () => {
//         const [status, response] = await Network.testNetworkConnection('localhost', 3001);
//         if (status === 'SUCCESS' && response) {
//             response.map((res) => console.log(res));
//         }
//     }, 100000000);

// test('Should connect using connect_info', () => new Promise<void>((done) => {
//     const ws = Network.wsConnect('ws://localhost:3000/connectToSeguro', connectInfo, (err, data) => {
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
// }));

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
