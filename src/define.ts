import * as openpgp from 'openpgp';
import { Buffer } from 'buffer/';
// eslint-disable-next-line import/no-cycle
import EncryptHelper from './EncryptHelper';

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
    [appID: string]: Array<PGPKeys | {}>
}

export interface MessengerKey {
    pgpKeys: PGPKeys,
    profileUUID: string
}

export interface MessengerKeys {
    [keyID: string]: MessengerKey
}

export interface AppKeys {
    [keyID: string]: {
        keyID: string,
        armoredPublicKey: string,
        armoredPrivateKey: string,
        dataUUID?: string
    }
}

export interface KeyChain {
    device: PGPKeys | {},
    kloak: PGPKeys | {},
    apps: {
        [appKeyID: string]: {
            publicKey: string,
            keys: AppKeys
        }
    }
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

export type KeyStatus = 'SUCCESS' | 'FAILURE' | 'INVALID_PASSPHRASE'

export type KeyResolve = [status: KeyStatus, payload?: PGPKeys]

export type UnlockKeyResolve = [status: KeyStatus, payload?: EncryptHelper]

export type DeleteKeychainStatus = 'SUCCESS' | 'FAILURE';

export type DeleteKeychainResolve = [status: DeleteKeychainStatus]

export type ChangeKeyContainerStatus = 'SUCCESS' | 'FAILURE' | 'NO_PASSPHRASE';

export type ChangeKeyContainerResolve = [status: ChangeKeyContainerStatus, payload?: KeyChainContainer]

export type CreateContainerStatus = 'SUCCESS' | 'FAILURE' | 'INVALID_PASSPHRASE';

export type CreateContainerResolve = [status: CreateContainerStatus, payload?: KeyChainContainer]

export type UnlockContainerStatus = 'SUCCESS' | 'ALREADY_UNLOCKED' | 'FAILURE' | 'INVALID_PASSPHRASE' | 'MISSING_KEYCHAIN' | 'MISSING_CONTAINER';

export type UnlockContainerResolve = [status: UnlockContainerStatus]

export type CheckContainerStatus = 'EXISTS' | 'DOES_NOT_EXIST';

export type CheckContainerResolve = [status: CheckContainerStatus, payload?: KeyChainContainer]

export type LockContainerStatus = 'SUCCESS' | 'FAILURE';

export type LockContainerResolve = [status: LockContainerStatus];

export type EncryptResolve = [status: 'SUCCESS' | 'FAILURE', payload?: string]

export type DecryptResolve = [status: 'SUCCESS' | 'FAILURE', payload?: string | Buffer]

export type EncryptSaveResolve = [status: 'SUCCESS' | 'FAILURE', payload?: string]

export type RetrieveDecryptResolve = [status: 'SUCCESS' | 'FAILURE', payload?: string]

export type KeyChainGetKeysResolve = [status: 'SUCCESS' | 'DOES_NOT_EXIST' | 'FAILURE', pgpKeys?: {[keyID: string]: PGPKeys}]

// NETWORK DECLARATIONS FOR SEGURO LOCAL SERVER

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface imapConnect {
    imapServer: string
    imapUserName: string
    imapUserPassword: string
    imapPortNumber: number | number[]
    imapSsl: boolean
    imapIgnoreCertificate?: boolean
}

export interface IMAPAccount {
    imap_username: string
    imap_user_password: string
    imap_port_number: number
    imap_server: string
}

export interface next_time_connect {
    imap_account: IMAPAccount
    server_folder: string
}

export interface connect_imap_reqponse {
    imap_account: IMAPAccount
    server_folder: string
    client_folder: string
}

export interface connectRequest {
    kloak_account_armor: string
    device_armor: string
    client_folder_name: string
    use_kloak_shared_imap_account: boolean
    imap_account?: IMAPAccount
    next_time_connect?: next_time_connect
    error?: string
    server_folder?: string
    encrypted_response?: string
    encrypted_request?: string
    connect_info?: connect_imap_reqponse,
    requestJSON_text?: string
}

export interface connectRequest_test extends connectRequest {
    kloak_private?: string
    device_private?: string
    reponseJson?: connectRequest
}
