import * as openpgp from 'openpgp';
import { KeyOptions } from 'openpgp';
import { Buffer } from 'buffer/';
import { PGPGenerateOptions, PGPKeys, StringPGPKeys } from './define';

class EncryptHelper {
    private pgpKeyPair: PGPKeys = {};

    constructor() {
        openpgp.config.compression = openpgp.enums.compression.zip;
    }

    private isJSON = (text: string): boolean => {
        if (typeof text !== 'string') {
            return false;
        }
        try {
            JSON.parse(text);
            return true;
        } catch (error: any) {
            return false;
        }
    }

    public generateKey = (options: PGPGenerateOptions): Promise<StringPGPKeys> => new Promise<StringPGPKeys>(async (resolve, reject) => {

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

    public checkPassword = (keyPair: StringPGPKeys, passphrase: string): Promise<boolean> => new Promise<boolean>(async (resolve, reject) => {
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
    }

    public encryptMessage = (originalData: ArrayBuffer | Uint8Array | string): Promise<string> => new Promise<string>(async (resolve, reject) => {
        try {
            // @ts-ignore
            const base64Data = Buffer.from(originalData).toString('base64');

            const encryptedMsg = await openpgp.encrypt({
                message: await openpgp.Message.fromText(base64Data),
                publicKeys: this.pgpKeyPair.readPublicKey,
                privateKeys: this.pgpKeyPair.readPrivateKey
            });

            const modifiedPGP = this.modifyPGPMessage(encryptedMsg, true);
            return resolve(modifiedPGP);
        } catch (err) { reject(err); }

    })

    public decryptMessage = (encryptedMessage: string, buffer?: boolean): Promise<any> => new Promise(async (resolve, reject) => {
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
                return resolve(dataBuffer);
            }

            if (!buffer && this.isJSON(dataBuffer.toString())) {
                return resolve(JSON.parse(dataBuffer.toString()));
            }
            return resolve(dataBuffer.toString());
        } catch (err) {
            return reject(err);
        }
    })
}

export default EncryptHelper;
