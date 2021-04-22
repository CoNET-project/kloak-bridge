[Kloak Bridge](../README.md) / [Exports](../modules.md) / KeyContainer

# Class: KeyContainer

## Table of contents

### Constructors

- [constructor](keycontainer.md#constructor)

### Properties

- [IDBHelper](keycontainer.md#idbhelper)
- [encryptHelper](keycontainer.md#encrypthelper)
- [keyChain](keycontainer.md#keychain)

### Methods

- [addAppID](keycontainer.md#addappid)
- [addAppKey](keycontainer.md#addappkey)
- [getKey](keycontainer.md#getkey)
- [getKeyChain](keycontainer.md#getkeychain)
- [saveKeyContainer](keycontainer.md#savekeycontainer)

## Constructors

### constructor

\+ **new KeyContainer**(`encryptHelper`: [*EncryptHelper*](encrypthelper.md), `keyChain`: [*KeyChain*](../interfaces/keychain.md)): [*KeyContainer*](keycontainer.md)

#### Parameters:

Name | Type |
:------ | :------ |
`encryptHelper` | [*EncryptHelper*](encrypthelper.md) |
`keyChain` | [*KeyChain*](../interfaces/keychain.md) |

**Returns:** [*KeyContainer*](keycontainer.md)

Defined in: [KeyContainer.ts:12](https://github.com/CoNET-project/kloak-bridge/blob/3516064/src/KeyContainer.ts#L12)

## Properties

### IDBHelper

• `Private` **IDBHelper**: [*IDBDatabaseHelper*](idbdatabasehelper.md)

Defined in: [KeyContainer.ts:6](https://github.com/CoNET-project/kloak-bridge/blob/3516064/src/KeyContainer.ts#L6)

___

### encryptHelper

• `Private` **encryptHelper**: *null* \| [*EncryptHelper*](encrypthelper.md)= null

Defined in: [KeyContainer.ts:7](https://github.com/CoNET-project/kloak-bridge/blob/3516064/src/KeyContainer.ts#L7)

___

### keyChain

• `Private` **keyChain**: [*KeyChain*](../interfaces/keychain.md)

Defined in: [KeyContainer.ts:8](https://github.com/CoNET-project/kloak-bridge/blob/3516064/src/KeyContainer.ts#L8)

## Methods

### addAppID

▸ **addAppID**(`appKeyID`: *string*, `publicKey`: *string*): *Promise*<[status: "SUCCESS" \| "ALREADY\_EXISTS"]\>

#### Parameters:

Name | Type |
:------ | :------ |
`appKeyID` | *string* |
`publicKey` | *string* |

**Returns:** *Promise*<[status: "SUCCESS" \| "ALREADY\_EXISTS"]\>

Defined in: [KeyContainer.ts:33](https://github.com/CoNET-project/kloak-bridge/blob/3516064/src/KeyContainer.ts#L33)

___

### addAppKey

▸ **addAppKey**(`appID`: *string*, `pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md)): *Promise*<[status: "SUCCESS" \| "APP\_DOES\_NOT\_EXIST"]\>

#### Parameters:

Name | Type |
:------ | :------ |
`appID` | *string* |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |

**Returns:** *Promise*<[status: "SUCCESS" \| "APP\_DOES\_NOT\_EXIST"]\>

Defined in: [KeyContainer.ts:47](https://github.com/CoNET-project/kloak-bridge/blob/3516064/src/KeyContainer.ts#L47)

___

### getKey

▸ **getKey**(`appID`: *string*, `keyId?`: *string*): *Promise*<[status: "SUCCESS" \| "DOES\_NOT\_EXIST" \| "FAILURE", pgpKeys?: PGPKeys]\>

#### Parameters:

Name | Type |
:------ | :------ |
`appID` | *string* |
`keyId?` | *string* |

**Returns:** *Promise*<[status: "SUCCESS" \| "DOES\_NOT\_EXIST" \| "FAILURE", pgpKeys?: PGPKeys]\>

Defined in: [KeyContainer.ts:58](https://github.com/CoNET-project/kloak-bridge/blob/3516064/src/KeyContainer.ts#L58)

___

### getKeyChain

▸ **getKeyChain**(): [*KeyChain*](../interfaces/keychain.md)

**Returns:** [*KeyChain*](../interfaces/keychain.md)

Defined in: [KeyContainer.ts:31](https://github.com/CoNET-project/kloak-bridge/blob/3516064/src/KeyContainer.ts#L31)

___

### saveKeyContainer

▸ `Private`**saveKeyContainer**(): *Promise*<boolean\>

**Returns:** *Promise*<boolean\>

Defined in: [KeyContainer.ts:19](https://github.com/CoNET-project/kloak-bridge/blob/3516064/src/KeyContainer.ts#L19)
