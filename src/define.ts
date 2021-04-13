import * as openpgp from 'openpgp';

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

export type KeyStatus = 'SUCCESS' | 'FAILURE' | 'INVALID_PASSPHRASE'

export type KeyResolve = [status: KeyStatus, payload?: PGPKeys]

export type DeleteKeychainStatus = 'SUCCESS' | 'FAILURE';

export type DeleteKeychainResolve = [status: DeleteKeychainStatus]

export type ChangeKeyContainerStatus = 'SUCCESS' | 'FAILURE' | 'NO_PASSPHRASE';

export type ChangeKeyContainerResolve = [status: ChangeKeyContainerStatus, payload?: KeyChainContainer]

export type CreateContainerStatus = 'SUCCESS' | 'FAILURE' | 'INVALID_PASSPHRASE';

export type CreateContainerResolve = [status: CreateContainerStatus, payload?: KeyChainContainer]

export type UnlockContainerStatus = 'SUCCESS' | 'FAILURE' | 'INVALID_PASSPHRASE' | 'MISSING_CONTAINER';

export type UnlockContainerResolve = [status: UnlockContainerStatus]

export type CheckContainerStatus = 'EXISTS' | 'DOES_NOT_EXIST';

export type CheckContainerResolve = [status: CheckContainerStatus, payload?: KeyChainContainer]

export type LockContainerStatus = 'SUCCESS' | 'FAILURE';

export type LockContainerResolve = [status: LockContainerStatus]

// export type KeyContainerStatus = 'SUCCESS' | 'INVALID_PASSWORD' | 'DOES_NOT_EXIST' | 'FAILURE'
//
// export type KeyContainerResolve = [status: KeyContainerStatus, payload?: KeyChainContainer]
