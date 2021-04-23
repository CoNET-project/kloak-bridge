// import EncryptHelper from '../EncryptHelper';
// import { PGPKeys } from '../../dist';
// import Network from '../Network';
// import { connectRequest } from '../define';

describe('Network', () => {
    test('Should pass', () => {});
    // const encrypter = new EncryptHelper();
    // let device: PGPKeys;
    // let kloak: PGPKeys;
    // let connRequest: connectRequest;
    //
    // jest.setTimeout(1000000);
    //
    // beforeAll(() => {
    //     // eslint-disable-next-line global-require
    //     const textEncoding = require('text-encoding-utf-8');
    //     global.TextEncoder = textEncoding.TextEncoder;
    //     global.TextDecoder = textEncoding.TextDecoder;
    // });
    //
    // test('Create PGP Keys', async () => {
    //     const [, devicePGPKeys] = await encrypter.generateKey({ passphrase: '' });
    //     const [, kloakPGPKeys] = await encrypter.generateKey({ passphrase: '' });
    //     device = devicePGPKeys as PGPKeys;
    //     kloak = kloakPGPKeys as PGPKeys;
    //     console.log(device, kloak);
    // });
    //
    // test('Should connect and get back next_connect_info', async () => {
    //     const [status, request] = await Network.connection(device, kloak.armoredPublicKey,
    //         'http://localhost:3000/getInformationFromSeguro');
    //     if (status === 'SUCCESS') {
    //         connRequest = request as connectRequest;
    //     }
    // });
    //
    // test('Should connect using nextTimeConnect', async () => {
    //     Network.wsConnect('ws://localhost:3000/connectToSeguro', connRequest.connect_info, (err, data) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //         if (data) {
    //             console.log(data);
    //         }
    //     });
    // });
});
