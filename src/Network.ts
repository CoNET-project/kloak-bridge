import { URL as NodeURL } from 'url';
import NodeWebsocket from 'ws';
import { request, RequestOptions } from 'http';
// eslint-disable-next-line import/no-cycle
import { ConnectRequest, NetworkPostStatus, NextTimeConnect, PGPKeys, PostMessageRequest, RequestData, WebsocketResponse } from './define';
import { getUUIDv4 } from './utils';
// eslint-disable-next-line import/no-cycle
import EncryptHelper from './EncryptHelper';
import logger from './logger/logger';
const log = logger.getLogger('Network()');

const imapData = [
    {
        provide: 'iCloud',
        accounts: [
            {
                imap_server: 'imap.mail.me.com',
                imap_username: 'qtgate_test2@icloud.com',
                imap_user_password: 'cfes-ofqz-khho-dppa',
                imap_port_number: 993
            }
        ],
        server_folder: 'f1ec9226-f35b-41e6-a6cf-b273c3e52e77'
    },
    {
        provide: 'Yahoo',
        accounts: [
            {
                imap_server: 'imap.mail.yahoo.com',
                imap_username: 'connect1@kloak.io',
                imap_user_password: 'qcjuxlyofnlbluml',
                imap_port_number: 993
            }
        ],
        server_folder: '35a5babb-c879-44c2-b2fd-62e40db5bbf4'
    },
    {
        provide: 'office365',
        accounts: [
            {
                imap_server: 'outlook.office365.com',
                imap_username: 'connect1@kloak.app',
                imap_user_password: 'fdvkgpmhnnqbwjpw',
                imap_port_number: 993
            }
        ],
        server_folder: '3cc2baa6-31cf-49a0-bbae-df666341c2d8'
    },
    {
        provide: 'Zoho',
        accounts: [
            {
                imap_server: 'imap.zoho.com',
                imap_username: 'connect_zoho1@kloak.io',
                imap_user_password: 'mu09QMmf6yTQ',
                imap_port_number: 993
            }
        ],
        server_folder: '3c9d609f-7e1d-4bd7-9951-a344eb9d682e'
    }
];

const seguroServerPublicKey = `
-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEYF/6PRYJKwYBBAHaRw8BAQdATMNoTXLMBPzVgMcgwDIJT42QkNuOOwjRLpHF
K2q58la0G1NFR1VSTyA8aW5mb0BnZXRTRUdVUk8uY29tPoiPBBAWCgAgBQJgX/o9
BgsJBwgDAgQVCAoCBBYCAQACGQECGwMCHgEAIQkQvJNMcTPisIgWIQQUTeA25O28
akPm5lO8k0xxM+KwiBVMAP9cMr1pIHb8OHDNU8mW/lfD+YUVH6Qt3xJXSZvw+JUa
gAEAo+chcb5+h3SYwO7El/etUu3z+VKBaVDc1RvMzeHuug64OARgX/o9EgorBgEE
AZdVAQUBAQdAAAPmwSs9MVXDEx+c8HB0KRp7OxIGq1RswnQv/GSrbTcDAQgHiHgE
GBYIAAkFAmBf+j0CGwwAIQkQvJNMcTPisIgWIQQUTeA25O28akPm5lO8k0xxM+Kw
iEJ8AP9i3ZyodVd7wUnI8e1zuMO4hfImjsXMfp28qXQ6yBHHLQEApdtrLmxHEbwm
iUatG/EQn9VLAanhlsOMmZApsHnIxwc=
=u6x5
-----END PGP PUBLIC KEY BLOCK-----
`;

const seguroKeyID = 'BC934C7133E2B088';

class Network {
    private connectUUID: string = '';
    private host: string = '';
    private port: number | string = ''

    constructor(connectUUID: string, host: string, port: number | string) {
        this.connectUUID = connectUUID;
        this.host = host;
        this.port = port;
    }

