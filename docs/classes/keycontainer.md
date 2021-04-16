[Kloak Bridge](../README.md) / [Exports](../modules.md) / KeyContainer

# Class: KeyContainer

## Table of contents

### Constructors

- [constructor](keycontainer.md#constructor)

### Properties

- [IDBHelper](keycontainer.md#idbhelper)
- [applicationKeys](keycontainer.md#applicationkeys)
- [deviceKey](keycontainer.md#devicekey)
- [keyContainerEncrypt](keycontainer.md#keycontainerencrypt)
- [kloakAccountKey](keycontainer.md#kloakaccountkey)
- [messengerKeys](keycontainer.md#messengerkeys)
- [storageKey](keycontainer.md#storagekey)

### Methods

- [addApplicationKey](keycontainer.md#addapplicationkey)
- [getKey](keycontainer.md#getkey)
- [getKeyChain](keycontainer.md#getkeychain)
- [saveKeyContainer](keycontainer.md#savekeycontainer)
- [setKey](keycontainer.md#setkey)

## Constructors

### constructor

\+ **new KeyContainer**(`encryptHelper`: [*EncryptHelper*](encrypthelper.md), `keyContainer`: [*KeyChain*](../interfaces/keychain.md)): [*KeyContainer*](keycontainer.md)

#### Parameters:

Name | Type |
:------ | :------ |
`encryptHelper` | [*EncryptHelper*](encrypthelper.md) |
`keyContainer` | [*KeyChain*](../interfaces/keychain.md) |

**Returns:** [*KeyContainer*](keycontainer.md)

Defined in: [KeyContainer.ts:12](https://github.com/CoNET-project/kloak-bridge/blob/db507e7/src/KeyContainer.ts#L12)

## Properties

### IDBHelper

• `Private` **IDBHelper**: [*IDBDatabaseHelper*](idbdatabasehelper.md)

Defined in: [KeyContainer.ts:6](https://github.com/CoNET-project/kloak-bridge/blob/db507e7/src/KeyContainer.ts#L6)

___

### applicationKeys

• `Private` **applicationKeys**: [*ApplicationKeys*](../interfaces/applicationkeys.md)

Defined in: [KeyContainer.ts:12](https://github.com/CoNET-project/kloak-bridge/blob/db507e7/src/KeyContainer.ts#L12)

___

### deviceKey

• `Private` **deviceKey**: {} \| [*PGPKeys*](../interfaces/pgpkeys.md)

Defined in: [KeyContainer.ts:8](https://github.com/CoNET-project/kloak-bridge/blob/db507e7/src/KeyContainer.ts#L8)

___

### keyContainerEncrypt

• `Private` **keyContainerEncrypt**: [*EncryptHelper*](encrypthelper.md)

Defined in: [KeyContainer.ts:7](https://github.com/CoNET-project/kloak-bridge/blob/db507e7/src/KeyContainer.ts#L7)

___

### kloakAccountKey

• `Private` **kloakAccountKey**: {} \| [*PGPKeys*](../interfaces/pgpkeys.md)

Defined in: [KeyContainer.ts:9](https://github.com/CoNET-project/kloak-bridge/blob/db507e7/src/KeyContainer.ts#L9)

___

### messengerKeys

• `Private` **messengerKeys**: [*MessengerKeys*](../interfaces/messengerkeys.md)

Defined in: [KeyContainer.ts:11](https://github.com/CoNET-project/kloak-bridge/blob/db507e7/src/KeyContainer.ts#L11)

___

### storageKey

• `Private` **storageKey**: {} \| [*PGPKeys*](../interfaces/pgpkeys.md)

Defined in: [KeyContainer.ts:10](https://github.com/CoNET-project/kloak-bridge/blob/db507e7/src/KeyContainer.ts#L10)

## Methods

### addApplicationKey

▸ **addApplicationKey**(`appID`: *string*, `pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md)): *Promise*<boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`appID` | *string* |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |

**Returns:** *Promise*<boolean\>

Defined in: [KeyContainer.ts:92](https://github.com/CoNET-project/kloak-bridge/blob/db507e7/src/KeyContainer.ts#L92)

___

### getKey

▸ **getKey**(`keyType`: [*KeyPairType*](../modules.md#keypairtype), `keyID?`: *string*, `appID?`: *string*): *Promise*<{} \| [*PGPKeys*](../interfaces/pgpkeys.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`keyType` | [*KeyPairType*](../modules.md#keypairtype) |
`keyID?` | *string* |
`appID?` | *string* |

**Returns:** *Promise*<{} \| [*PGPKeys*](../interfaces/pgpkeys.md)\>

Defined in: [KeyContainer.ts:48](https://github.com/CoNET-project/kloak-bridge/blob/db507e7/src/KeyContainer.ts#L48)

___

### getKeyChain

▸ **getKeyChain**(): *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

**Returns:** *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

Defined in: [KeyContainer.ts:35](https://github.com/CoNET-project/kloak-bridge/blob/db507e7/src/KeyContainer.ts#L35)

___

### saveKeyContainer

▸ `Private`**saveKeyContainer**(): *Promise*<boolean\>

**Returns:** *Promise*<boolean\>

Defined in: [KeyContainer.ts:23](https://github.com/CoNET-project/kloak-bridge/blob/db507e7/src/KeyContainer.ts#L23)

___

### setKey

▸ **setKey**(`keyType`: *device* \| *kloak* \| *storage* \| *messenger*, `pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md)): *Promise*<boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`keyType` | *device* \| *kloak* \| *storage* \| *messenger* |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |

**Returns:** *Promise*<boolean\>

Defined in: [KeyContainer.ts:72](https://github.com/CoNET-project/kloak-bridge/blob/db507e7/src/KeyContainer.ts#L72)
