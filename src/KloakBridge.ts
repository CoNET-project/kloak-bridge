import { URL as NodeURL } from 'url';
import logger from './logger/logger';
import EncryptHelper from './EncryptHelper';
import IDBDatabaseHelper from './IDBDatabaseHelper';
import {
    KeyChainContainer,
    KeyChain,
    PGPGenerateOptions,
    PGPKeys,
    KeyResolve,
    CreateContainerResolve,
    UnlockContainerResolve,
    CheckContainerResolve,
    LockContainerResolve,
    ChangeKeyContainerResolve,
    DeleteKeychainResolve,
    EncryptSaveResolve,
    RetrieveDecryptResolve,
    UnlockKeyResolve,
    GetAppDataUUID,
    GetDeviceKey,
    GetSeguroKey,
    NetworkStatusListeners, ConnectRequest, SeguroConnection, NetworkPostStatus, connectImapResponse, NextTimeConnect, NetworkInformation, TestNetworkResponses, AppMessage, MessagesCache
} from './define';
import DisassemblyHelper from './DisassemblyHelper';
import AssemblyHelper from './AssemblyHelper';
import { getUUIDv4 } from './utils';
import KeyContainer from './KeyContainer';
import Network from './Network';
const log = logger.getLogger('KloakBridge()');

class KloakBridge {

    private reconnected = false
    static seguroConnection: SeguroConnection = {
        host: '',
        port: '',
        networkInstance: null,
        deviceKey: null,
        websocketConnection: null
    }
    private uploadHelpers: {[name: string]: DisassemblyHelper} = {};
    private assemblyHelpers: {[name: string]: AssemblyHelper} = {};
    private keyContainer: KeyContainer | undefined
    private IDBHelper = new IDBDatabaseHelper();
    private containerEncrypter: EncryptHelper = new EncryptHelper();
    private keyChainContainer: KeyChainContainer = {
        pgpKeys: {
            keyID: '',
            armoredPrivateKey: '',
            armoredPublicKey: ''
        },
        keychain: '',
        network: '',
        messagesCache: ''
    }
    private availableIMAPConnections: TestNetworkResponses = []
    private retryAttempts = 0;
    private MAX_RETRY_ATTEMPTS = 3;

    constructor(private onInitialized: () => void, private networkListener: NetworkStatusListeners, private skipNetwork = false, private localServerPath?: string) {
        this.init();
    }

    private init = async () => {
        if (!this.skipNetwork) {
            if ((typeof process !== 'undefined') && (process.release) && (process.release.name === 'node')) {
                this.getNetworkInformation(this.localServerPath || 'http://localhost:3000/');
            } else {
                this.getNetworkInformation(this.localServerPath || window.location.href);
            }
            this.testNetworkConnection(KloakBridge.seguroConnection.host, KloakBridge.seguroConnection.port);
        }
    }

    public testNetworkConnection = (host: string, port: string | number): Promise<[status: 'IMAP_AVAILABLE' | 'IMAP_UNAVAILABLE']> => (
        new Promise<[status: 'IMAP_AVAILABLE' | 'IMAP_UNAVAILABLE']>(async (resolve, _) => {
            const [status, data] = await Network.testNetworkConnection(host, port);
            if (status === 'SUCCESS' && data) {
                this.availableIMAPConnections = data.filter((imapConnections) => (!imapConnections.error));
                log('testNetworkConnection()', 'Kloak Bridge Network: Test IMAP availability', `Available IMAP connections: ${this.availableIMAPConnections.length} ${this.availableIMAPConnections}`);
                if (this.availableIMAPConnections.length) {
                    log('testNetworkConnection()', 'Kloak Bridge Network: Test IMAP availability: AVAILABLE');
                    return resolve(['IMAP_AVAILABLE']);
                }
            }
            log('testNetworkConnection()', 'Kloak Bridge Network: Test IMAP availability: UNAVAILABLE');
            return resolve(['IMAP_UNAVAILABLE']);
        })
    )

    private checkNetworkCompatibility = (imapServer: string): Promise<[status: 'OK' | 'UNAVAILABLE']> => (
        new Promise<[status: 'OK' | 'UNAVAILABLE']>((resolve, _) => {
            if (this.availableIMAPConnections) {
                for (let i = 0; i < this.availableIMAPConnections.length; i + 1) {
                    if (this.availableIMAPConnections[i].name === imapServer) {
                        log('checkNetworkCompatibility()', 'Kloak Bridge Network: Check Network IMAP compatibility: OK');
                        return resolve(['OK']);
                    }
                }
            }
            log('checkNetworkCompatibility()', 'Kloak Bridge Network: Check Network IMAP compatibility: UNAVAILABLE, RETRY');
            return resolve(['UNAVAILABLE']);
        })
    )

