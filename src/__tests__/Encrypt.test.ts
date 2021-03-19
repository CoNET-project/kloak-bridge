import 'jest';
import Encrypt from '../Encrypt';
import { PGPKeys, StringPGPKeys } from '../define';

const encrypt = new Encrypt();
const passphrase = '1234';

const plainText = 'Hello, this is my message.';
let encryptedMessage = '';

let stringPGPKeys: StringPGPKeys = {
    privateKey: '',
    publicKey: ''
};

describe('Encrypt Class', () => {
    beforeEach(() => {
        const textEncoding = require('text-encoding-utf-8');
        global.TextEncoder = textEncoding.TextEncoder;
        global.TextDecoder = textEncoding.TextDecoder;
    });

    test('Should generate an OpenPGP key pair.', async (done) => {
        stringPGPKeys = { ...await encrypt.generateKey({
            nickname: 'Bob',
            email: 'bob@gmail.com',
            passphrase
        }) };
        expect(stringPGPKeys.privateKey)
            .toBeTruthy();
        expect(stringPGPKeys.publicKey)
            .toBeTruthy();
        done();
    });

    test('Should fail to unlock with INCORRECT passphrase.', async (done) => {
        try {
            const isCorrect = await encrypt.checkPassword(stringPGPKeys, 'wrongPassphrase');
        } catch (err) {
            expect(err)
                .not
                .toBe(true);
        }
        done();
    });

    test('Should succeed to unlock with CORRECT passphrase.', async (done) => {
        try {
            const isCorrect = await encrypt.checkPassword(stringPGPKeys, passphrase);
            expect(isCorrect)
                .toBe(true);
        } catch (err) {
            expect(err)
                .toBe(undefined);
        }
        done();
    });

    test('Should NOT unlock an unlocked key instance.', async (done) => {
        try {
            const isCorrect = await encrypt.checkPassword(stringPGPKeys, passphrase);
            expect(isCorrect)
                .not.toBe(true);
        } catch (err) {
            expect(err)
                .not.toBe(undefined);
        }
        done();
    });

    test('Should encrypt message.', async (done) => {
        try {
            encryptedMessage = await encrypt.encryptMessage(plainText);
            expect(encryptedMessage)
                .toBeTruthy();
        } catch (err) {
            expect(err).toBe(false);
        }
        done();
    });

    test('Should succeed to decrypt message.', async (done) => {
        try {
            const decryptedMsg = await encrypt.decryptMessage(encryptedMessage);
            expect(decryptedMsg).toBe(plainText);
        } catch (err) {
            expect(err).toBe(undefined);
        }
        done();
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
