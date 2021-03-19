import * as openpgp from 'openpgp';
import { KeyOptions } from 'openpgp';
// eslint-disable-next-line import/no-unresolved
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
    public checkPassword = (keyPair: StringPGPKeys, passphrase: string): Promise<boolean> => (
        new Promise(async (resolve, reject) => {
            if (this.pgpKeyPair.armoredPublicKey && this.pgpKeyPair.armoredPrivateKey) {
                if ((this.pgpKeyPair.armoredPrivateKey !== keyPair.privateKey && this.pgpKeyPair.armoredPublicKey !== keyPair.publicKey)) {
                    const unlocked = this.pgpKeyPair.readPrivateKey?.isDecrypted();
                    return reject(new Error(`This instance contains an ${unlocked ? 'unlocked' : 'locked'} OpenPGP key pair.`));
                }
            }

            this.pgpKeyPair.armoredPublicKey = keyPair.publicKey;
            this.pgpKeyPair.armoredPrivateKey = keyPair.privateKey;
            this.pgpKeyPair.readPublicKey = await openpgp.readKey({ armoredKey: keyPair.publicKey });
            this.pgpKeyPair.readPrivateKey = await openpgp.readKey({ armoredKey: keyPair.privateKey });
            this.pgpKeyPair.readPrivateKey.decrypt(passphrase).then((_: void) => resolve(true)).catch((err: any) => reject(err));
        })
    )
    public encryptMessage = (message: ArrayBuffer | Uint8Array | string): Promise<any> => (
        new Promise(async (resolve, reject) => {
            try {
                let uint8Data: Uint8Array | null;

                if (typeof message === 'string') {
                    // @ts-ignore
                    uint8Data = new Uint8Array(Buffer.from(message as string));
                } else {
                    uint8Data = new Uint8Array(message);
                }

                const encryptedMsg = await openpgp.encrypt({
                    message: openpgp.Message.fromBinary(uint8Data),
                    publicKeys: this.pgpKeyPair.readPublicKey,
                    privateKeys: this.pgpKeyPair.readPrivateKey
                });

                return resolve(encryptedMsg);
            } catch (err) { reject(err); }
        })
    )
    public decryptMessage = (encryptedMessage: string): Promise<any> => new Promise(async (resolve, reject) => {
        try {
            const message = await openpgp.readMessage({ armoredMessage: encryptedMessage });
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
