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

- [addKey](kloakbridge.md#addkey)
- [changeKeyContainer](kloakbridge.md#changekeycontainer)
- [checkKeyContainer](kloakbridge.md#checkkeycontainer)
- [createKey](kloakbridge.md#createkey)
- [createKeyContainer](kloakbridge.md#createkeycontainer)
- [delete](kloakbridge.md#delete)
- [deleteKeyContainer](kloakbridge.md#deletekeycontainer)
- [encryptSave](kloakbridge.md#encryptsave)
- [getKey](kloakbridge.md#getkey)
- [getKeyChain](kloakbridge.md#getkeychain)
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

Defined in: [KloakBridge.ts:21](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L21)

___

### assemblyHelpers

• `Private` **assemblyHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:19](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L19)

___

### keyContainer

• `Private` **keyContainer**: *undefined* \| [*KeyContainer*](keycontainer.md)

Defined in: [KloakBridge.ts:20](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L20)

___

### uploadHelpers

• `Private` **uploadHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:18](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L18)

## Methods

### addKey

▸ **addKey**(`appID`: *string*, `pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md)): *Promise*<undefined \| boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`appID` | *string* |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |

**Returns:** *Promise*<undefined \| boolean\>

Defined in: [KloakBridge.ts:132](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L132)

___

### changeKeyContainer

▸ **changeKeyContainer**(`newPassphrase`: *string*, `keyChain`: [*KeyChain*](../interfaces/keychain.md)): *Promise*<[*ChangeKeyContainerResolve*](../modules.md#changekeycontainerresolve)\>

Change password from KeyChainContainer.

#### Parameters:

Name | Type |
:------ | :------ |
`newPassphrase` | *string* |
`keyChain` | [*KeyChain*](../interfaces/keychain.md) |

**Returns:** *Promise*<[*ChangeKeyContainerResolve*](../modules.md#changekeycontainerresolve)\>

Defined in: [KloakBridge.ts:139](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L139)

___

### checkKeyContainer

▸ **checkKeyContainer**(): *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Check if IndexedDB contains a "KeyChainContainer".

**Returns:** *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Defined in: [KloakBridge.ts:33](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L33)

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

Defined in: [KloakBridge.ts:161](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L161)

___

### createKeyContainer

▸ **createKeyContainer**(`passphrase`: *string*): *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Create a KeyChainContainer and save into IndexedDB.

#### Parameters:

Name | Type |
:------ | :------ |
`passphrase` | *string* |

**Returns:** *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Defined in: [KloakBridge.ts:75](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L75)

___

### delete

▸ **delete**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:200](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L200)

___

### deleteKeyContainer

▸ **deleteKeyContainer**(): *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Delete KeyChainContainer from IndexedDB.

**Returns:** *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Defined in: [KloakBridge.ts:119](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L119)

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

Defined in: [KloakBridge.ts:202](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L202)

___

### getKey

▸ **getKey**(`appID`: *string*): *undefined* \| *Promise*<{} \| [*PGPKeys*](../interfaces/pgpkeys.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appID` | *string* |

**Returns:** *undefined* \| *Promise*<{} \| [*PGPKeys*](../interfaces/pgpkeys.md)\>

Defined in: [KloakBridge.ts:134](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L134)

___

### getKeyChain

▸ **getKeyChain**(): *undefined* \| *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

**Returns:** *undefined* \| *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

Defined in: [KloakBridge.ts:130](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L130)

___

### lockKeyContainer

▸ **lockKeyContainer**(): *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

**Returns:** *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

Defined in: [KloakBridge.ts:23](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L23)

___

### retrieve

▸ **retrieve**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:196](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L196)

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

Defined in: [KloakBridge.ts:217](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L217)

___

### save

▸ **save**(`uuid`: *string*, `data`: *any*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |
`data` | *any* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:198](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L198)

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

Defined in: [KloakBridge.ts:180](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L180)

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

Defined in: [KloakBridge.ts:47](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KloakBridge.ts#L47)
