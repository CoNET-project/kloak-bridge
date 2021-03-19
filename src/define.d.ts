import * as openpgp from 'openpgp'

export interface PGPGenerateOptions {
    nickname?: string,
    email?: string,
    passphrase: string
}

export interface StringPGPKeys {
    publicKey: string,
    privateKey: string,
    unlocked?: boolean
}

export interface PGPKeys {
    armoredPublicKey?: string,
    armoredPrivateKey?: string,
    readPublicKey?: openpgp.Key,
    readPrivateKey?: openpgp.Key
}
