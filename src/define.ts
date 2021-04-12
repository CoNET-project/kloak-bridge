import * as openpgp from 'openpgp';

export type BridgeResolveStatus = 'NO_CONTAINER' | 'INVALID_PASSWORD' | 'SUCCESS'

export interface BridgeResolves {
    status: BridgeResolveStatus,
    payload?: any
}

export interface PGPKeys {
    keyID: string,
    armoredPublicKey: string,
    armoredPrivateKey: string,
    passphrase?: string,
    readPublicKey?: openpgp.Key,
    readPrivateKey?: openpgp.Key,
    unlocked?: boolean
}

export interface ApplicationKeys {
    [appID: string]: {
        [keyID: string]: PGPKeys
    }
}

export interface KeyChain {
    deviceKey: PGPKeys | {},
    kloakAccountKey: PGPKeys | {},
    storageKey: PGPKeys | {},
    messengerKeys: {
        [keyID: string]: PGPKeys
    } | {},
    applicationKeys: ApplicationKeys | {}
}

export interface KeyChainContainer {
    pgpKeys: {
        keyID: string,
        armoredPublicKey: string,
        armoredPrivateKey: string,
    },
    keyChain: string
}

export interface PGPGenerateOptions {
    nickname?: string,
    email?: string,
    passphrase: string
}

export type DisassemblySource = File | Blob;

export interface KloakFileIndex {
    chunks: {
        [offset:number]: string
    },
    lastOffset: number,
    eof: boolean
}

export interface KloakFileMetadata {
    uuid: string,
    name: string,
    extension: string,
    size: number,
    type: string,
    uploadDate: Date
}

export interface DisassemblyProgress {
    chunk?: {
        uuid: string,
        data: Uint8Array | ArrayBuffer
    },
    progress?: number,
    metadata?: KloakFileMetadata,
    index?: KloakFileIndex
}

export type DisassemblyCallback = (error: any, current: DisassemblyProgress, next?: () => void) => void;

export interface DisassemblyOptions {
    chunkSize: number,
    noEncrypt: boolean
}

export type AssemblyCallback = (error: any, progress: number, nextChunk?: string, data?: ArrayBuffer) => void;

export type KeyPairType = 'device' | 'kloak' | 'storage' | 'messenger' | 'application'