    private getNetworkInformation = (url: string) => {
        let URLObject;
        if ((typeof process !== 'undefined') && (process.release) && (process.release.name === 'node')) {
            URLObject = new NodeURL(url);
        } else {
            URLObject = new URL(url);
        }
        KloakBridge.seguroConnection.host = URLObject?.hostname;
        KloakBridge.seguroConnection.port = URLObject?.port;
        this.onInitialized();
    }

    private generateDefaultKeychain = (): Promise<KeyChain> => (
        new Promise<KeyChain>(async (resolve, _) => {
            const tempEncrypt = new EncryptHelper();
            const keyChain: KeyChain = {
                device: {},
                seguro: {},
                apps: {
                    '1B3166C1914E82E6': {
                        encryptionKeys: {},
                        publicKey: '-----BEGIN PGP PUBLIC KEY BLOCK-----\n'
                            + '\n'
                            + 'mDMEYH95kRYJKwYBBAHaRw8BAQdABxVZb2HjVFQ6b0fBpuaw+VonWyipYwKuOmFJ\n'
                            + 'LktZnNO0I1NlZ3VybyBBUFAgU3RvcmFnZSA8aW5mb0BLbG9hay5BUFA+iIwEEBYK\n'
                            + 'AB0FAmB/eZEECwkHCAMVCAoEFgIBAAIZAQIbAwIeAQAhCRClX5RiPh2UKRYhBGlz\n'
                            + '7eGLOKdFAb5AXqVflGI+HZQpTqABANgQEAze9/nSadNsRO2wO5eTD082uwusuTdu\n'
                            + '4kyjnPj3APsHIp9KZ8q1fhr/tuMnhAzd6Af7qbWrg8bqOJM9YH0EBrg4BGB/eZES\n'
                            + 'CisGAQQBl1UBBQEBB0CczBs6as6xtRvfFteiC8nMhgYWVz+zN9O67bb+0WrlagMB\n'
                            + 'CAeIeAQYFggACQUCYH95kQIbDAAhCRClX5RiPh2UKRYhBGlz7eGLOKdFAb5AXqVf\n'
                            + 'lGI+HZQpd7wBAKB2Tc3iOxr3+z5Xnd2dMw4wjDL/Cjibc/q04SFFK/wbAQCNWRDA\n'
                            + 'SnpMxR+L5LY/rH6HCZEvMhgnrQ7BShtqsR8iDg==\n'
                            + '=i7h1\n'
                            + '-----END PGP PUBLIC KEY BLOCK-----',
                        dataUUID: getUUIDv4()
                    },
                    '216AABF3D6764CB0': {
                        encryptionKeys: {},
                        publicKey: '-----BEGIN PGP PUBLIC KEY BLOCK-----\n'
                            + '\n'
                            + 'mDMEYH95kRYJKwYBBAHaRw8BAQdAMlOn5fTv0Q5bHTzQoRTovoawNrUu7r7VpOIB\n'
                            + 'oKadoW+0I1NlZ3VybyBBUFAgTWVzc2FnZSA8aW5mb0BLbG9hay5BUFA+iIwEEBYK\n'
                            + 'AB0FAmB/eZEECwkHCAMVCAoEFgIBAAIZAQIbAwIeAQAhCRBZ5LlX7OYxkBYhBIMY\n'
                            + 'YuopQCDqYrRSO1nkuVfs5jGQ0i4A/2Ik4QZcpSxeC5LP6NiMnm3kYl9ndqnYq8e3\n'
                            + 'WcG6dv/BAQCN5v1RV4FGiv1MNhKbSM+31iCL/G50z+gGQRWN7higArg4BGB/eZES\n'
                            + 'CisGAQQBl1UBBQEBB0Be4frT9RfwyK2n34IO4EUKQUuGb7zAau7qJBnwsH/kEQMB\n'
                            + 'CAeIeAQYFggACQUCYH95kQIbDAAhCRBZ5LlX7OYxkBYhBIMYYuopQCDqYrRSO1nk\n'
                            + 'uVfs5jGQHG0BANBOEX2bJL8DOg9squn5ZgZJJD9MBri7D5UB9gLe+jdTAPwJL1AF\n'
                            + 'MiddDkpztZ7FgDC13iUCfCJ7UNIB7dKnrgHCDQ==\n'
                            + '=o9sO\n'
                            + '-----END PGP PUBLIC KEY BLOCK-----',
                        dataUUID: getUUIDv4()
                    }
                }
            };
            const [, deviceKey] = await tempEncrypt.generateKey({ passphrase: '' });
            const [, seguroKey] = await tempEncrypt.generateKey({ passphrase: '' });
            const [, messengerKeys] = await tempEncrypt.generateKey({ passphrase: '' });
            const [, storageKeys] = await tempEncrypt.generateKey({ passphrase: '' });
            keyChain.apps['1B3166C1914E82E6'].encryptionKeys = messengerKeys as PGPKeys;
            keyChain.apps['216AABF3D6764CB0'].encryptionKeys = storageKeys as PGPKeys;
            keyChain.device = deviceKey as PGPKeys;
            keyChain.seguro = seguroKey as PGPKeys;
            return resolve(keyChain);
        })
    )

