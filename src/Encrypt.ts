import * as openpgp from 'openpgp';
import { KeyOptions } from 'openpgp';
import { PGPGenerateOptions, PGPKeys, StringPGPKeys } from './define';

class Encrypt {
    private pgpKeyPair: PGPKeys = {};

    constructor() {
        openpgp.config.aeadProtect = true;
        openpgp.config.compression = openpgp.enums.compression.zip
    };


    public generateKey = (options: PGPGenerateOptions): Promise<StringPGPKeys> => {
        return new Promise((resolve, reject) => {
            const userIds = {
                name: options.nickname || '',
                email: options.email || ''
            }

            const pgpKeyOptions: KeyOptions = {
                passphrase: options.passphrase || '',
                userIds: [ userIds ],
                curve: 'ed25519'
            }

            return openpgp.generateKey(pgpKeyOptions).then(async (result: openpgp.KeyPair) => {
                const stringKeyPairs: StringPGPKeys = {
                    publicKey: result.publicKeyArmored,
                    privateKey: result.privateKeyArmored
                }
                return resolve(stringKeyPairs);
            } ).catch(reject)
        })
    }

    public checkPassword = (keyPair: StringPGPKeys, passphrase: string): Promise<boolean> => {
        return new Promise( async (resolve, reject) => {
            if (this.pgpKeyPair.armoredPublicKey && this.pgpKeyPair.armoredPrivateKey) {
                if ((this.pgpKeyPair.armoredPrivateKey !== keyPair.privateKey && this.pgpKeyPair.armoredPublicKey !== keyPair.publicKey)) {
                    const unlocked = this.pgpKeyPair.readPrivateKey?.isDecrypted()
                    return reject(new Error(`This instance contains an ${unlocked ? 'unlocked' : 'locked'} OpenPGP key pair, please start new instance.`))
                }
            }

            this.pgpKeyPair.armoredPublicKey = keyPair.publicKey;
            this.pgpKeyPair.armoredPrivateKey = keyPair.privateKey;
            this.pgpKeyPair.readPublicKey = await openpgp.readKey({armoredKey: keyPair.publicKey})
            this.pgpKeyPair.readPrivateKey = await openpgp.readKey({armoredKey: keyPair.privateKey})
            this.pgpKeyPair.readPrivateKey.decrypt(passphrase).then((ok: void) => resolve(true)).catch((err: any) => reject(false));
        })
    }

    public encryptMessage = (message: ArrayBuffer | Uint8Array | string): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                let uint8Data: Uint8Array | null;

                typeof message === 'string'
                    ? uint8Data = new Uint8Array(Buffer.from(message as string))
                    : uint8Data = new Uint8Array(message)

                const encryptedMsg = await openpgp.encrypt({
                    message: openpgp.Message.fromBinary(uint8Data),
                    publicKeys: this.pgpKeyPair.readPublicKey,
                    privateKeys: this.pgpKeyPair.readPrivateKey
                });

                return resolve(encryptedMsg);
            } catch (err) { reject(err) }
        })
    }

    public decryptMessage = (encryptedMessage: string): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                const message = await openpgp.readMessage({armoredMessage: encryptedMessage});
                const decrypted = await openpgp.decrypt({
                    message,
                    publicKeys: this.pgpKeyPair.readPublicKey, // for verification (optional)
                    privateKeys: this.pgpKeyPair.readPrivateKey // for decryption
                });
                return resolve(decrypted.data)
            } catch (err) {
                return reject(err)
            }
        })
    }
}

export default Encrypt;

