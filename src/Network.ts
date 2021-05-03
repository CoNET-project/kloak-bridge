import { URL as NodeURL } from 'url';
import Websocket from 'ws';
import { request } from 'http';
import { connectRequest, IMAPAccount, PGPKeys } from './define';
import { getUUIDv4 } from './utils';
import EncryptHelper from './EncryptHelper';

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

    static requestPost = (postData: connectRequest, postURLPath: string = 'http://localhost:3000'): Promise<[status: 'SUCCESS' | 'FAILURE', payload?: any]> => (
        new Promise<[status: 'SUCCESS' | 'FAILURE', payload?: any]>((resolve, _) => {
            let URLObject;
            if ((typeof process !== 'undefined') && (process.release) && (process.release.name === 'node')) {
                URLObject = new NodeURL(postURLPath);
            } else {
                URLObject = new URL(postURLPath);
            }

            console.log(URLObject);
            console.log(URLObject?.host);
            console.log(URLObject?.port);
            const postString = JSON.stringify(postData);
            const options = {
                host: URLObject?.hostname,
                port: URLObject?.port,
                path: URLObject?.pathname,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postString)
                }
            };
            // eslint-disable-next-line no-underscore-dangle
            let returnedData = '';
            const req = request(options, (res) => {
                res.once('error', (err) => resolve(['FAILURE', err]));
                res.on('data', (data) => {
                    returnedData += data.toString();
                });
                res.once('end', () => {
                    let returnJSON = null;
                    try {
                        returnJSON = JSON.parse(returnedData);
                    } catch (exceptions) {
                        return resolve(['FAILURE', exceptions]);
                    }
                    return resolve(['SUCCESS', returnJSON]);
                });
            });
            req.end(postString);
        })
    )

    // eslint-disable-next-line max-len
    static connection = (devicePGPKeys: PGPKeys, seguroPublicKey: string, urlPath: string, imapAccount?: IMAPAccount, serverFolder?: string): Promise<[status: 'SUCCESS' | 'FAILURE', request?: connectRequest]> => (
        new Promise<[status: 'SUCCESS' | 'FAILURE', request?: connectRequest]>(async (resolve, _) => {
            const request: connectRequest = {
                kloak_account_armor: seguroPublicKey,
                device_armor: devicePGPKeys.armoredPublicKey,
                imap_account: imapAccount || imapData[0].accounts[0],
                client_folder_name: getUUIDv4(),
                use_kloak_shared_imap_account: true,
                server_folder: serverFolder || imapData[0].server_folder,
                encrypted_request: ''
            };

            const [status, encryptedRequest] = await EncryptHelper.encryptSignWith([seguroServerPublicKey], [devicePGPKeys.armoredPrivateKey], JSON.stringify(request));
            console.log('ENCRYPTED REQUEST', status);
            if (status === 'SUCCESS') {
                request.encrypted_request = encryptedRequest;
                const [status, response] = await Network.requestPost(request, urlPath);
                if (status === 'SUCCESS') {
                    const [status, decryptedResponse] = await EncryptHelper.decryptWith(devicePGPKeys, response.encrypted_response, seguroKeyID);
                    if (status === 'SUCCESS') {
                        return resolve(['SUCCESS', JSON.parse(decryptedResponse.data) as connectRequest]);
                    }
                }
            }
            return resolve(['FAILURE']);
        })
    )

    static wsConnect = (url: string, connectionInfo: connectRequest['connect_info'], callback: (err: any, data: any) => void) => {
        const ws = new Websocket(url);

        ws.on('message', (message: string) => {
            let returnedData = null;
            try {
                returnedData = JSON.parse(message);
            } catch (ex) {
                return console.log('wsConnect ws.on ( \'message\' )  JSON.parse Error', ex);
            }
            return callback(null, returnedData);
        });

        ws.once('close', () => callback(new Error('Closed'), null));
        ws.once('open', () => ws.send(JSON.stringify(connectionInfo)));
        return ws;
    }
}

export default Network;
