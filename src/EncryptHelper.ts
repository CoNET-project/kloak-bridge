import * as openpgp from 'openpgp';
import { KeyOptions } from 'openpgp';
import { Buffer } from 'buffer/';
import { isJSON } from './utils';
// eslint-disable-next-line import/no-cycle
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

    static modifyPGPMessage = (message: string, trim: boolean = false): string => {
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

    public generateKey = (options: PGPGenerateOptions): Promise<KeyResolve> => new Promise<KeyResolve>(async (resolve, _) => {
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
            const readPublicKey = await openpgp.readKey({ armoredKey: result.publicKeyArmored });
            const pgpKeys: PGPKeys = {
                keyID: readPublicKey.getKeyIds().map((key) => key.toHex().toUpperCase())[1],
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

    public checkPassword = (keyPair: PGPKeys, passphrase: string): Promise<KeyResolve> => new Promise<KeyResolve>(async (resolve, _) => {
        this.pgpKeyPair = keyPair;
        this.pgpKeyPair.readPublicKey = await openpgp.readKey({ armoredKey: this.pgpKeyPair.armoredPublicKey });
        this.pgpKeyPair.readPrivateKey = await openpgp.readKey({ armoredKey: this.pgpKeyPair.armoredPrivateKey });

        try {
            this.pgpKeyPair.readPrivateKey.decrypt(passphrase).then((_: void) => resolve(['SUCCESS'])).catch((_: any) => resolve(['INVALID_PASSPHRASE']));
        } catch (err) {
            return resolve(['FAILURE', err]);
        }
    })

    public encryptMessage = (originalData: ArrayBuffer | Uint8Array | string): Promise<EncryptResolve> => new Promise<EncryptResolve>(async (resolve, _) => {
        try {
            // @ts-ignore
            const base64Data = Buffer.from(originalData).toString('base64');

            const encryptedMsg = await openpgp.encrypt({
                message: await openpgp.Message.fromText(base64Data),
                publicKeys: this.pgpKeyPair.readPublicKey,
                privateKeys: this.pgpKeyPair.readPrivateKey
            });

            const modifiedPGP = EncryptHelper.modifyPGPMessage(encryptedMsg, true);
            return resolve(['SUCCESS', modifiedPGP]);
        } catch (err) { resolve(['FAILURE', err]); }

    })

    public decryptMessage = (encryptedMessage: string, buffer?: boolean): Promise<DecryptResolve> => new Promise<DecryptResolve>(async (resolve, _) => {
        const cleanEncrypted = EncryptHelper.modifyPGPMessage(encryptedMessage);
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

    static encryptSignWith = (encryptPublicKeys: Array<string>, signPrivateKey: Array<string>, data: ArrayBuffer | Uint8Array | string, trim = false): Promise<EncryptResolve> => (
        new Promise<EncryptResolve>(async (resolve, _) => {
            try {
                let privateKeys: Array<openpgp.Key> = [];
                const publicKeys = await Promise.all(encryptPublicKeys.map((armoredPublicKey) => openpgp.readKey({ armoredKey: armoredPublicKey })));
                if (signPrivateKey.length) {
                    privateKeys = await Promise.all(signPrivateKey.map((armoredPrivateKey) => openpgp.readKey({ armoredKey: armoredPrivateKey })));
                }
                // @ts-ignore
                const message = await openpgp.Message.fromText(data);
                const encrypted = await openpgp.encrypt({
                    message,
                    publicKeys,
                    privateKeys
                });

                let modified = encrypted;
                if (trim) {
                    modified = EncryptHelper.modifyPGPMessage(encrypted as string, trim);
                }
                return resolve(['SUCCESS', modified as string]);
            } catch (err) {
                return resolve(['FAILURE']);
            }
        })
    )

    static decryptWith = (pgpKeys: PGPKeys, encryptedMessage: string, checkKeyID?: string): Promise<[status: 'SUCCESS' | 'FAILURE' | 'KEYID_CHECK_ERROR', payload?: any]> => (
        new Promise<[status: 'SUCCESS' | 'FAILURE' | 'KEYID_CHECK_ERROR', payload?: any]>(async (resolve, _) => {
            const modifiedEncryptedMessage = EncryptHelper.modifyPGPMessage(encryptedMessage);
            const options = {
                privateKeys: await openpgp.readKey({ armoredKey: pgpKeys.armoredPrivateKey }),
                // publicKeys: await openpgp.readKey({ armoredKey: pgpKeys.armoredPublicKey }),
                message: await openpgp.readMessage({ armoredMessage: modifiedEncryptedMessage })
            };
            try {
                const decryptedMessage = await openpgp.decrypt(options);
                if (checkKeyID) {
                    if (decryptedMessage.signatures[0].keyid.toHex().toUpperCase() !== checkKeyID) {
                        return resolve(['KEYID_CHECK_ERROR']);
                    }
                }
                return resolve(['SUCCESS', decryptedMessage.data]);
            } catch (err) {
                return resolve(['FAILURE']);
            }
        })
    )

    static getKeyId = async (publicKey: string): Promise<string> => (
        new Promise<string>(async (resolve, _) => {
            const readKey = await openpgp.readKey({ armoredKey: publicKey });
            const keyIds = await readKey.getKeyIds();
            return resolve(keyIds[1].toHex().toUpperCase());
        })
    )

    static getEncryptionKeyIds = (encryptedMessage: string): Promise<Array<string>> => (
        new Promise<any>(async (resolve, _) => {
            const message = await openpgp.readMessage({ armoredMessage: encryptedMessage });
            resolve(message.getEncryptionKeyIds().map((keyid) => keyid.toHex().toUpperCase()));
        })
    )

    static validatePGPKey = (armoredKey: string): Promise<[status: 'VALID_KEY'| 'INVALID_KEY']> => (
        new Promise<[status: 'VALID_KEY' | 'INVALID_KEY']>(async (resolve, _) => {
            try {
                await openpgp.readKey({ armoredKey });
                return resolve(['VALID_KEY']);
            } catch (err) {
                return resolve(['INVALID_KEY']);
            }
        })
    )
}

export default EncryptHelper;
