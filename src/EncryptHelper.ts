import * as openpgp from 'openpgp';
import { KeyOptions } from 'openpgp';
import { Buffer } from 'buffer/';
import { isJSON } from './utils';
import { DecryptResolve, EncryptResolve, KeyResolve, PGPGenerateOptions, PGPKeys } from './define';

class EncryptHelper {
    private pgpKeyPair: PGPKeys = {
        keyID: '',
        armoredPrivateKey: '',
        armoredPublicKey: '',
        unlocked: false
    };

    constructor() {
        openpgp.config.compression = openpgp.enums.compression.zip;
    }

    public generateKey = (options: PGPGenerateOptions): Promise<KeyResolve> => new Promise<KeyResolve>(async (resolve, reject) => {

        const userIds = {
            name: options.nickname || '',
            email: options.email || ''
        };

        const pgpKeyOptions: KeyOptions = {
            passphrase: options.passphrase || '',
            userIds: [ userIds ],
            curve: 'ed25519'
        };

        return openpgp.generateKey(pgpKeyOptions).then(async (result: openpgp.KeyPair) => {
            const pgpKeys: PGPKeys = {
                keyID: result.key.getKeyId().toHex(),
                passphrase: options.passphrase,
                armoredPublicKey: result.publicKeyArmored,
                armoredPrivateKey: result.privateKeyArmored,
                unlocked: false
            };
            return resolve(['SUCCESS', pgpKeys]);
        }).catch((err) => resolve(['FAILURE', err]));
    })

    public isUnlocked = (): boolean => {
        if (this.pgpKeyPair?.readPrivateKey) {
            return this.pgpKeyPair?.readPrivateKey.isDecrypted();
        }
        return false;
    }

    public checkPassword = (keyPair: PGPKeys, passphrase: string): Promise<KeyResolve> => new Promise<KeyResolve>(async (resolve, reject) => {
        if (this.pgpKeyPair.armoredPublicKey && this.pgpKeyPair.armoredPrivateKey) {
            if ((this.pgpKeyPair.armoredPrivateKey === keyPair.armoredPrivateKey && this.pgpKeyPair.armoredPublicKey === keyPair.armoredPublicKey)) {
                const unlocked = await this.isUnlocked();
                if (unlocked) {
                    return reject(new Error(`This instance contains an ${unlocked ? 'unlocked' : 'locked'} OpenPGP key pair.`));
                }
            }
        }
        this.pgpKeyPair = keyPair;
        this.pgpKeyPair.readPublicKey = await openpgp.readKey({ armoredKey: this.pgpKeyPair.armoredPublicKey });
        this.pgpKeyPair.readPrivateKey = await openpgp.readKey({ armoredKey: this.pgpKeyPair.armoredPrivateKey });

        try {
            this.pgpKeyPair.readPrivateKey.decrypt(passphrase).then((_: void) => resolve(['SUCCESS'])).catch((_: any) => resolve(['INVALID_PASSPHRASE']));
        } catch (err) {
            return resolve(['FAILURE', err]);
        }
    })

    public modifyPGPMessage = (message: string, trim: boolean = false): string => {
        let modified: string;
        const pgpHead = '-----BEGIN PGP MESSAGE-----';
        const pgpComment = 'Comment: https://openpgpjs.org';
        const pgpMisc = /([A-Z])\w+: OpenPGP.js *.*/;
        const pgpEnd = '-----END PGP MESSAGE-----';

        modified = message.replace(pgpHead, '');
        modified = modified.replace(pgpComment, '');
        modified = modified.replace(pgpMisc, '');
        modified = modified.replace(pgpEnd, '');

        if (trim) {
            return modified.trim();
        }

        return pgpHead.concat('\r\n\r\n', message, '\r\n\r\n', pgpEnd);
    }

    public encryptMessage = (originalData: ArrayBuffer | Uint8Array | string): Promise<EncryptResolve> => new Promise<EncryptResolve>(async (resolve, reject) => {
        try {
            // @ts-ignore
            const base64Data = Buffer.from(originalData).toString('base64');

            const encryptedMsg = await openpgp.encrypt({
                message: await openpgp.Message.fromText(base64Data),
                publicKeys: this.pgpKeyPair.readPublicKey,
                privateKeys: this.pgpKeyPair.readPrivateKey
            });

            const modifiedPGP = this.modifyPGPMessage(encryptedMsg, true);
            return resolve(['SUCCESS', modifiedPGP]);
        } catch (err) { resolve(['FAILURE', err]); }

    })

    public decryptMessage = (encryptedMessage: string, buffer?: boolean): Promise<DecryptResolve> => new Promise(async (resolve, reject) => {
        const cleanEncrypted = this.modifyPGPMessage(encryptedMessage);
        try {
            const message = await openpgp.readMessage({ armoredMessage: cleanEncrypted });
            const decrypted = await openpgp.decrypt({
                message,
                publicKeys: this.pgpKeyPair.readPublicKey, // for verification (optional)
                privateKeys: this.pgpKeyPair.readPrivateKey // for decryption
            });
            const dataBuffer = Buffer.from(decrypted.data, 'base64');

            if (buffer) {
                return resolve(['SUCCESS', dataBuffer]);
            }

            if (!buffer && isJSON(dataBuffer.toString())) {
                return resolve(['SUCCESS', JSON.parse(dataBuffer.toString())]);
            }
            return resolve(['SUCCESS', dataBuffer.toString()]);
        } catch (err) {
            return resolve(['FAILURE', err]);
        }
    })
}

export default EncryptHelper;