    public sendToClient = (message: string, encryptPublicKey: string, signPrivateKey: string, path?: string): Promise<NetworkPostStatus> => (
        new Promise<NetworkPostStatus>(async (resolve, _) => {
            const [encryptStatus, encryptedMessage] = await EncryptHelper.encryptSignWith([encryptPublicKey], [signPrivateKey], message);
            if (encryptStatus === 'SUCCESS') {
                const postMessageRequest: PostMessageRequest = {
                    connectUUID: this.connectUUID,
                    encryptedMessage: encryptedMessage as string
                };
                const [ status ] = await Network.postToLocalServer(postMessageRequest, this.host, this.port, path || '/postMessage');
                return resolve([status]);
            }
        })
    )

    static postToLocalServer = (postData: PostMessageRequest, host: string, port: number | string, path: string): Promise<[status: 'SUCCESS' | 'NETWORK_NOT_AVAILABLE' | 'NOT_CONNECTED' | 'FAILURE']> => (
        new Promise<[status: 'SUCCESS' | 'NETWORK_NOT_AVAILABLE' | 'NOT_CONNECTED' | 'FAILURE']>((resolve, _) => {
            log('Network.postToLocalServer()', 'Attempting to connect to local server', postData);
            const postString = JSON.stringify(postData);
            const options = {
                host,
                port,
                path,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postString)
                }
            };
            const req = request(options, (res) => {
                switch (res.statusCode) {
                    case 200:
                        log('Network.postToLocalServer()', 'Local server returned:', res.statusCode);
                        return resolve(['SUCCESS']);
                    case 404:
                        log('Network.postToLocalServer()', 'Local server returned:', res.statusCode);
                        return resolve(['NOT_CONNECTED']);
                    case 500:
                        log('Network.postToLocalServer()', 'Local server returned:', res.statusCode);
                        return resolve(['NETWORK_NOT_AVAILABLE']);
                    default:
                        return resolve(['FAILURE']);
                }
            });
            req.end(postString);
        })
    )

    static getInformationFromSeguro = (postData: ConnectRequest, host: string, port: string | number): Promise<[status: 'SUCCESS' | 'FAILURE' | 'TIMEOUT', payload?: any]> => (
        new Promise<[status: 'SUCCESS' | 'FAILURE' | 'TIMEOUT', payload?: any]>((resolve, _) => {
            log('Network.getInformationFromSeguro()', 'Getting connection information with:', postData);
            let URLObject;
            const localServerPath = `http://${host}:${port}/getInformationFromSeguro`;
            if ((typeof process !== 'undefined') && (process.release) && (process.release.name === 'node')) {
                URLObject = new NodeURL(localServerPath);
            } else {
                URLObject = new URL(localServerPath);
            }
            const postString = JSON.stringify(postData);
            const options: RequestOptions = {
                host: URLObject?.hostname,
                port: URLObject?.port,
                path: URLObject?.pathname,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postString)
                },
                timeout: 120
            };
            // eslint-disable-next-line no-underscore-dangle
            let returnedData = '';
            const req = request(options, (res) => {
                res.once('error', (err) => resolve(['FAILURE', err]));
                res.on('data', (data) => {
                    returnedData += data.toString();
                    log('Network.getInformationFromSeguro()', 'Local server responded with: ', data);
                });
                res.once('end', () => {
                    let returnJSON = null;
                    try {
                        returnJSON = JSON.parse(returnedData);
                        log('Network.getInformationFromSeguro()', 'Local server ended with: ', returnJSON);
                    } catch (exceptions) {
                        return resolve(['FAILURE', exceptions]);
                    }
                    return resolve(['SUCCESS', returnJSON]);
                });
            });
            req.on('timeout', () => resolve(['TIMEOUT']));
            req.end(postString);
        })
    )

    // eslint-disable-next-line max-len
    static connection = (devicePGPKeys: PGPKeys, seguroPublicKey: string, host: string, port: string | number, nextConnectInformation?: NextTimeConnect): Promise<[status: 'SUCCESS' | 'FAILURE' | 'MAX_ATTEMPT_REACHED', request?: ConnectRequest]> => (
        new Promise<[status: 'SUCCESS' | 'FAILURE' | 'MAX_ATTEMPT_REACHED', request?: ConnectRequest]>(async (resolve, _) => {
            const clientFolderName = getUUIDv4();
            const requestData: RequestData = {
                device_armor: devicePGPKeys.armoredPublicKey,
                kloak_account_armor: seguroPublicKey,
                client_folder_name: clientFolderName
            };

            log('Network.getInformationFromSeguro()', 'Attempting connection with:', requestData);
            const [encryptRequestDataStatus, encryptedRequestData] = await EncryptHelper.encryptSignWith([seguroServerPublicKey], [devicePGPKeys.armoredPrivateKey], JSON.stringify(requestData));

            if (encryptRequestDataStatus === 'SUCCESS') {
                const request: ConnectRequest = {
                    imap_account: nextConnectInformation?.imap_account || imapData[0].accounts[0],
                    server_folder: nextConnectInformation?.server_folder || imapData[0].server_folder,
                    encrypted_request: encryptedRequestData,
                    client_folder_name: clientFolderName
                };
                log('Network.getInformationFromSeguro()', 'Seguro responded with:', request);
                const [postStatus, postResponse] = await Network.getInformationFromSeguro(request, host, port);
                if (postStatus === 'SUCCESS' && postResponse) {
                    const [decryptStatus, decryptedResponse] = await EncryptHelper.decryptWith(devicePGPKeys, postResponse.encrypted_response as string);
                    if (decryptStatus === 'SUCCESS') {
                        const JSONResponse = JSON.parse(decryptedResponse);
                        log('Network.getInformationFromSeguro()', 'Seguro decrypted response:', JSONResponse);
                        return resolve(['SUCCESS', JSONResponse as ConnectRequest]);
                    }
                }
            }
            return resolve(['FAILURE']);
        })
    )

    static wsConnect = (host: string, port: number | string, connectionInfo: ConnectRequest['connect_info'], callback: (err: any, networkInstance: Network | null, message: string | null) => void): WebSocket | NodeWebsocket | null => {
        const websocketURL = `ws://${host}:${port}/connectToSeguro`;
        let networkInstantiated = false;
        if ((typeof process !== 'undefined') && (process.release) && (process.release.name === 'node')) {
            const ws = new NodeWebsocket(websocketURL);
            ws.on('message', (message: string) => {
                try {
                    const websocketResponse: WebsocketResponse = JSON.parse(message);
                    if (/Connected/.test(websocketResponse.status) && !networkInstantiated) {
                        networkInstantiated = true;
                        log('Network.wsConnect()', 'Websocket connected!', websocketResponse);
                        return callback(null, new Network(websocketResponse.connectUUID, host, port), null);
                    }
                    if (websocketResponse.encryptedMessage) {
                        return callback(null, null, websocketResponse.encryptedMessage);
                    }
                } catch (ex) {
                    return console.log('wsConnect ws.on ( \'message\' )  JSON.parse Error', ex);
                }
            });

            ws.once('close', () => callback(new Error('Closed'), null, null));
            ws.once('open', () => ws.send(JSON.stringify(connectionInfo)));
            return ws;
        }
        if (typeof window !== 'undefined') {
            const ws = new WebSocket(websocketURL);
            ws.onclose = () => callback(new Error('Closed'), null, null);
            ws.onerror = (err) => callback(new Error(err.type), null, null);
            ws.onopen = () => ws.send(JSON.stringify(connectionInfo));
            ws.onmessage = (event) => {
                try {
                    const websocketResponse: WebsocketResponse = JSON.parse(event.data);
                    if (/Connected/.test(websocketResponse.status) && !networkInstantiated) {
                        networkInstantiated = true;
                        log('Network.wsConnect()', 'Websocket connected!', websocketResponse);
                        return callback(null, new Network(websocketResponse.connectUUID, host, port), null);
                    }
                    if (websocketResponse.encryptedMessage) {
                        return callback(null, null, websocketResponse.encryptedMessage);
                    }
                } catch (ex) {
                    return console.log('wsConnect ws.on ( \'message\' )  JSON.parse Error', ex);
                }
            };
            return ws;
        }
        return null;
    }
}

export default Network;