    public lockKeyContainer = (): Promise<LockContainerResolve> => (
        new Promise<LockContainerResolve>((resolve, _) => {
            this.keyContainer = undefined;
            return resolve(<LockContainerResolve>['SUCCESS']);
        })
    )

    private saveToMessagesCache = async (appId: string, message: string) => {
        const [decryptMessagesCacheStatus, decryptedMessagesCache] = await this.containerEncrypter.decryptMessage(this.keyChainContainer.messagesCache);
        log('saveToMessagesCache()', `Messages cache decryption status: ${decryptMessagesCacheStatus} with ${decryptedMessagesCache}.`);
        if (decryptMessagesCacheStatus === 'SUCCESS') {
            log('saveToMessagesCache()', 'Successfully decrypted messages cache.');
            const updatedMessagesCache: MessagesCache = {
                ...(decryptedMessagesCache as unknown as MessagesCache),
                [appId]: [
                    ...(decryptedMessagesCache as unknown as MessagesCache)[appId], message]
            };
            log('saveToMessagesCache()', 'Updated messages cache.');
            const [encryptMessagesCacheStatus, encryptedMessagesCache] = await this.containerEncrypter.encryptMessage(JSON.stringify(updatedMessagesCache));
            if (encryptMessagesCacheStatus === 'SUCCESS') {
                log('saveToMessagesCache()', 'Successfully encrypted messages cache.');
                const tx = this.IDBHelper.getTransaction();
                if (tx) {
                    await this.IDBHelper.save(tx, this.keyChainContainer.messagesCache, encryptedMessagesCache);
                }
                log('saveToMessagesCache()', 'Successfully saved messages cache.');
            }
        }
    }

    private saveNetworkInfo = async (connectInformation: connectImapResponse | null, nextConnectInformation: NextTimeConnect | null): Promise<boolean> => (
        new Promise<boolean>(async (resolve, _) => {
            const network: NetworkInformation = {
                connectInformation,
                nextConnectInformation
            };
            if (!this.keyChainContainer.network) {
                this.keyChainContainer.network = getUUIDv4();
            }
            try {
                const [status, encryptedNetwork] = await this.containerEncrypter.encryptMessage(JSON.stringify(network));
                if (status === 'SUCCESS') {
                    const tx = this.IDBHelper.getTransaction();
                    if (tx) {
                        await this.IDBHelper.save(tx, 'KeyContainer', this.keyChainContainer);
                        await this.IDBHelper.save(tx, this.keyChainContainer.network, encryptedNetwork);
                    }
                    log('networkWebSocket()', 'Kloak Bridge Network: Saved network information:', network);
                    return resolve(true);
                }
                resolve(false);
            } catch (err) {
                return resolve(false);
            }
        })
    )

    private networkWebSocket = (connectInformation: connectImapResponse) => {
        KloakBridge.seguroConnection.websocketConnection = Network.wsConnect(KloakBridge.seguroConnection.host, KloakBridge.seguroConnection.port, connectInformation, async (err, networkInstance: Network | null, message: string | null) => {
            if (err) {
                this.networkListener.onConnectionFail();
                KloakBridge.seguroConnection.websocketConnection?.close();
                log('networkWebSocket()', 'Kloak Bridge Network: Websocket disconnected');
            }
            if (networkInstance) {
                KloakBridge.seguroConnection.networkInstance = networkInstance;
                log('networkWebSocket()', 'Kloak Bridge Network: Network Instance returned', KloakBridge.seguroConnection.networkInstance);
                return this.networkListener.onConnected();
            }
            if (message) {
                const [deviceKeyStatus, deviceKey] = await this.getDeviceKey();
                if (deviceKeyStatus === 'SUCCESS') {
                    const [decryptStatus, decryptMessage] = await EncryptHelper.decryptWith(deviceKey as PGPKeys, message);
                    log('networkWebSocket()', 'Kloak Bridge Network: Websocket returned message:', decryptMessage);
                    if (decryptStatus === 'SUCCESS') {
                        let appMessage: AppMessage;
                        try {
                            appMessage = JSON.parse(decryptMessage) as AppMessage;
                            return this.networkListener.onMessage(appMessage.appId, appMessage.message, (appId: string, message: string) => this.saveToMessagesCache(appId, message));
                        } catch (err) {
                            console.log(err);
                            return null;
                        }
                    }
                }
            }
        });
    }

