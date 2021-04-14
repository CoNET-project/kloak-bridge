import EncryptHelper from '../EncryptHelper';
import { PGPKeys } from '../define';

const encrypt = new EncryptHelper();
const passphrase = '1234';

const plainText = 'Hello, this is my message.';
let encryptedMessage = '';

let pgpKeys: PGPKeys = {
    keyID: '',
    armoredPrivateKey: '',
    armoredPublicKey: '',
    unlocked: false
};

describe('Encrypt Class', () => {
    beforeAll(() => {
        // eslint-disable-next-line global-require
        const textEncoding = require('text-encoding-utf-8');
        global.TextEncoder = textEncoding.TextEncoder;
        global.TextDecoder = textEncoding.TextDecoder;
    });

    test('Should generate an OpenPGP key pair.', async () => {
        const [, newPGPKeys] = await encrypt.generateKey({
            nickname: 'Bob',
            email: 'bob@gmail.com',
            passphrase
        });

        pgpKeys = newPGPKeys as PGPKeys;

        expect(pgpKeys?.armoredPublicKey).toBeTruthy();
        expect(pgpKeys?.armoredPrivateKey).toBeTruthy();
    });

    test('Should fail to unlock with INCORRECT passphrase.', async () => {
        const [status] = await encrypt.checkPassword(pgpKeys, 'wrongPassphrase');
        expect(status).toBe('INVALID_PASSPHRASE');
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
        const [status] = await encrypt.checkPassword(pgpKeys, passphrase);
        expect(status).toBe('SUCCESS');
    });

    test('Should encrypt message.', async () => {
        encryptedMessage = (await encrypt.encryptMessage(plainText))[1] as string;
        expect(encryptedMessage).not.toBeFalsy();
    });

    test('Should succeed to decrypt message.', async () => {
        const [, decryptedMsg] = await encrypt.decryptMessage(encryptedMessage);
        console.log(decryptedMsg);
        expect(decryptedMsg).toBe(plainText);
    });
});
