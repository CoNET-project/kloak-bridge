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

    describe('Testing static encryptWith and verifySignature functions', () => {
        const tempEncrypt = new EncryptHelper();
        let testPGPKey1: PGPKeys;
        let testPGPKey2: PGPKeys;
        let encryptedTestMessage: string;

        test('Should generate 3 key pairs', async () => {
            const [, pgpKey1] = await tempEncrypt.generateKey({ passphrase: '' });
            const [, pgpKey2] = await tempEncrypt.generateKey({ passphrase: '' });
            testPGPKey1 = pgpKey1 as PGPKeys;
            testPGPKey2 = pgpKey2 as PGPKeys;
        });

        test('Should successfully encrypt with testPGPKey1 public key and sign with testPGPKey2 private key', async () => {
            const message = 'Hello my super secret message!';
            const [status, encryptedMessage] = await EncryptHelper.encryptSignWith([testPGPKey1.armoredPublicKey], [ testPGPKey2.armoredPrivateKey], message);
            encryptedTestMessage = encryptedMessage as string;
            expect(status).toBe('SUCCESS');
        });

        test('Should verify with key ID of testPGPKey2', async () => {
            const keyIDs = await EncryptHelper.getEncryptionKeyIds(encryptedTestMessage);
            console.log(keyIDs, testPGPKey1.keyID, testPGPKey2.keyID);
            expect(keyIDs.includes(testPGPKey1.keyID)).toBe(true);
        });

        test('Should read keyId', async () => {
            const keyId = await EncryptHelper.getKeyId(testPGPKey1.armoredPublicKey);
            console.log(keyId);
        });
    });
});
