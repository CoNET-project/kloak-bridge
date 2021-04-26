[Kloak Bridge](../README.md) / [Exports](../modules.md) / KloakBridge

# Class: KloakBridge

## Table of contents

### Constructors

- [constructor](kloakbridge.md#constructor)

### Properties

- [IDBHelper](kloakbridge.md#idbhelper)
- [assemblyHelpers](kloakbridge.md#assemblyhelpers)
- [containerEncrypter](kloakbridge.md#containerencrypter)
- [keyChainContainer](kloakbridge.md#keychaincontainer)
- [keyContainer](kloakbridge.md#keycontainer)
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
- [getKloakKey](kloakbridge.md#getkloakkey)
- [lockKeyContainer](kloakbridge.md#lockkeycontainer)
- [retrieve](kloakbridge.md#retrieve)
- [retrieveDecrypt](kloakbridge.md#retrievedecrypt)
- [save](kloakbridge.md#save)
- [saveNetworkInfo](kloakbridge.md#savenetworkinfo)
- [unlockKey](kloakbridge.md#unlockkey)
- [unlockKeyContainer](kloakbridge.md#unlockkeycontainer)

## Constructors

### constructor

\+ **new KloakBridge**(`skipNetwork?`: *boolean*): [*KloakBridge*](kloakbridge.md)

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`skipNetwork` | *boolean* | false |

**Returns:** [*KloakBridge*](kloakbridge.md)

Defined in: [KloakBridge.ts:34](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L34)

## Properties

### IDBHelper

• `Private` **IDBHelper**: [*IDBDatabaseHelper*](idbdatabasehelper.md)

Defined in: [KloakBridge.ts:23](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L23)

___

### assemblyHelpers

• `Private` **assemblyHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:21](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L21)

___

### containerEncrypter

• `Private` **containerEncrypter**: [*EncryptHelper*](encrypthelper.md)

Defined in: [KloakBridge.ts:24](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L24)

___

### keyChainContainer

• `Private` **keyChainContainer**: [*KeyChainContainer*](../interfaces/keychaincontainer.md)

Defined in: [KloakBridge.ts:26](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L26)

___

### keyContainer

• `Private` **keyContainer**: *undefined* \| [*KeyContainer*](keycontainer.md)

Defined in: [KloakBridge.ts:22](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L22)

___

### skipNetwork

• `Private` **skipNetwork**: *boolean*= false

Defined in: [KloakBridge.ts:25](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L25)

___

### uploadHelpers

• `Private` **uploadHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:20](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L20)

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

Defined in: [KloakBridge.ts:275](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L275)

___

### checkKeyContainer

▸ **checkKeyContainer**(): *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Check if IndexedDB contains a "KeyChainContainer".

**Returns:** *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Defined in: [KloakBridge.ts:175](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L175)

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

Defined in: [KloakBridge.ts:322](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L322)

___

### createKeyContainer

▸ **createKeyContainer**(`passphrase`: *string*): *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Create a KeyChainContainer and save into IndexedDB.

#### Parameters:

Name | Type |
:------ | :------ |
`passphrase` | *string* |

**Returns:** *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Defined in: [KloakBridge.ts:221](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L221)

___

### delete

▸ **delete**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:361](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L361)

___

### deleteKeyContainer

▸ **deleteKeyContainer**(): *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Delete KeyChainContainer from IndexedDB.

**Returns:** *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Defined in: [KloakBridge.ts:257](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L257)

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

Defined in: [KloakBridge.ts:363](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L363)

___

### encryptWithDeviceKey

▸ **encryptWithDeviceKey**(`data`: *string*): *Promise*<[status: "SUCCESS" \| "FAILURE", encryptedData?: string]\>

#### Parameters:

Name | Type |
:------ | :------ |
`data` | *string* |

**Returns:** *Promise*<[status: "SUCCESS" \| "FAILURE", encryptedData?: string]\>

Defined in: [KloakBridge.ts:393](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L393)

___

### establishConnection

▸ `Private`**establishConnection**(`urlPath?`: *string*): *Promise*<void\>

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`urlPath` | *string* | 'http://localhost:3000/getInformationFromSeguro' |

**Returns:** *Promise*<void\>

Defined in: [KloakBridge.ts:127](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L127)

___

### generateDefaultKeychain

▸ `Private`**generateDefaultKeychain**(): *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

**Returns:** *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

Defined in: [KloakBridge.ts:40](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L40)

___

### getAppData

▸ **getAppData**(`appID`: *string*): *Promise*<[*GetAppDataUUID*](../modules.md#getappdatauuid)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appID` | *string* |

**Returns:** *Promise*<[*GetAppDataUUID*](../modules.md#getappdatauuid)\>

Defined in: [KloakBridge.ts:431](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L431)

___

### getAppDataUUID

▸ **getAppDataUUID**(`appKeyID`: *string*): *Promise*<undefined \| [*GetAppDataUUID*](../modules.md#getappdatauuid)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appKeyID` | *string* |

**Returns:** *Promise*<undefined \| [*GetAppDataUUID*](../modules.md#getappdatauuid)\>

Defined in: [KloakBridge.ts:271](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L271)

___

### getDeviceKey

▸ **getDeviceKey**(): *Promise*<[*GetDeviceKey*](../modules.md#getdevicekey)\>

**Returns:** *Promise*<[*GetDeviceKey*](../modules.md#getdevicekey)\>

Defined in: [KloakBridge.ts:413](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L413)

___

### getKloakKey

▸ **getKloakKey**(): *Promise*<[*GetKloakKey*](../modules.md#getkloakkey)\>

**Returns:** *Promise*<[*GetKloakKey*](../modules.md#getkloakkey)\>

Defined in: [KloakBridge.ts:422](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L422)

___

### lockKeyContainer

▸ **lockKeyContainer**(): *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

**Returns:** *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

Defined in: [KloakBridge.ts:95](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L95)

___

### retrieve

▸ **retrieve**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:357](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L357)

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

Defined in: [KloakBridge.ts:378](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L378)

___

### save

▸ **save**(`uuid`: *string*, `data`: *any*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |
`data` | *any* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:359](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L359)

___

### saveNetworkInfo

▸ `Private`**saveNetworkInfo**(`imapAccount`: [*IMAPAccount*](../interfaces/imapaccount.md), `serverFolder`: *string*): *Promise*<boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`imapAccount` | [*IMAPAccount*](../interfaces/imapaccount.md) |
`serverFolder` | *string* |

**Returns:** *Promise*<boolean\>

Defined in: [KloakBridge.ts:102](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L102)

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

Defined in: [KloakBridge.ts:341](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L341)

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

Defined in: [KloakBridge.ts:189](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/KloakBridge.ts#L189)
