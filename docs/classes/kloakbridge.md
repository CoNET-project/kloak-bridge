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

Defined in: [KloakBridge.ts:21](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L21)

___

### assemblyHelpers

• `Private` **assemblyHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:19](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L19)

___

### keyContainer

• **keyContainer**: *undefined* \| [*KeyContainer*](keycontainer.md)

Defined in: [KloakBridge.ts:20](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L20)

___

### uploadHelpers

• `Private` **uploadHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:18](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L18)

## Methods

### addAppID

▸ **addAppID**(`appKeyID`: *string*, `publicKey`: *string*): *Promise*<undefined \| [status: "SUCCESS" \| "ALREADY\_EXISTS"]\>

#### Parameters:

Name | Type |
:------ | :------ |
`appKeyID` | *string* |
`publicKey` | *string* |

**Returns:** *Promise*<undefined \| [status: "SUCCESS" \| "ALREADY\_EXISTS"]\>

Defined in: [KloakBridge.ts:127](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L127)

___

### addAppKey

▸ **addAppKey**(`appKeyID`: *string*, `pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md)): *Promise*<undefined \| [status: "SUCCESS" \| "APP\_DOES\_NOT\_EXIST"]\>

#### Parameters:

Name | Type |
:------ | :------ |
`appKeyID` | *string* |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |

**Returns:** *Promise*<undefined \| [status: "SUCCESS" \| "APP\_DOES\_NOT\_EXIST"]\>

Defined in: [KloakBridge.ts:128](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L128)

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

Defined in: [KloakBridge.ts:133](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L133)

___

### checkKeyContainer

▸ **checkKeyContainer**(): *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Check if IndexedDB contains a "KeyChainContainer".

**Returns:** *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Defined in: [KloakBridge.ts:33](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L33)

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

Defined in: [KloakBridge.ts:175](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L175)

___

### createKeyContainer

▸ **createKeyContainer**(`passphrase`: *string*): *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Create a KeyChainContainer and save into IndexedDB.

#### Parameters:

Name | Type |
:------ | :------ |
`passphrase` | *string* |

**Returns:** *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Defined in: [KloakBridge.ts:79](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L79)

___

### delete

▸ **delete**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:214](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L214)

___

### deleteKeyContainer

▸ **deleteKeyContainer**(): *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Delete KeyChainContainer from IndexedDB.

**Returns:** *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Defined in: [KloakBridge.ts:116](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L116)

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

Defined in: [KloakBridge.ts:216](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L216)

___

### encryptWithDeviceKey

▸ **encryptWithDeviceKey**(`data`: *string*): *Promise*<[status: "SUCCESS" \| "FAILURE", encryptedData?: string]\>

#### Parameters:

Name | Type |
:------ | :------ |
`data` | *string* |

**Returns:** *Promise*<[status: "SUCCESS" \| "FAILURE", encryptedData?: string]\>

Defined in: [KloakBridge.ts:246](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L246)

___

### getKey

▸ **getKey**(`appKeyID`: *string*, `keyId?`: *string*): *Promise*<undefined \| [status: "SUCCESS" \| "DOES\_NOT\_EXIST" \| "FAILURE", pgpKeys?: PGPKeys]\>

#### Parameters:

Name | Type |
:------ | :------ |
`appKeyID` | *string* |
`keyId?` | *string* |

**Returns:** *Promise*<undefined \| [status: "SUCCESS" \| "DOES\_NOT\_EXIST" \| "FAILURE", pgpKeys?: PGPKeys]\>

Defined in: [KloakBridge.ts:129](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L129)

___

### lockKeyContainer

▸ **lockKeyContainer**(): *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

**Returns:** *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

Defined in: [KloakBridge.ts:23](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L23)

___

### retrieve

▸ **retrieve**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:210](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L210)

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

Defined in: [KloakBridge.ts:231](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L231)

___

### save

▸ **save**(`uuid`: *string*, `data`: *any*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |
`data` | *any* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:212](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L212)

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

Defined in: [KloakBridge.ts:194](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L194)

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

Defined in: [KloakBridge.ts:47](https://github.com/CoNET-project/kloak-bridge/blob/1725a9c/src/KloakBridge.ts#L47)
