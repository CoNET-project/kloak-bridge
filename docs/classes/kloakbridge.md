[Kloak Bridge](../README.md) / [Exports](../modules.md) / KloakBridge

# Class: KloakBridge

## Table of contents

### Constructors

- [constructor](kloakbridge.md#constructor)

### Properties

- [IDBHelper](kloakbridge.md#idbhelper)
- [assemblyHelpers](kloakbridge.md#assemblyhelpers)
- [containerEncrypter](kloakbridge.md#containerencrypter)
- [counter](kloakbridge.md#counter)
- [keyChainContainer](kloakbridge.md#keychaincontainer)
- [keyContainer](kloakbridge.md#keycontainer)
- [seguroConnection](kloakbridge.md#seguroconnection)
- [skipNetwork](kloakbridge.md#skipnetwork)
- [uploadHelpers](kloakbridge.md#uploadhelpers)

### Methods

- [changeKeyContainer](kloakbridge.md#changekeycontainer)
- [checkKeyContainer](kloakbridge.md#checkkeycontainer)
- [createKey](kloakbridge.md#createkey)
- [createKeyContainer](kloakbridge.md#createkeycontainer)
- [delete](kloakbridge.md#delete)
- [deleteKeyContainer](kloakbridge.md#deletekeycontainer)
- [encryptSave](kloakbridge.md#encryptsave)
- [encryptWithDeviceKey](kloakbridge.md#encryptwithdevicekey)
- [establishConnection](kloakbridge.md#establishconnection)
- [generateDefaultKeychain](kloakbridge.md#generatedefaultkeychain)
- [getAppData](kloakbridge.md#getappdata)
- [getAppDataUUID](kloakbridge.md#getappdatauuid)
- [getDeviceKey](kloakbridge.md#getdevicekey)
- [getSeguroKey](kloakbridge.md#getsegurokey)
- [getURLData](kloakbridge.md#geturldata)
- [lockKeyContainer](kloakbridge.md#lockkeycontainer)
- [networkStart](kloakbridge.md#networkstart)
- [retrieve](kloakbridge.md#retrieve)
- [retrieveDecrypt](kloakbridge.md#retrievedecrypt)
- [save](kloakbridge.md#save)
- [saveNetworkInfo](kloakbridge.md#savenetworkinfo)
- [unlockKey](kloakbridge.md#unlockkey)
- [unlockKeyContainer](kloakbridge.md#unlockkeycontainer)

## Constructors

### constructor

\+ **new KloakBridge**(`networkListener`: [*NetworkStatusListeners*](../interfaces/networkstatuslisteners.md), `skipNetwork?`: *boolean*, `localServerPath?`: *string*): [*KloakBridge*](kloakbridge.md)

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`networkListener` | [*NetworkStatusListeners*](../interfaces/networkstatuslisteners.md) | - |
`skipNetwork` | *boolean* | false |
`localServerPath?` | *string* | - |

**Returns:** [*KloakBridge*](kloakbridge.md)

Defined in: [KloakBridge.ts:54](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L54)

## Properties

### IDBHelper

• `Private` **IDBHelper**: [*IDBDatabaseHelper*](idbdatabasehelper.md)

Defined in: [KloakBridge.ts:43](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L43)

___

### assemblyHelpers

• `Private` **assemblyHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:41](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L41)

___

### containerEncrypter

• `Private` **containerEncrypter**: [*EncryptHelper*](encrypthelper.md)

Defined in: [KloakBridge.ts:44](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L44)

___

### counter

• `Private` **counter**: *number*= 0

Defined in: [KloakBridge.ts:34](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L34)

___

### keyChainContainer

• `Private` **keyChainContainer**: [*KeyChainContainer*](../interfaces/keychaincontainer.md)

Defined in: [KloakBridge.ts:46](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L46)

___

### keyContainer

• `Private` **keyContainer**: *undefined* \| [*KeyContainer*](keycontainer.md)

Defined in: [KloakBridge.ts:42](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L42)

___

### seguroConnection

• `Private` **seguroConnection**: [*SeguroConnection*](../interfaces/seguroconnection.md)

Defined in: [KloakBridge.ts:35](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L35)

___

### skipNetwork

• `Private` **skipNetwork**: *boolean*= false

Defined in: [KloakBridge.ts:45](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L45)

___

### uploadHelpers

• `Private` **uploadHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:40](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L40)

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

Defined in: [KloakBridge.ts:327](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L327)

___

### checkKeyContainer

▸ **checkKeyContainer**(): *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Check if IndexedDB contains a "KeyChainContainer".

**Returns:** *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Defined in: [KloakBridge.ts:232](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L232)

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

Defined in: [KloakBridge.ts:374](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L374)

___

### createKeyContainer

▸ **createKeyContainer**(`passphrase`: *string*): *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Create a KeyChainContainer and save into IndexedDB.

#### Parameters:

Name | Type |
:------ | :------ |
`passphrase` | *string* |

**Returns:** *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Defined in: [KloakBridge.ts:277](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L277)

___

### delete

▸ **delete**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:413](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L413)

___

### deleteKeyContainer

▸ **deleteKeyContainer**(): *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Delete KeyChainContainer from IndexedDB.

**Returns:** *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Defined in: [KloakBridge.ts:309](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L309)

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

Defined in: [KloakBridge.ts:415](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L415)

___

### encryptWithDeviceKey

▸ **encryptWithDeviceKey**(`data`: *string*): *Promise*<[status: "SUCCESS" \| "FAILURE", encryptedData?: string]\>

#### Parameters:

Name | Type |
:------ | :------ |
`data` | *string* |

**Returns:** *Promise*<[status: "SUCCESS" \| "FAILURE", encryptedData?: string]\>

Defined in: [KloakBridge.ts:445](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L445)

___

### establishConnection

▸ `Private`**establishConnection**(`urlPath?`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`urlPath` | *string* |

**Returns:** *Promise*<void\>

Defined in: [KloakBridge.ts:196](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L196)

___

### generateDefaultKeychain

▸ `Private`**generateDefaultKeychain**(): *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

**Returns:** *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

Defined in: [KloakBridge.ts:77](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L77)

___

### getAppData

▸ **getAppData**(`appID`: *string*): *Promise*<[*GetAppDataUUID*](../modules.md#getappdatauuid)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appID` | *string* |

**Returns:** *Promise*<[*GetAppDataUUID*](../modules.md#getappdatauuid)\>

Defined in: [KloakBridge.ts:483](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L483)

___

### getAppDataUUID

▸ **getAppDataUUID**(`appKeyID`: *string*): *Promise*<undefined \| [*GetAppDataUUID*](../modules.md#getappdatauuid)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appKeyID` | *string* |

**Returns:** *Promise*<undefined \| [*GetAppDataUUID*](../modules.md#getappdatauuid)\>

Defined in: [KloakBridge.ts:323](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L323)

___

### getDeviceKey

▸ **getDeviceKey**(): *Promise*<[*GetDeviceKey*](../modules.md#getdevicekey)\>

**Returns:** *Promise*<[*GetDeviceKey*](../modules.md#getdevicekey)\>

Defined in: [KloakBridge.ts:465](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L465)

___

### getSeguroKey

▸ **getSeguroKey**(): *Promise*<[*GetSeguroKey*](../modules.md#getsegurokey)\>

**Returns:** *Promise*<[*GetSeguroKey*](../modules.md#getsegurokey)\>

Defined in: [KloakBridge.ts:474](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L474)

___

### getURLData

▸ `Private`**getURLData**(`url`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`url` | *string* |

**Returns:** *void*

Defined in: [KloakBridge.ts:65](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L65)

___

### lockKeyContainer

▸ **lockKeyContainer**(): *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

**Returns:** *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

Defined in: [KloakBridge.ts:132](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L132)

___

### networkStart

▸ `Private`**networkStart**(`deviceKey`: [*PGPKeys*](../interfaces/pgpkeys.md), `seguroKey`: *string*, `urlPath?`: *string*, `imapAccount?`: [*IMAPAccount*](../interfaces/imapaccount.md), `serverFolder?`: *string*): *void*

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`deviceKey` | [*PGPKeys*](../interfaces/pgpkeys.md) | - |
`seguroKey` | *string* | - |
`urlPath` | *string* | 'http://localhost:3000/getInformationFromSeguro' |
`imapAccount?` | [*IMAPAccount*](../interfaces/imapaccount.md) | - |
`serverFolder?` | *string* | - |

**Returns:** *void*

Defined in: [KloakBridge.ts:164](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L164)

___

### retrieve

▸ **retrieve**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:409](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L409)

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

Defined in: [KloakBridge.ts:430](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L430)

___

### save

▸ **save**(`uuid`: *string*, `data`: *any*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |
`data` | *any* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:411](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L411)

___

### saveNetworkInfo

▸ `Private`**saveNetworkInfo**(`imapAccount`: [*IMAPAccount*](../interfaces/imapaccount.md), `serverFolder`: *string*): *Promise*<boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`imapAccount` | [*IMAPAccount*](../interfaces/imapaccount.md) |
`serverFolder` | *string* |

**Returns:** *Promise*<boolean\>

Defined in: [KloakBridge.ts:139](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L139)

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

Defined in: [KloakBridge.ts:393](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L393)

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

Defined in: [KloakBridge.ts:246](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/KloakBridge.ts#L246)
