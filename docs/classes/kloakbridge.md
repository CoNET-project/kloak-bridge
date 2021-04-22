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

- [addAppID](kloakbridge.md#addappid)
- [addAppKey](kloakbridge.md#addappkey)
- [changeKeyContainer](kloakbridge.md#changekeycontainer)
- [checkKeyContainer](kloakbridge.md#checkkeycontainer)
- [createKey](kloakbridge.md#createkey)
- [createKeyContainer](kloakbridge.md#createkeycontainer)
- [delete](kloakbridge.md#delete)
- [deleteKeyContainer](kloakbridge.md#deletekeycontainer)
- [encryptSave](kloakbridge.md#encryptsave)
- [encryptWithDeviceKey](kloakbridge.md#encryptwithdevicekey)
- [generateDefaultKeychain](kloakbridge.md#generatedefaultkeychain)
- [getKey](kloakbridge.md#getkey)
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

Defined in: [KloakBridge.ts:21](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L21)

___

### assemblyHelpers

• `Private` **assemblyHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:19](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L19)

___

### keyContainer

• **keyContainer**: *undefined* \| [*KeyContainer*](keycontainer.md)

Defined in: [KloakBridge.ts:20](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L20)

___

### uploadHelpers

• `Private` **uploadHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:18](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L18)

## Methods

### addAppID

▸ **addAppID**(`appKeyID`: *string*, `publicKey`: *string*): *Promise*<undefined \| [status: "SUCCESS" \| "ALREADY\_EXISTS"]\>

#### Parameters:

Name | Type |
:------ | :------ |
`appKeyID` | *string* |
`publicKey` | *string* |

**Returns:** *Promise*<undefined \| [status: "SUCCESS" \| "ALREADY\_EXISTS"]\>

Defined in: [KloakBridge.ts:167](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L167)

___

### addAppKey

▸ **addAppKey**(`appKeyID`: *string*, `pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md)): *Promise*<undefined \| [status: "SUCCESS" \| "APP\_DOES\_NOT\_EXIST"]\>

#### Parameters:

Name | Type |
:------ | :------ |
`appKeyID` | *string* |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |

**Returns:** *Promise*<undefined \| [status: "SUCCESS" \| "APP\_DOES\_NOT\_EXIST"]\>

Defined in: [KloakBridge.ts:168](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L168)

___

### changeKeyContainer

▸ **changeKeyContainer**(`oldPassphrase`: *string*, `newPassphrase`: *string*): *Promise*<[*ChangeKeyContainerResolve*](../modules.md#changekeycontainerresolve)\>

Change password from KeyChainContainer.

#### Parameters:

Name | Type |
:------ | :------ |
`oldPassphrase` | *string* |
`newPassphrase` | *string* |

**Returns:** *Promise*<[*ChangeKeyContainerResolve*](../modules.md#changekeycontainerresolve)\>

Defined in: [KloakBridge.ts:173](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L173)

___

### checkKeyContainer

▸ **checkKeyContainer**(): *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Check if IndexedDB contains a "KeyChainContainer".

**Returns:** *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Defined in: [KloakBridge.ts:82](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L82)

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

Defined in: [KloakBridge.ts:219](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L219)

___

### createKeyContainer

▸ **createKeyContainer**(`passphrase`: *string*): *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Create a KeyChainContainer and save into IndexedDB.

#### Parameters:

Name | Type |
:------ | :------ |
`passphrase` | *string* |

**Returns:** *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Defined in: [KloakBridge.ts:127](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L127)

___

### delete

▸ **delete**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:258](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L258)

___

### deleteKeyContainer

▸ **deleteKeyContainer**(): *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Delete KeyChainContainer from IndexedDB.

**Returns:** *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Defined in: [KloakBridge.ts:156](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L156)

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

Defined in: [KloakBridge.ts:260](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L260)

___

### encryptWithDeviceKey

▸ **encryptWithDeviceKey**(`data`: *string*): *Promise*<[status: "SUCCESS" \| "FAILURE", encryptedData?: string]\>

#### Parameters:

Name | Type |
:------ | :------ |
`data` | *string* |

**Returns:** *Promise*<[status: "SUCCESS" \| "FAILURE", encryptedData?: string]\>

Defined in: [KloakBridge.ts:290](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L290)

___

### generateDefaultKeychain

▸ `Private`**generateDefaultKeychain**(): *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

**Returns:** *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

Defined in: [KloakBridge.ts:23](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L23)

___

### getKey

▸ **getKey**(`appKeyID`: *string*, `keyId?`: *string*): *Promise*<undefined \| [status: "SUCCESS" \| "DOES\_NOT\_EXIST" \| "FAILURE", pgpKeys?: PGPKeys]\>

#### Parameters:

Name | Type |
:------ | :------ |
`appKeyID` | *string* |
`keyId?` | *string* |

**Returns:** *Promise*<undefined \| [status: "SUCCESS" \| "DOES\_NOT\_EXIST" \| "FAILURE", pgpKeys?: PGPKeys]\>

Defined in: [KloakBridge.ts:169](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L169)

___

### lockKeyContainer

▸ **lockKeyContainer**(): *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

**Returns:** *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

Defined in: [KloakBridge.ts:72](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L72)

___

### retrieve

▸ **retrieve**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:254](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L254)

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

Defined in: [KloakBridge.ts:275](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L275)

___

### save

▸ **save**(`uuid`: *string*, `data`: *any*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |
`data` | *any* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:256](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L256)

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

Defined in: [KloakBridge.ts:238](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L238)

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

Defined in: [KloakBridge.ts:96](https://github.com/CoNET-project/kloak-bridge/blob/85792bb/src/KloakBridge.ts#L96)
