// import EncryptHelper from '../EncryptHelper';
// import { PGPKeys } from '../../dist';
// import Network from '../Network';
// import { connectRequest } from '../define';

import { PGPKeys } from '../define';
import EncryptHelper from '../EncryptHelper';

describe('Network', () => {
    const pgpkeys: PGPKeys = {
        keyID: 'B24C80AB872C9734',
        passphrase: '',
        armoredPublicKey: '-----BEGIN PGP PUBLIC KEY BLOCK-----\n'
            + '\n'
            + 'xjMEYIMbaxYJKwYBBAHaRw8BAQdAS+pkiJhT3cyQq9CoOITGtO0mBs7EUqdR\n'
            + 'kJTpmNVKj6zNAMKMBBAWCgAdBQJggxtrBAsJBwgDFQgKBBYBAgACGQECGwMC\n'
            + 'HgEAIQkQiB0DJfn6rLoWIQSLSWNwQzdZstfUOsCIHQMl+fqsuuIhAQCJp7eM\n'
            + '8ae/lHiHvnV4eay0DuLOJE9w0jOkBFA1j/7uwQEAv/jk2cwzWQGGL8V9Tad7\n'
            + 'TatHIrts+3b4xuNomYGTfgbOOARggxtrEgorBgEEAZdVAQUBAQdAO3waZphT\n'
            + 'MQAEY8v/Ijt8HRj/lbOgyG899Eypb7VfW10DAQgHwngEGBYIAAkFAmCDG2sC\n'
            + 'GwwAIQkQiB0DJfn6rLoWIQSLSWNwQzdZstfUOsCIHQMl+fqsumuiAP9w85Um\n'
            + 'mIq9MhMFTxlAmbTqnbQv3o10GvQoON8nyO6f6wEAz+t3pceFeAkQcQ+HXWci\n'
            + 'IEQkdglR8OrkLzbKj9kjLQc=\n'
            + '=S7DK\n'
            + '-----END PGP PUBLIC KEY BLOCK-----\n',
        armoredPrivateKey: '-----BEGIN PGP PRIVATE KEY BLOCK-----\n'
            + '\n'
            + 'xVgEYIMbaxYJKwYBBAHaRw8BAQdAS+pkiJhT3cyQq9CoOITGtO0mBs7EUqdR\n'
            + 'kJTpmNVKj6wAAP4nGkJsrsYKwZn/O+NKfwZtPuocLB7aQSqkYBHSUUvNEQ5S\n'
            + 'zQDCjAQQFgoAHQUCYIMbawQLCQcIAxUICgQWAQIAAhkBAhsDAh4BACEJEIgd\n'
            + 'AyX5+qy6FiEEi0ljcEM3WbLX1DrAiB0DJfn6rLriIQEAiae3jPGnv5R4h751\n'
            + 'eHmstA7iziRPcNIzpARQNY/+7sEBAL/45NnMM1kBhi/FfU2ne02rRyK7bPt2\n'
            + '+MbjaJmBk34Gx10EYIMbaxIKKwYBBAGXVQEFAQEHQDt8GmaYUzEABGPL/yI7\n'
            + 'fB0Y/5WzoMhvPfRMqW+1X1tdAwEIBwAA/3j+02ca6yoRLC8x+RrT0/xHZ/Ev\n'
            + 'g6LergKmM9Mp7BBwEPLCeAQYFggACQUCYIMbawIbDAAhCRCIHQMl+fqsuhYh\n'
            + 'BItJY3BDN1my19Q6wIgdAyX5+qy6a6IA/3DzlSaYir0yEwVPGUCZtOqdtC/e\n'
            + 'jXQa9Cg43yfI7p/rAQDP63elx4V4CRBxD4ddZyIgRCR2CVHw6uQvNsqP2SMt\n'
            + 'Bw==\n'
            + '=wS7G\n'
            + '-----END PGP PRIVATE KEY BLOCK-----\n',
        unlocked: false
    };
    test('Should pass', async () => {
        const t = new EncryptHelper();
        const d = await t.checkPassword(pgpkeys, '');
        console.log(pgpkeys);
        console.log(d);
    });
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
