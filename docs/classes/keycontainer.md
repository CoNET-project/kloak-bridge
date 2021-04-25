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
- [getAppDataUUID](keycontainer.md#getappdatauuid)
- [getKeyChain](keycontainer.md#getkeychain)
- [retrieveDeviceKey](keycontainer.md#retrievedevicekey)
- [retrieveKloakKey](keycontainer.md#retrievekloakkey)
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

Defined in: [KeyContainer.ts:13](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KeyContainer.ts#L13)

## Properties

### IDBHelper

• `Private` **IDBHelper**: [*IDBDatabaseHelper*](idbdatabasehelper.md)

Defined in: [KeyContainer.ts:7](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KeyContainer.ts#L7)

___

### encryptHelper

• `Private` **encryptHelper**: *null* \| [*EncryptHelper*](encrypthelper.md)= null

Defined in: [KeyContainer.ts:8](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KeyContainer.ts#L8)

___

### keyChain

• `Private` **keyChain**: [*KeyChain*](../interfaces/keychain.md)

Defined in: [KeyContainer.ts:9](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KeyContainer.ts#L9)

## Methods

### addAppID

▸ **addAppID**(`appKeyID`: *string*, `publicKey`: *string*): *Promise*<[status: "SUCCESS" \| "ALREADY\_EXISTS"]\>

#### Parameters:

Name | Type |
:------ | :------ |
`appKeyID` | *string* |
`publicKey` | *string* |

**Returns:** *Promise*<[status: "SUCCESS" \| "ALREADY\_EXISTS"]\>

Defined in: [KeyContainer.ts:34](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KeyContainer.ts#L34)

___

### getAppDataUUID

▸ **getAppDataUUID**(`appID`: *string*): *Promise*<[*GetAppDataUUID*](../modules.md#getappdatauuid)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appID` | *string* |

**Returns:** *Promise*<[*GetAppDataUUID*](../modules.md#getappdatauuid)\>

Defined in: [KeyContainer.ts:104](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KeyContainer.ts#L104)

___

### getKeyChain

▸ **getKeyChain**(): [*KeyChain*](../interfaces/keychain.md)

**Returns:** [*KeyChain*](../interfaces/keychain.md)

Defined in: [KeyContainer.ts:32](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KeyContainer.ts#L32)

___

### retrieveDeviceKey

▸ **retrieveDeviceKey**(): *Promise*<[*GetDeviceKey*](../modules.md#getdevicekey)\>

**Returns:** *Promise*<[*GetDeviceKey*](../modules.md#getdevicekey)\>

Defined in: [KeyContainer.ts:86](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KeyContainer.ts#L86)

___

### retrieveKloakKey

▸ **retrieveKloakKey**(): *Promise*<[*GetKloakKey*](../modules.md#getkloakkey)\>

**Returns:** *Promise*<[*GetKloakKey*](../modules.md#getkloakkey)\>

Defined in: [KeyContainer.ts:95](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KeyContainer.ts#L95)

___

### saveKeyContainer

▸ `Private`**saveKeyContainer**(): *Promise*<boolean\>

**Returns:** *Promise*<boolean\>

Defined in: [KeyContainer.ts:20](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KeyContainer.ts#L20)