    public getMessagesCache = async (appId: string) => {
        const tx = this.IDBHelper.getTransaction();
        if (tx) {
            const encryptedMessagesCache = await this.IDBHelper.retrieve(tx, this.keyChainContainer.messagesCache);
            const [decryptedMessagesCacheStatus, decryptedMessagesCache] = await this.containerEncrypter.decryptMessage(encryptedMessagesCache);
            if (decryptedMessagesCacheStatus === 'SUCCESS') {
                if ((decryptedMessagesCache as unknown as MessagesCache)[appId]) {
                    return (decryptedMessagesCache as unknown as MessagesCache)[appId];
                }
            }
        }
        return [];
    }

    public reconnect = () => this.establishConnection()

    public disconnect = () => {
        try {
            KloakBridge.seguroConnection.websocketConnection?.close();
            KloakBridge.seguroConnection.networkInstance = null;
        } catch (err) {
            return;
        }
        return this.networkListener.onDisconnected();
    }

    // eslint-disable-next-line max-len
    private establishConnection = async () => {
        if (!this.availableIMAPConnections.length) {
            return this.networkListener.onConnectionFail('IMAP_UNAVAILABLE');
        }
        this.networkListener.onConnecting();
        const [deviceKeyStatus, deviceKey] = await this.getDeviceKey();
        const [seguroKeyStatus, seguroKey] = await this.getSeguroKey();

        const networkCallback = async ([status, request]: [status: 'SUCCESS' | 'FAILURE' | 'CONNECTION_TIMEOUT' | 'CONNECTION_FAILED', request?: ConnectRequest]) => {
            if (status === 'CONNECTION_TIMEOUT') {
                await this.saveNetworkInfo(null, null);
                log('establishConnection() networkCallback()', 'Kloak Bridge Network: Network connection time out', request);
                Network.connection(deviceKey as PGPKeys, seguroKey?.armoredPublicKey as string, KloakBridge.seguroConnection.host, KloakBridge.seguroConnection.port)
                    .then(networkCallback);
            }
            if (status === 'CONNECTION_FAILED') {
                await this.saveNetworkInfo(null, null);
            }
            if (status === 'SUCCESS') {
                if (request) {
                    const connectRequest: ConnectRequest = request as ConnectRequest;
                    log('establishConnection() networkCallback()', 'Kloak Bridge Network: Network returned connectRequest', request);
                    await this.saveNetworkInfo(connectRequest.connect_info as connectImapResponse, connectRequest.next_time_connect as NextTimeConnect);
                    this.networkWebSocket(connectRequest.connect_info as connectImapResponse);
                } else {
                    return this.establishConnection();
                }

            } else {
                this.networkListener.onConnectionFail();
            }
        };
        if (deviceKeyStatus === 'SUCCESS' && seguroKeyStatus === 'SUCCESS') {
            if (this.keyChainContainer.network) {
                log('establishConnection()', 'Kloak Bridge Network: Container has saved network information.');
                const tx = this.IDBHelper.getTransaction();
                let encryptedNetwork;
                if (tx) {
                    encryptedNetwork = await this.IDBHelper.retrieve(tx, this.keyChainContainer.network);
                }
                const [decryptNetworkStatus, decryptedNetwork] = await this.containerEncrypter.decryptMessage(encryptedNetwork);
                log('establishConnection()', 'Kloak Bridge Network: Saved network information', decryptedNetwork);
                if (decryptNetworkStatus === 'SUCCESS') {
                    const { nextConnectInformation } = decryptedNetwork as unknown as NetworkInformation;
                    if (nextConnectInformation) {
                        log('establishConnection()', 'Kloak Bridge Network: Saved network only has nextConnectInformation', nextConnectInformation);
                        Network.connection(deviceKey as PGPKeys, seguroKey?.armoredPublicKey as string, KloakBridge.seguroConnection.host, KloakBridge.seguroConnection.port, nextConnectInformation)
                            .then(networkCallback);
                    } else {
                        log('establishConnection()', 'Kloak Bridge Network: Container has network information but no connectionInformation and nextConnectInformation.');
                        Network.connection(deviceKey as PGPKeys, seguroKey?.armoredPublicKey as string, KloakBridge.seguroConnection.host, KloakBridge.seguroConnection.port)
                            .then(networkCallback);
                    }
                }
            } else {
                log('establishConnection()', 'Kloak Bridge Network: Container does not have saved network information.');
                Network.connection(deviceKey as PGPKeys, seguroKey?.armoredPublicKey as string, KloakBridge.seguroConnection.host, KloakBridge.seguroConnection.port)
                    .then(networkCallback);
            }
        }
        // if (this.keyChainContainer.network) {
        //     const encryptedNetwork = await this.IDBHelper.retrieve(this.keyChainContainer.network);
        //     const [ status, decryptedNetwork ] = await this.containerEncrypter.decryptMessage(encryptedNetwork);
        //     if (encryptedNetwork && status === 'SUCCESS') {
        //     // eslint-disable-next-line camelcase
        //         const { nextConnectInformation, connectInformation } = decryptedNetwork as unknown as NetworkInformation;
        //         // this.networkWebSocket(connectInformation, () => {
        //         //     this.networkStart(KloakBridge.seguroConnection.host, KloakBridge.seguroConnection.port, nextConnectInformation);
        //         // });
        //         // this.networkStart(urlPath, connectInformation, nextConnectInformation);
        //         // this.networkStart(deviceKey as PGPKeys, seguroKey?.armoredPublicKey as string, urlPath, imapAccount, serverFolder);
        //         return resolve();
        //     }
        // } else {
        //     this.networkStart(KloakBridge.seguroConnection.host, KloakBridge.seguroConnection.port);
        //     return resolve();
        // }
    }

