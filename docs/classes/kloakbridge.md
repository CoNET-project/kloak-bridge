[Kloak Bridge](../README.md) / [Exports](../modules.md) / KloakBridge

# Class: KloakBridge

## Table of contents

### Constructors

- [constructor](kloakbridge.md#constructor)

### Properties

- [IDBHelper](kloakbridge.md#idbhelper)
- [MAX\_RETRY\_ATTEMPTS](kloakbridge.md#max_retry_attempts)
- [assemblyHelpers](kloakbridge.md#assemblyhelpers)
- [availableIMAPConnections](kloakbridge.md#availableimapconnections)
- [containerEncrypter](kloakbridge.md#containerencrypter)
- [keyChainContainer](kloakbridge.md#keychaincontainer)
- [keyContainer](kloakbridge.md#keycontainer)
- [reconnected](kloakbridge.md#reconnected)
- [retryAttempts](kloakbridge.md#retryattempts)
- [uploadHelpers](kloakbridge.md#uploadhelpers)
- [seguroConnection](kloakbridge.md#seguroconnection)

### Methods

- [changeKeyContainer](kloakbridge.md#changekeycontainer)
- [checkKeyContainer](kloakbridge.md#checkkeycontainer)
- [checkNetworkCompatibility](kloakbridge.md#checknetworkcompatibility)
- [createKey](kloakbridge.md#createkey)
- [createKeyContainer](kloakbridge.md#createkeycontainer)
- [delete](kloakbridge.md#delete)
- [deleteKeyContainer](kloakbridge.md#deletekeycontainer)
- [disconnect](kloakbridge.md#disconnect)
- [encryptSave](kloakbridge.md#encryptsave)
- [encryptWithDeviceKey](kloakbridge.md#encryptwithdevicekey)
- [establishConnection](kloakbridge.md#establishconnection)
- [generateDefaultKeychain](kloakbridge.md#generatedefaultkeychain)
- [getAppData](kloakbridge.md#getappdata)
- [getAppDataUUID](kloakbridge.md#getappdatauuid)
- [getDeviceKey](kloakbridge.md#getdevicekey)
- [getMessagesCache](kloakbridge.md#getmessagescache)
- [getNetworkInformation](kloakbridge.md#getnetworkinformation)
- [getSeguroKey](kloakbridge.md#getsegurokey)
- [init](kloakbridge.md#init)
- [lockKeyContainer](kloakbridge.md#lockkeycontainer)
- [networkWebSocket](kloakbridge.md#networkwebsocket)
- [reconnect](kloakbridge.md#reconnect)
- [retrieve](kloakbridge.md#retrieve)
- [retrieveDecrypt](kloakbridge.md#retrievedecrypt)
- [save](kloakbridge.md#save)
- [saveNetworkInfo](kloakbridge.md#savenetworkinfo)
- [saveToMessagesCache](kloakbridge.md#savetomessagescache)
- [testNetworkConnection](kloakbridge.md#testnetworkconnection)
- [unlockKey](kloakbridge.md#unlockkey)
- [unlockKeyContainer](kloakbridge.md#unlockkeycontainer)
- [sendToClient](kloakbridge.md#sendtoclient)

## Constructors

### constructor

\+ **new KloakBridge**(`onInitialized`: () => *void*, `networkListener`: [*NetworkStatusListeners*](../interfaces/networkstatuslisteners.md), `skipNetwork?`: *boolean*, `localServerPath?`: *string*): [*KloakBridge*](kloakbridge.md)

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`onInitialized` | () => *void* | - |
`networkListener` | [*NetworkStatusListeners*](../interfaces/networkstatuslisteners.md) | - |
`skipNetwork` | *boolean* | false |
`localServerPath?` | *string* | - |

**Returns:** [*KloakBridge*](kloakbridge.md)

Defined in: [KloakBridge.ts:59](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L59)

## Properties

### IDBHelper

• `Private` **IDBHelper**: [*IDBDatabaseHelper*](idbdatabasehelper.md)

Defined in: [KloakBridge.ts:45](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L45)

___

### MAX\_RETRY\_ATTEMPTS

• `Private` **MAX\_RETRY\_ATTEMPTS**: *number*= 3

Defined in: [KloakBridge.ts:59](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L59)

___

### assemblyHelpers

• `Private` **assemblyHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:43](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L43)

___

### availableIMAPConnections

• `Private` **availableIMAPConnections**: [*TestNetworkResponses*](../modules.md#testnetworkresponses)= []

Defined in: [KloakBridge.ts:57](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L57)

___

### containerEncrypter

• `Private` **containerEncrypter**: [*EncryptHelper*](encrypthelper.md)

Defined in: [KloakBridge.ts:46](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L46)

___

### keyChainContainer

• `Private` **keyChainContainer**: [*KeyChainContainer*](../interfaces/keychaincontainer.md)

Defined in: [KloakBridge.ts:47](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L47)

___

### keyContainer

• `Private` **keyContainer**: *undefined* \| [*KeyContainer*](keycontainer.md)

Defined in: [KloakBridge.ts:44](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L44)

___

### reconnected

• `Private` **reconnected**: *boolean*= false

Defined in: [KloakBridge.ts:34](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L34)

___

### retryAttempts

• `Private` **retryAttempts**: *number*= 0

Defined in: [KloakBridge.ts:58](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L58)

___

### uploadHelpers

• `Private` **uploadHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:42](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L42)

___

### seguroConnection

▪ `Static` **seguroConnection**: [*SeguroConnection*](../interfaces/seguroconnection.md)

Defined in: [KloakBridge.ts:35](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L35)

## Methods

### changeKeyContainer

▸ **changeKeyContainer**(`oldPassphrase`: *string*, `newPassphrase`: *string*): *Promise*<[*ChangeKeyContainerResolve*](../modules.md#changekeycontainerresolve)\>

Change password from KeyChainContainer.

#### Parameters:

Name | Type |
:------ | :------ |
`oldPassphrase` | *string* |
`newPassphrase` | *string* |

**Returns:** *Promise*<[*ChangeKeyContainerResolve*](../modules.md#changekeycontainerresolve)\>

Defined in: [KloakBridge.ts:473](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L473)

___

### checkKeyContainer

▸ **checkKeyContainer**(): *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Check if IndexedDB contains a "KeyChainContainer".

**Returns:** *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Defined in: [KloakBridge.ts:370](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L370)

___

### checkNetworkCompatibility

▸ `Private`**checkNetworkCompatibility**(`imapServer`: *string*): *Promise*<[status: "OK" \| "UNAVAILABLE"]\>

#### Parameters:

Name | Type |
:------ | :------ |
`imapServer` | *string* |

**Returns:** *Promise*<[status: "OK" \| "UNAVAILABLE"]\>

Defined in: [KloakBridge.ts:92](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L92)

___

### createKey

▸ **createKey**(`options`: [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md), `unlock?`: *boolean*): *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

Create an OpenPGP key pair.

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md) |
`unlock?` | *boolean* |

**Returns:** *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

Defined in: [KloakBridge.ts:508](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L508)

___

### createKeyContainer

▸ **createKeyContainer**(`passphrase`: *string*): *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Create a KeyChainContainer and save into IndexedDB.

#### Parameters:

Name | Type |
:------ | :------ |
`passphrase` | *string* |

**Returns:** *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Defined in: [KloakBridge.ts:420](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L420)

___

### delete

▸ **delete**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:547](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L547)

___

### deleteKeyContainer

▸ **deleteKeyContainer**(): *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Delete KeyChainContainer from IndexedDB.

**Returns:** *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Defined in: [KloakBridge.ts:455](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L455)

___

### disconnect

▸ **disconnect**(): *void*

**Returns:** *void*

Defined in: [KloakBridge.ts:272](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L272)

___

### encryptSave

▸ **encryptSave**(`encryptHelper`: [*EncryptHelper*](encrypthelper.md), `data`: *string* \| ArrayBuffer \| *Uint8Array*, `uuid?`: *string*): *Promise*<[*EncryptSaveResolve*](../modules.md#encryptsaveresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`encryptHelper` | [*EncryptHelper*](encrypthelper.md) |
`data` | *string* \| ArrayBuffer \| *Uint8Array* |
`uuid?` | *string* |

**Returns:** *Promise*<[*EncryptSaveResolve*](../modules.md#encryptsaveresolve)\>

Defined in: [KloakBridge.ts:549](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L549)

___

### encryptWithDeviceKey

▸ **encryptWithDeviceKey**(`data`: *string*): *Promise*<[status: "SUCCESS" \| "FAILURE", encryptedData?: string]\>

#### Parameters:

Name | Type |
:------ | :------ |
`data` | *string* |

**Returns:** *Promise*<[status: "SUCCESS" \| "FAILURE", encryptedData?: string]\>

Defined in: [KloakBridge.ts:579](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L579)

___

### establishConnection

▸ `Private`**establishConnection**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [KloakBridge.ts:283](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L283)

___

### generateDefaultKeychain

▸ `Private`**generateDefaultKeychain**(): *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

**Returns:** *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

Defined in: [KloakBridge.ts:119](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L119)

___

### getAppData

▸ **getAppData**(`appID`: *string*): *Promise*<[*GetAppDataUUID*](../modules.md#getappdatauuid)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appID` | *string* |

**Returns:** *Promise*<[*GetAppDataUUID*](../modules.md#getappdatauuid)\>

Defined in: [KloakBridge.ts:617](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L617)

___

### getAppDataUUID

▸ **getAppDataUUID**(`appKeyID`: *string*): *Promise*<undefined \| [*GetAppDataUUID*](../modules.md#getappdatauuid)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appKeyID` | *string* |

**Returns:** *Promise*<undefined \| [*GetAppDataUUID*](../modules.md#getappdatauuid)\>

Defined in: [KloakBridge.ts:469](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L469)

___

### getDeviceKey

▸ **getDeviceKey**(): *Promise*<[*GetDeviceKey*](../modules.md#getdevicekey)\>

**Returns:** *Promise*<[*GetDeviceKey*](../modules.md#getdevicekey)\>

Defined in: [KloakBridge.ts:599](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L599)

___

### getMessagesCache

▸ **getMessagesCache**(`appId`: *string*): *Promise*<string[]\>

#### Parameters:

Name | Type |
:------ | :------ |
`appId` | *string* |

**Returns:** *Promise*<string[]\>

Defined in: [KloakBridge.ts:259](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L259)

___

### getNetworkInformation

▸ `Private`**getNetworkInformation**(`url`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`url` | *string* |

**Returns:** *void*

Defined in: [KloakBridge.ts:107](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L107)

___

### getSeguroKey

▸ **getSeguroKey**(): *Promise*<[*GetSeguroKey*](../modules.md#getsegurokey)\>

**Returns:** *Promise*<[*GetSeguroKey*](../modules.md#getsegurokey)\>

Defined in: [KloakBridge.ts:608](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L608)

___

### init

▸ `Private`**init**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [KloakBridge.ts:65](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L65)

___

### lockKeyContainer

▸ **lockKeyContainer**(): *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

**Returns:** *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

Defined in: [KloakBridge.ts:174](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L174)

___

### networkWebSocket

▸ `Private`**networkWebSocket**(`connectInformation`: [*connectImapResponse*](../interfaces/connectimapresponse.md), `reconnected?`: () => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`connectInformation` | [*connectImapResponse*](../interfaces/connectimapresponse.md) |
`reconnected?` | () => *void* |

**Returns:** *void*

Defined in: [KloakBridge.ts:225](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L225)

___

### reconnect

▸ **reconnect**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [KloakBridge.ts:270](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L270)

___

### retrieve

▸ **retrieve**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:543](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L543)

___

### retrieveDecrypt

▸ **retrieveDecrypt**(`encryptHelper`: [*EncryptHelper*](encrypthelper.md), `uuid`: *string*, `buffer?`: *boolean*): *Promise*<[*RetrieveDecryptResolve*](../modules.md#retrievedecryptresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`encryptHelper` | [*EncryptHelper*](encrypthelper.md) |
`uuid` | *string* |
`buffer?` | *boolean* |

**Returns:** *Promise*<[*RetrieveDecryptResolve*](../modules.md#retrievedecryptresolve)\>

Defined in: [KloakBridge.ts:564](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L564)

___

### save

▸ **save**(`uuid`: *string*, `data`: *any*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |
`data` | *any* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:545](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L545)

___

### saveNetworkInfo

▸ `Private`**saveNetworkInfo**(`connectInformation`: *null* \| [*connectImapResponse*](../interfaces/connectimapresponse.md), `nextConnectInformation`: *null* \| [*NextTimeConnect*](../interfaces/nexttimeconnect.md)): *Promise*<boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`connectInformation` | *null* \| [*connectImapResponse*](../interfaces/connectimapresponse.md) |
`nextConnectInformation` | *null* \| [*NextTimeConnect*](../interfaces/nexttimeconnect.md) |

**Returns:** *Promise*<boolean\>

Defined in: [KloakBridge.ts:201](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L201)

___

### saveToMessagesCache

▸ `Private`**saveToMessagesCache**(`appId`: *string*, `message`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`appId` | *string* |
`message` | *string* |

**Returns:** *Promise*<void\>

Defined in: [KloakBridge.ts:181](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L181)

___

### testNetworkConnection

▸ **testNetworkConnection**(`host`: *string*, `port`: *string* \| *number*): *Promise*<[status: "IMAP\_AVAILABLE" \| "IMAP\_UNAVAILABLE"]\>

#### Parameters:

Name | Type |
:------ | :------ |
`host` | *string* |
`port` | *string* \| *number* |

**Returns:** *Promise*<[status: "IMAP\_AVAILABLE" \| "IMAP\_UNAVAILABLE"]\>

Defined in: [KloakBridge.ts:76](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L76)

___

### unlockKey

▸ **unlockKey**(`pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md), `passphrase`: *string*): *Promise*<[*UnlockKeyResolve*](../modules.md#unlockkeyresolve)\>

Unlock an OpenPGP key pair.

#### Parameters:

Name | Type |
:------ | :------ |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |
`passphrase` | *string* |

**Returns:** *Promise*<[*UnlockKeyResolve*](../modules.md#unlockkeyresolve)\>

Defined in: [KloakBridge.ts:527](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L527)

___

### unlockKeyContainer

▸ **unlockKeyContainer**(`passphrase`: *string*): *Promise*<[*UnlockContainerResolve*](../modules.md#unlockcontainerresolve)\>

Unlock a "KeyChainContainer".
If no KeyChainContainer exists in IndexedDB, return error.

#### Parameters:

Name | Type |
:------ | :------ |
`passphrase` | *string* |

**Returns:** *Promise*<[*UnlockContainerResolve*](../modules.md#unlockcontainerresolve)\>

Defined in: [KloakBridge.ts:384](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L384)

___

### sendToClient

▸ `Static`**sendToClient**(`message`: *string*, `appId`: *string*, `recipientDeviceKey`: *string*): *Promise*<[*NetworkPostStatus*](../modules.md#networkpoststatus)\>

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |
`appId` | *string* |
`recipientDeviceKey` | *string* |

**Returns:** *Promise*<[*NetworkPostStatus*](../modules.md#networkpoststatus)\>

Defined in: [KloakBridge.ts:632](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/KloakBridge.ts#L632)
