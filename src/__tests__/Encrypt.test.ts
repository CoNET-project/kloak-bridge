import Encrypt from '../Encrypt';
import { StringPGPKeys } from '../define';

const encrypt = new Encrypt();
const passphrase = '1234';

const plainText = 'Hello, this is my message.';
let encryptedMessage = '';

let stringPGPKeys: StringPGPKeys = {
    privateKey: '',
    publicKey: ''
};

describe('Encrypt Class', () => {
    beforeAll(() => {
        // eslint-disable-next-line global-require
        const textEncoding = require('text-encoding-utf-8');
        global.TextEncoder = textEncoding.TextEncoder;
        global.TextDecoder = textEncoding.TextDecoder;
    });

    test('Should generate an OpenPGP key pair.', async () => {
        stringPGPKeys = { ...await encrypt.generateKey({
            nickname: 'Bob',
            email: 'bob@gmail.com',
            passphrase
        }) };
        expect(stringPGPKeys.privateKey)
            .toBeTruthy();
        expect(stringPGPKeys.publicKey)
            .toBeTruthy();
    });

    test('Should fail to unlock with INCORRECT passphrase.', async () => {
        await expect(async () => encrypt.checkPassword(stringPGPKeys, 'wrongPassphrase'))
            .rejects
            .toThrow(Error);
        // try {
        //     const isCorrect = await encrypt.checkPassword(stringPGPKeys, 'wrongPassphrase');
        // } catch (err) {
        //     expect(err)
        //         .not
        //         .toBe(true);
        // }
        // done();
    });

    test('Should succeed to unlock with CORRECT passphrase.', async () => {
        const isCorrect = await encrypt.checkPassword(stringPGPKeys, passphrase);
        expect(isCorrect).toBe(true);
    });

    test('Should NOT unlock an unlocked key instance.', async () => {
        await expect(async () => encrypt.checkPassword(stringPGPKeys, passphrase))
            .rejects
            .toThrow();
    });

    test('Should encrypt message.', async () => {
        encryptedMessage = await encrypt.encryptMessage(plainText);
        expect(encryptedMessage).toBeTruthy();
    });

    test('Should succeed to decrypt message.', async () => {
        const decryptedMsg = await encrypt.decryptMessage(encryptedMessage);
        expect(decryptedMsg).toBe(plainText);
    });

    // test('Should encrypt message.', async (done) => {
    //     try {
    //         encryptedMessage = await encrypt.encryptMessage(plainText);
    //         expect(encryptedMessage)
    //             .toBeTruthy();
    //     } catch (err) {
    //         expect(err).toBe(false);
    //     }
    //     done();
    // });

    // test("Should succeed to decrypt message.", async (done) => {
    //     try {
    //         const decryptedMsg = await encrypt.decryptMessage(encryptedMessage);
    //         expect(decryptedMsg).toBe(plainText);
    //     } catch (err) {
    //         expect(err).toBe(undefined);
    //     }
    //     done();
    // })
});