    /**
     * Check if IndexedDB contains a "KeyChainContainer".
     */
    public checkKeyContainer = (): Promise<CheckContainerResolve> => (
        new Promise<CheckContainerResolve>(async (resolve, _) => {
            const tx = this.IDBHelper.getTransaction();
            if (tx) {
                const keyChainContainer: KeyChainContainer = await this.IDBHelper.retrieve(tx, 'KeyContainer');
                if (!keyChainContainer) {
                    return resolve(<CheckContainerResolve>['DOES_NOT_EXIST']);
                }
                return resolve(<CheckContainerResolve>['EXISTS', keyChainContainer]);
            }
            return resolve(<CheckContainerResolve>['DOES_NOT_EXIST']);
        })
    );

    /**
     * Unlock a "KeyChainContainer".
     * If no KeyChainContainer exists in IndexedDB, return error.
     */
    public unlockKeyContainer = (passphrase: string): Promise<UnlockContainerResolve> => (
        new Promise<UnlockContainerResolve>(async (resolve, _) => {
            const [status, keyChainContainer] = await this.checkKeyContainer();
            switch (status) {
                case 'EXISTS':
                    if (keyChainContainer?.pgpKeys && keyChainContainer?.keychain) {
                        this.keyChainContainer = keyChainContainer;
                        const [checkStatus] = await this.containerEncrypter.checkPassword(keyChainContainer?.pgpKeys, passphrase);
                        if (checkStatus === 'SUCCESS') {
                            const tx = this.IDBHelper.getTransaction();
                            if (tx) {
                                const encryptedKeychain = await this.IDBHelper.retrieve(tx, keyChainContainer.keychain);
                                const [, decryptedContainer] = await this.containerEncrypter.decryptMessage(encryptedKeychain);
                                this.keyContainer = new KeyContainer(this.containerEncrypter, keyChainContainer.keychain, decryptedContainer as unknown as KeyChain);
                                if (!this.skipNetwork) {
                                    await this.establishConnection();
                                }
                                const [status, deviceKey] = await this.getDeviceKey();
                                if (status === 'SUCCESS') {
                                    KloakBridge.seguroConnection.deviceKey = deviceKey as PGPKeys;
                                    return resolve(['SUCCESS']);
                                }
                            }
                            return resolve(['FAILURE']);
                        }
                        return resolve(['INVALID_PASSPHRASE']);
                    }
                    return resolve(['MISSING_KEYCHAIN']);
                case 'DOES_NOT_EXIST':
                    return resolve(['MISSING_CONTAINER']);
                default:
                    break;
            }
        })
    )

