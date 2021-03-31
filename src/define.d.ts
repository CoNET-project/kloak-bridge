import * as openpgp from 'openpgp';

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
