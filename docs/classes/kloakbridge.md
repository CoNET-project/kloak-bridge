[Kloak Bridge](../README.md) / [Exports](../modules.md) / KloakBridge

# Class: KloakBridge

## Table of contents

### Constructors

- [constructor](kloakbridge.md#constructor)

### Properties

- [IDBHelper](kloakbridge.md#idbhelper)
- [assemblyHelpers](kloakbridge.md#assemblyhelpers)
- [keyContainer](kloakbridge.md#keycontainer)
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
- [generateDefaultKeychain](kloakbridge.md#generatedefaultkeychain)
- [getAppDataUUID](kloakbridge.md#getappdatauuid)
- [lockKeyContainer](kloakbridge.md#lockkeycontainer)
- [retrieve](kloakbridge.md#retrieve)
- [retrieveDecrypt](kloakbridge.md#retrievedecrypt)
- [save](kloakbridge.md#save)
- [unlockKey](kloakbridge.md#unlockkey)
- [unlockKeyContainer](kloakbridge.md#unlockkeycontainer)

## Constructors

### constructor

\+ **new KloakBridge**(): [*KloakBridge*](kloakbridge.md)

**Returns:** [*KloakBridge*](kloakbridge.md)

## Properties

### IDBHelper

• `Private` **IDBHelper**: [*IDBDatabaseHelper*](idbdatabasehelper.md)

Defined in: [KloakBridge.ts:21](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L21)

___

### assemblyHelpers

• `Private` **assemblyHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:19](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L19)

___

### keyContainer

• **keyContainer**: *undefined* \| [*KeyContainer*](keycontainer.md)

Defined in: [KloakBridge.ts:20](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L20)

___

### uploadHelpers

• `Private` **uploadHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:18](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L18)

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

Defined in: [KloakBridge.ts:180](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L180)

___

### checkKeyContainer

▸ **checkKeyContainer**(): *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Check if IndexedDB contains a "KeyChainContainer".

**Returns:** *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Defined in: [KloakBridge.ts:88](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L88)

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

Defined in: [KloakBridge.ts:226](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L226)

___

### createKeyContainer

▸ **createKeyContainer**(`passphrase`: *string*): *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Create a KeyChainContainer and save into IndexedDB.

#### Parameters:

Name | Type |
:------ | :------ |
`passphrase` | *string* |

**Returns:** *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Defined in: [KloakBridge.ts:133](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L133)

___

### delete

▸ **delete**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:265](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L265)

___

### deleteKeyContainer

▸ **deleteKeyContainer**(): *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Delete KeyChainContainer from IndexedDB.

**Returns:** *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Defined in: [KloakBridge.ts:162](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L162)

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

Defined in: [KloakBridge.ts:267](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L267)

___

### encryptWithDeviceKey

▸ **encryptWithDeviceKey**(`data`: *string*): *Promise*<[status: "SUCCESS" \| "FAILURE", encryptedData?: string]\>

#### Parameters:

Name | Type |
:------ | :------ |
`data` | *string* |

**Returns:** *Promise*<[status: "SUCCESS" \| "FAILURE", encryptedData?: string]\>

Defined in: [KloakBridge.ts:297](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L297)

___

### generateDefaultKeychain

▸ `Private`**generateDefaultKeychain**(): *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

**Returns:** *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

Defined in: [KloakBridge.ts:23](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L23)

___

### getAppDataUUID

▸ **getAppDataUUID**(`appKeyID`: *string*): *Promise*<undefined \| [*GetAppDataUUID*](../modules.md#getappdatauuid)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appKeyID` | *string* |

**Returns:** *Promise*<undefined \| [*GetAppDataUUID*](../modules.md#getappdatauuid)\>

Defined in: [KloakBridge.ts:176](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L176)

___

### lockKeyContainer

▸ **lockKeyContainer**(): *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

**Returns:** *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

Defined in: [KloakBridge.ts:78](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L78)

___

### retrieve

▸ **retrieve**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:261](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L261)

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

Defined in: [KloakBridge.ts:282](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L282)

___

### save

▸ **save**(`uuid`: *string*, `data`: *any*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |
`data` | *any* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:263](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L263)

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

Defined in: [KloakBridge.ts:245](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L245)

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

Defined in: [KloakBridge.ts:102](https://github.com/CoNET-project/kloak-bridge/blob/dd2c22c/src/KloakBridge.ts#L102)