    /**
     * Create a KeyChainContainer and save into IndexedDB.
     */
    public createKeyContainer = (passphrase: string): Promise<CreateContainerResolve> => (
        new Promise<CreateContainerResolve>(async (resolve, _) => {
            try {
                const tempEncrypt = new EncryptHelper();
                const [, containerPGPKey] = await tempEncrypt.generateKey({ passphrase });
                await tempEncrypt.checkPassword(containerPGPKey as PGPKeys, passphrase);
                const defaultKeyChain = await this.generateDefaultKeychain();
                const keychainUUID = getUUIDv4();
                const [, encryptedKeyChain] = await tempEncrypt.encryptMessage(JSON.stringify(defaultKeyChain));
                const keyContainer: KeyChainContainer = {
                    pgpKeys: {
                        keyID: containerPGPKey?.keyID as string,
                        armoredPrivateKey: containerPGPKey?.armoredPrivateKey as string,
                        armoredPublicKey: containerPGPKey?.armoredPublicKey as string
                    },
                    keychain: keychainUUID,
                    network: '',
                    messagesCache: getUUIDv4()
                };
                const [, encryptedMessagesCache] = await tempEncrypt.encryptMessage(JSON.stringify({}));
                this.keyContainer = new KeyContainer(tempEncrypt, keychainUUID, defaultKeyChain);
                const tx = this.IDBHelper.getTransaction();
                console.log('GETTING TRANSACTION', tx);
                if (tx) {
                    console.log('I HAVE THE TRANSACTION');
                    await this.IDBHelper.save(tx, keychainUUID, encryptedKeyChain);
                    await this.IDBHelper.save(tx, keyContainer.messagesCache, encryptedMessagesCache);
                    await this.IDBHelper.save(tx, 'KeyContainer', keyContainer);
                    await this.IDBHelper.retrieve(tx, 'KeyContainer');
                    return resolve(<CreateContainerResolve>['SUCCESS', keyContainer]);
                }
                return resolve(<CreateContainerResolve>['FAILURE']);

            } catch (err) {
                console.log(err);
                return resolve(<CreateContainerResolve>['FAILURE']);
            }
        })
    );

    /**
     * Delete KeyChainContainer from IndexedDB.
     */
    public deleteKeyContainer = (): Promise<DeleteKeychainResolve> => (
        new Promise<DeleteKeychainResolve>(async (resolve, _) => {
            try {
                const tx = this.IDBHelper.getTransaction();
                if (tx) {
                    await this.IDBHelper.clearObjectStore(tx);
                    return resolve(<DeleteKeychainResolve>['SUCCESS']);
                }
                return resolve(<DeleteKeychainResolve>['FAILURE']);
            } catch (err) {
                return resolve(<DeleteKeychainResolve>['FAILURE']);
            }
        })
    )

    // public addAppID = async (appKeyID: string, publicKey: string) => this.keyContainer?.addAppID(appKeyID, publicKey);
    // public addAppKey = async (appKeyID: string, pgpKeys: PGPKeys) => this.keyContainer?.addAppKey(appKeyID, pgpKeys);
    // public getKey = async (appKeyID: string, keyId?: string) => this.keyContainer?.getKey(appKeyID, keyId)
    public getAppDataUUID = async (appKeyID: string) => this.keyContainer?.getAppDataUUID(appKeyID)
    /**
     * Change password from KeyChainContainer.
     */
    public changeKeyContainer = (oldPassphrase: string, newPassphrase: string): Promise<ChangeKeyContainerResolve> => (
        new Promise<ChangeKeyContainerResolve>(async (resolve, _) => {
            const tempEncrypt = new EncryptHelper();
            const [, newPGPKeys] = await tempEncrypt.generateKey({ passphrase: newPassphrase });
            try {
                const tx = this.IDBHelper.getTransaction();
                if (tx) {
                    const oldContainer: KeyChainContainer = await this.IDBHelper.retrieve(tx, 'KeyContainer');
                    const encryptedKeychain = await this.IDBHelper.retrieve(tx, oldContainer.keychain);
                    const [status] = await tempEncrypt.checkPassword(oldContainer.pgpKeys, oldPassphrase);
                    if (status === 'SUCCESS') {
                        const [, decryptedKeyChain] = await tempEncrypt.decryptMessage(encryptedKeychain);
                        await tempEncrypt.checkPassword(newPGPKeys as PGPKeys, newPassphrase);
                        const newContainer: KeyChainContainer = {
                            pgpKeys: {
                                keyID: newPGPKeys?.keyID as string,
                                armoredPublicKey: newPGPKeys?.armoredPublicKey as string,
                                armoredPrivateKey: newPGPKeys?.armoredPrivateKey as string
                            },
                            keychain: oldContainer.keychain,
                            network: oldContainer.network,
                            messagesCache: oldContainer.messagesCache
                        };
                        await this.IDBHelper.save(tx, 'keyContainer', JSON.stringify(newContainer));
                        this.keyContainer = new KeyContainer(tempEncrypt, newContainer.keychain, decryptedKeyChain as unknown as KeyChain);
                        return resolve(['SUCCESS', newContainer]);
                    }
                }
                return resolve(['FAILURE']);
            } catch (err) {
                return resolve(['FAILURE']);
            }
        })
    )

