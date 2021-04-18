[Kloak Bridge](../README.md) / [Exports](../modules.md) / KeyContainer

# Class: KeyContainer

## Table of contents

### Constructors

- [constructor](keycontainer.md#constructor)

### Properties

- [IDBHelper](keycontainer.md#idbhelper)
- [applications](keycontainer.md#applications)
- [device](keycontainer.md#device)
- [keyContainerEncrypt](keycontainer.md#keycontainerencrypt)
- [kloak](keycontainer.md#kloak)

### Methods

- [addKey](keycontainer.md#addkey)
- [getKey](keycontainer.md#getkey)
- [getKeyChain](keycontainer.md#getkeychain)
- [saveKeyContainer](keycontainer.md#savekeycontainer)

## Constructors

### constructor

\+ **new KeyContainer**(`encryptHelper`: [*EncryptHelper*](encrypthelper.md), `keyContainer`: [*KeyChain*](../interfaces/keychain.md)): [*KeyContainer*](keycontainer.md)

#### Parameters:

Name | Type |
:------ | :------ |
`encryptHelper` | [*EncryptHelper*](encrypthelper.md) |
`keyContainer` | [*KeyChain*](../interfaces/keychain.md) |

**Returns:** [*KeyContainer*](keycontainer.md)

Defined in: [KeyContainer.ts:10](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KeyContainer.ts#L10)

## Properties

### IDBHelper

• `Private` **IDBHelper**: [*IDBDatabaseHelper*](idbdatabasehelper.md)

Defined in: [KeyContainer.ts:6](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KeyContainer.ts#L6)

___

### applications

• `Private` **applications**: [*ApplicationKeys*](../interfaces/applicationkeys.md)

Defined in: [KeyContainer.ts:10](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KeyContainer.ts#L10)

___

### device

• `Private` **device**: {} \| [*PGPKeys*](../interfaces/pgpkeys.md)

Defined in: [KeyContainer.ts:8](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KeyContainer.ts#L8)

___

### keyContainerEncrypt

• `Private` **keyContainerEncrypt**: [*EncryptHelper*](encrypthelper.md)

Defined in: [KeyContainer.ts:7](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KeyContainer.ts#L7)

___

### kloak

• `Private` **kloak**: {} \| [*PGPKeys*](../interfaces/pgpkeys.md)

Defined in: [KeyContainer.ts:9](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KeyContainer.ts#L9)

## Methods

### addKey

▸ **addKey**(`appID`: *string*, `pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md)): *Promise*<boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`appID` | *string* |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |

**Returns:** *Promise*<boolean\>

Defined in: [KeyContainer.ts:58](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KeyContainer.ts#L58)

___

### getKey

▸ **getKey**(`appID`: *string*): *Promise*<{} \| [*PGPKeys*](../interfaces/pgpkeys.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appID` | *string* |

**Returns:** *Promise*<{} \| [*PGPKeys*](../interfaces/pgpkeys.md)\>

Defined in: [KeyContainer.ts:42](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KeyContainer.ts#L42)

___

### getKeyChain

▸ **getKeyChain**(): *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

**Returns:** *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

Defined in: [KeyContainer.ts:31](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KeyContainer.ts#L31)

___

### saveKeyContainer

▸ `Private`**saveKeyContainer**(): *Promise*<boolean\>

**Returns:** *Promise*<boolean\>

Defined in: [KeyContainer.ts:19](https://github.com/CoNET-project/kloak-bridge/blob/8c682be/src/KeyContainer.ts#L19)
