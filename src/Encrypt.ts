import * as openpgp from 'openpgp';
import { KeyOptions } from 'openpgp';
import { PGPGenerateOptions, PGPKeys, StringPGPKeys } from './define';

class Encrypt {
    private pgpKeyPair: PGPKeys = {};
    constructor() {
        openpgp.config.aeadProtect = true;
        openpgp.config.compression = openpgp.enums.compression.zip;
    }
    public generateKey = (options: PGPGenerateOptions): Promise<StringPGPKeys> => new Promise((resolve, reject) => {
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
            const stringKeyPairs: StringPGPKeys = {
                publicKey: result.publicKeyArmored,
                privateKey: result.privateKeyArmored
            };
            return resolve(stringKeyPairs);
        }).catch(reject);
    })
    public isUnlocked = (): boolean => {
        if (this.pgpKeyPair?.readPrivateKey) {
            return this.pgpKeyPair?.readPrivateKey.isDecrypted();
        }
        return false;
    }
    public checkPassword = (keyPair: StringPGPKeys, passphrase: string): Promise<boolean> => new Promise(async (resolve, reject) => {
        if (this.pgpKeyPair.armoredPublicKey && this.pgpKeyPair.armoredPrivateKey) {
            if ((this.pgpKeyPair.armoredPrivateKey === keyPair.privateKey && this.pgpKeyPair.armoredPublicKey === keyPair.publicKey)) {
                const unlocked = await this.isUnlocked();
                if (unlocked) {
                    return reject(new Error(`This instance contains an ${unlocked ? 'unlocked' : 'locked'} OpenPGP key pair.`));
                }
            }
        }

        this.pgpKeyPair.armoredPublicKey = keyPair.publicKey;
        this.pgpKeyPair.armoredPrivateKey = keyPair.privateKey;
        this.pgpKeyPair.readPublicKey = await openpgp.readKey({ armoredKey: keyPair.publicKey });
        this.pgpKeyPair.readPrivateKey = await openpgp.readKey({ armoredKey: keyPair.privateKey });
        return this.pgpKeyPair.readPrivateKey.decrypt(passphrase).then((_: void) => resolve(true)).catch((err: any) => reject(err));
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
        return pgpHead.concat(message, pgpEnd);
    }
    public encryptMessage = (message: ArrayBuffer | Uint8Array | string): Promise<any> => new Promise(async (resolve, reject) => {
        let encryptedMsg = '';
        try {
            let uint8Data: Uint8Array | null;

            if (typeof message === 'string') {
                uint8Data = new Uint8Array(Buffer.from(message as string));
            } else {
                uint8Data = new Uint8Array(message);
            }

            encryptedMsg = await openpgp.encrypt({
                message: openpgp.Message.fromBinary(uint8Data),
                publicKeys: this.pgpKeyPair.readPublicKey,
                privateKeys: this.pgpKeyPair.readPrivateKey
            });

            encryptedMsg = this.modifyPGPMessage(encryptedMsg, true);

        } catch (err) { reject(err); }

        return resolve(encryptedMsg);
    })
    public decryptMessage = (encryptedMessage: string): Promise<any> => new Promise(async (resolve, reject) => {
        const cleanEncrypted = this.modifyPGPMessage(encryptedMessage);
        try {
            const message = await openpgp.readMessage({ armoredMessage: cleanEncrypted });
            const decrypted = await openpgp.decrypt({
                message,
                publicKeys: this.pgpKeyPair.readPublicKey, // for verification (optional)
                privateKeys: this.pgpKeyPair.readPrivateKey // for decryption
            });
            return resolve(decrypted.data);
        } catch (err) {
            return reject(err);
        }
    })
}

export default Encrypt;