    /**
     * Create an OpenPGP key pair.
     */
    public createKey = (options: PGPGenerateOptions, unlock?: boolean): Promise<KeyResolve> => (
        new Promise<KeyResolve>(async (resolve, _) => {
            const tempEncrypt = await new EncryptHelper();
            const [, pgpKeys] = await tempEncrypt.generateKey(options);
            if (unlock) {
                try {
                    const [status] = await tempEncrypt.checkPassword(pgpKeys as PGPKeys, options.passphrase);
                    (pgpKeys as PGPKeys).unlocked = status === 'SUCCESS';
                } catch (err) {
                    return resolve(<KeyResolve><unknown>['FAILURE', null]);
                }
            }
            return resolve(<KeyResolve>['SUCCESS', pgpKeys]);
        })
    )

    /**
     * Unlock an OpenPGP key pair.
     */
    public unlockKey = (pgpKeys: PGPKeys, passphrase: string): Promise<UnlockKeyResolve> => (
        new Promise<UnlockKeyResolve>(async (resolve, _) => {
            try {
                const tempEncrypt = await new EncryptHelper();
                const [status] = await tempEncrypt.checkPassword(pgpKeys, passphrase);
                if (status === 'SUCCESS') {
                    return resolve(<UnlockKeyResolve>['SUCCESS', tempEncrypt]);
                }
                return resolve(<UnlockKeyResolve>['INVALID_PASSPHRASE']);

            } catch (err) {
                return resolve(<UnlockKeyResolve>['FAILURE']);
            }
        })
    )

    public retrieve = (uuid: string): Promise<any> => (
        new Promise<any>(async (resolve) => {
            const tx = this.IDBHelper.getTransaction();
            if (tx) {
                const value = await this.IDBHelper.retrieve(tx, uuid);
                return resolve(value);
            }
        })
    )

    public save = (uuid: string, data: any): Promise<any> => (
        new Promise<any>(async (resolve) => {
            const tx = this.IDBHelper.getTransaction();
            if (tx) {
                const value = await this.IDBHelper.save(tx, uuid, data);
                return resolve(value);
            }
            return resolve(null);
        })
    )

    public delete = async (uuid: string): Promise<any> => (
        new Promise<any>(async (resolve) => {
            const tx = this.IDBHelper.getTransaction();
            if (tx) {
                const value = await this.IDBHelper.delete(tx, uuid);
                return resolve(value);
            }
            return resolve(null);
        })
    )

    public encryptSave = (encryptHelper: EncryptHelper, data: ArrayBuffer | Uint8Array | string, uuid?: string): Promise<EncryptSaveResolve> => (
        new Promise<EncryptSaveResolve>(async (resolve, _) => {
            if (!encryptHelper.isUnlocked()) {
                return resolve(['FAILURE']);
            }
            try {
                const [, encryptedMessage] = await encryptHelper.encryptMessage(data);
                await this.save(uuid || getUUIDv4(), encryptedMessage);
                return resolve(['SUCCESS']);
            } catch (err) {
                return resolve(['FAILURE', err]);
            }
        })
    )

    public retrieveDecrypt = (encryptHelper: EncryptHelper, uuid: string, buffer?: boolean): Promise<RetrieveDecryptResolve> => (
        new Promise<RetrieveDecryptResolve>(async (resolve, reject) => {
            if (!encryptHelper.isUnlocked()) {
                return resolve(['FAILURE']);
            }
            try {
                const encryptedMsg = await this.retrieve(uuid);
                const [, decryptedMsg] = await encryptHelper.decryptMessage(encryptedMsg, buffer);
                return resolve(['SUCCESS', decryptedMsg as string]);
            } catch (err) {
                return reject(err);
            }
        })
    )

