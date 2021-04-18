[Kloak Bridge](../README.md) / [Exports](../modules.md) / EncryptHelper

# Class: EncryptHelper

## Table of contents

### Constructors

- [constructor](encrypthelper.md#constructor)

### Properties

- [pgpKeyPair](encrypthelper.md#pgpkeypair)

### Methods

- [checkPassword](encrypthelper.md#checkpassword)
- [decryptMessage](encrypthelper.md#decryptmessage)
- [encryptMessage](encrypthelper.md#encryptmessage)
- [generateKey](encrypthelper.md#generatekey)
- [isUnlocked](encrypthelper.md#isunlocked)
- [modifyPGPMessage](encrypthelper.md#modifypgpmessage)

## Constructors

### constructor

\+ **new EncryptHelper**(): [*EncryptHelper*](encrypthelper.md)

**Returns:** [*EncryptHelper*](encrypthelper.md)

Defined in: [EncryptHelper.ts:14](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/EncryptHelper.ts#L14)

## Properties

### pgpKeyPair

• `Private` **pgpKeyPair**: [*PGPKeys*](../interfaces/pgpkeys.md)

Defined in: [EncryptHelper.ts:9](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/EncryptHelper.ts#L9)

## Methods

### checkPassword

▸ **checkPassword**(`keyPair`: [*PGPKeys*](../interfaces/pgpkeys.md), `passphrase`: *string*): *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`keyPair` | [*PGPKeys*](../interfaces/pgpkeys.md) |
`passphrase` | *string* |

**Returns:** *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

Defined in: [EncryptHelper.ts:52](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/EncryptHelper.ts#L52)

___

### decryptMessage

▸ **decryptMessage**(`encryptedMessage`: *string*, `buffer?`: *boolean*): *Promise*<[*DecryptResolve*](../modules.md#decryptresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`encryptedMessage` | *string* |
`buffer?` | *boolean* |

**Returns:** *Promise*<[*DecryptResolve*](../modules.md#decryptresolve)\>

Defined in: [EncryptHelper.ts:108](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/EncryptHelper.ts#L108)

___

### encryptMessage

▸ **encryptMessage**(`originalData`: *string* \| ArrayBuffer \| *Uint8Array*): *Promise*<[*EncryptResolve*](../modules.md#encryptresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`originalData` | *string* \| ArrayBuffer \| *Uint8Array* |

**Returns:** *Promise*<[*EncryptResolve*](../modules.md#encryptresolve)\>

Defined in: [EncryptHelper.ts:91](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/EncryptHelper.ts#L91)

___

### generateKey

▸ **generateKey**(`options`: [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md)): *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md) |

**Returns:** *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

Defined in: [EncryptHelper.ts:20](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/EncryptHelper.ts#L20)

___

### isUnlocked

▸ **isUnlocked**(): *boolean*

**Returns:** *boolean*

Defined in: [EncryptHelper.ts:45](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/EncryptHelper.ts#L45)

___

### modifyPGPMessage

▸ **modifyPGPMessage**(`message`: *string*, `trim?`: *boolean*): *string*

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`message` | *string* | - |
`trim` | *boolean* | false |

**Returns:** *string*

Defined in: [EncryptHelper.ts:72](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/EncryptHelper.ts#L72)
