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

Defined in: [EncryptHelper.ts:13](https://github.com/CoNET-project/kloak-bridge/blob/2af6df3/src/EncryptHelper.ts#L13)

## Properties

### pgpKeyPair

• `Private` **pgpKeyPair**: [*PGPKeys*](../interfaces/pgpkeys.md)

Defined in: [EncryptHelper.ts:8](https://github.com/CoNET-project/kloak-bridge/blob/2af6df3/src/EncryptHelper.ts#L8)

## Methods

### checkPassword

▸ **checkPassword**(`keyPair`: [*PGPKeys*](../interfaces/pgpkeys.md), `passphrase`: *string*): *Promise*<boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`keyPair` | [*PGPKeys*](../interfaces/pgpkeys.md) |
`passphrase` | *string* |

**Returns:** *Promise*<boolean\>

Defined in: [EncryptHelper.ts:51](https://github.com/CoNET-project/kloak-bridge/blob/2af6df3/src/EncryptHelper.ts#L51)

___

### decryptMessage

▸ **decryptMessage**(`encryptedMessage`: *string*, `buffer?`: *boolean*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`encryptedMessage` | *string* |
`buffer?` | *boolean* |

**Returns:** *Promise*<any\>

Defined in: [EncryptHelper.ts:107](https://github.com/CoNET-project/kloak-bridge/blob/2af6df3/src/EncryptHelper.ts#L107)

___

### encryptMessage

▸ **encryptMessage**(`originalData`: *string* \| ArrayBuffer \| *Uint8Array*): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`originalData` | *string* \| ArrayBuffer \| *Uint8Array* |

**Returns:** *Promise*<string\>

Defined in: [EncryptHelper.ts:90](https://github.com/CoNET-project/kloak-bridge/blob/2af6df3/src/EncryptHelper.ts#L90)

___

### generateKey

▸ **generateKey**(`options`: [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md)): *Promise*<[*PGPKeys*](../interfaces/pgpkeys.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md) |

**Returns:** *Promise*<[*PGPKeys*](../interfaces/pgpkeys.md)\>

Defined in: [EncryptHelper.ts:19](https://github.com/CoNET-project/kloak-bridge/blob/2af6df3/src/EncryptHelper.ts#L19)

___

### isUnlocked

▸ **isUnlocked**(): *boolean*

**Returns:** *boolean*

Defined in: [EncryptHelper.ts:44](https://github.com/CoNET-project/kloak-bridge/blob/2af6df3/src/EncryptHelper.ts#L44)

___

### modifyPGPMessage

▸ **modifyPGPMessage**(`message`: *string*, `trim?`: *boolean*): *string*

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`message` | *string* | - |
`trim` | *boolean* | false |

**Returns:** *string*

Defined in: [EncryptHelper.ts:71](https://github.com/CoNET-project/kloak-bridge/blob/2af6df3/src/EncryptHelper.ts#L71)