    public encryptWithDeviceKey = (data: string): Promise<[status: 'SUCCESS' | 'FAILURE', encryptedData?: string]> => (
        new Promise<[status: 'SUCCESS' | 'FAILURE', encryptedData?: string]>(async (resolve, _) => {
            if (!this.keyContainer) {
                return resolve(['FAILURE']);
            }
            try {
                const devicePGPKey = this.keyContainer.getKeyChain().device;
                const tempEncrypt = new EncryptHelper();
                await tempEncrypt.checkPassword(devicePGPKey as PGPKeys, '');
                const [status, encryptedMessage] = await tempEncrypt.encryptMessage(data);
                if (status === 'SUCCESS') {
                    return resolve(['SUCCESS', encryptedMessage]);
                }
                return resolve(['FAILURE']);
            } catch (err) {
                return resolve(['FAILURE']);
            }
        })
    )

    public getDeviceKey = (): Promise<GetDeviceKey> => (
        new Promise<GetDeviceKey>(async (resolve, _) => {
            if (!this.keyContainer) {
                return resolve(['NO_KEY_CONTAINER']);
            }
            return resolve(await this.keyContainer.retrieveDeviceKey());
        })
    )

    public getSeguroKey = (): Promise<GetSeguroKey> => (
        new Promise<GetSeguroKey>(async (resolve, _) => {
            if (!this.keyContainer) {
                return resolve(['NO_KEY_CONTAINER']);
            }
            return resolve(await this.keyContainer.retrieveSeguroKey());
        })
    )

    public getAppData = (appID: string): Promise<GetAppDataUUID> => (
        new Promise<GetAppDataUUID>(async (resolve, _) => {
            if (!this.keyContainer) {
                return resolve(['NO_KEY_CONTAINER']);
            }
            const [status, appData] = await this.keyContainer.getAppDataUUID(appID);
            return resolve([status, appData]);
        })
    )

    /*
    *
    * NETWORK FUNCTIONS
    * */

    static sendToClient = (message: string, appId: string, recipientDeviceKey: string): Promise<NetworkPostStatus> => (
        new Promise<NetworkPostStatus>(async (resolve, _) => {
            if (KloakBridge.seguroConnection.networkInstance) {
                const { deviceKey } = KloakBridge.seguroConnection;
                if (!deviceKey) {
                    return resolve(['FAILURE']);
                }
                const [ networkStatus ] = await KloakBridge.seguroConnection.networkInstance.sendToClient(message, appId, recipientDeviceKey, deviceKey?.armoredPrivateKey as string);
                return resolve([networkStatus]);
            }
            return resolve(['NOT_CONNECTED']);
        })
    )

    // public upload = (encryptInstance: string, source: File | Blob, callback: (err: Error | null, progress: number, done: boolean) => void): Promise<string> => (
    //     new Promise<string>((resolve, _) => {
    //         const uuid = getUUIDv4();
    //         const disassemblyHelper = new DisassemblyHelper(source, async (err, current, next) => {
    //             if (err) {
    //                 return callback(err, 0, !next);
    //             }
    //             if (current && current.progress && current.chunk) {
    //                 try {
    //                     this.encryptSave(encryptInstance, current.chunk.data, current.chunk.uuid).then(() => {
    //                         if (next) {
    //                             next();
    //                         }
    //                         callback(null, current.progress as number, !next);
    //                     });
    //                     if (current.metadata && current.index) {
    //                         await this.encryptSave(encryptInstance, JSON.stringify(current.index), uuid);
    //                         // SHOULD STORE THIS METADATA INTO A MASTER STORAGE LIST
    //                         console.log(current.metadata, current.index);
    //                         return resolve(uuid);
    //
    //                     }
    //                 } catch (error) {
    //                     return callback(err, 0, !next);
    //                 }
    //             }
    //         });
    //         this.uploadHelpers[uuid] = disassemblyHelper;
    //     })
    // )
    //
    // public download = (encryptInstance: string, uuid: string, callback: (err: Error | null, progress: number) => void): Promise<unknown> => (
    //     new Promise<unknown>(async (resolve, reject) => {
    //         const index: KloakFileIndex = await this.retrieveDecrypt(encryptInstance, uuid);
    //         const assemblyHelper: AssemblyHelper = new AssemblyHelper(index, async (error, progress, nextChunk, data) => {
    //             if (error) {
    //                 return reject(new Error(error));
    //             }
    //             if (progress) {
    //                 callback(null, progress);
    //             }
    //             if (nextChunk) {
    //                 const data = await this.retrieveDecrypt(encryptInstance, nextChunk, true);
    //                 console.log(data);
    //                 return assemblyHelper.append(nextChunk, data);
    //             }
    //             if (data) {
    //                 callback(null, 100);
    //                 return resolve(uuid);
    //             }
    //         });
    //         this.assemblyHelpers[uuid] = assemblyHelper;
    //     })
    // )
}

export default KloakBridge;
