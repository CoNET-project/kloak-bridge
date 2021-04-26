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
- [decryptWith](encrypthelper.md#decryptwith)
- [encryptSignWith](encrypthelper.md#encryptsignwith)
- [getEncryptionKeyIds](encrypthelper.md#getencryptionkeyids)
- [getKeyId](encrypthelper.md#getkeyid)
- [modifyPGPMessage](encrypthelper.md#modifypgpmessage)

## Constructors

### constructor

\+ **new EncryptHelper**(): [*EncryptHelper*](encrypthelper.md)

**Returns:** [*EncryptHelper*](encrypthelper.md)

Defined in: [EncryptHelper.ts:14](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/EncryptHelper.ts#L14)

## Properties

### pgpKeyPair

• `Private` **pgpKeyPair**: [*PGPKeys*](../interfaces/pgpkeys.md)

Defined in: [EncryptHelper.ts:9](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/EncryptHelper.ts#L9)

## Methods

### checkPassword

▸ **checkPassword**(`keyPair`: [*PGPKeys*](../interfaces/pgpkeys.md), `passphrase`: *string*): *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`keyPair` | [*PGPKeys*](../interfaces/pgpkeys.md) |
`passphrase` | *string* |

**Returns:** *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

Defined in: [EncryptHelper.ts:71](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/EncryptHelper.ts#L71)

___

### decryptMessage

▸ **decryptMessage**(`encryptedMessage`: *string*, `buffer?`: *boolean*): *Promise*<[*DecryptResolve*](../modules.md#decryptresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`encryptedMessage` | *string* |
`buffer?` | *boolean* |

**Returns:** *Promise*<[*DecryptResolve*](../modules.md#decryptresolve)\>

Defined in: [EncryptHelper.ts:101](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/EncryptHelper.ts#L101)

___

### encryptMessage

▸ **encryptMessage**(`originalData`: *string* \| ArrayBuffer \| *Uint8Array*): *Promise*<[*EncryptResolve*](../modules.md#encryptresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`originalData` | *string* \| ArrayBuffer \| *Uint8Array* |

**Returns:** *Promise*<[*EncryptResolve*](../modules.md#encryptresolve)\>

Defined in: [EncryptHelper.ts:84](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/EncryptHelper.ts#L84)

___

### generateKey

▸ **generateKey**(`options`: [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md)): *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md) |

**Returns:** *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

Defined in: [EncryptHelper.ts:39](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/EncryptHelper.ts#L39)

___

### isUnlocked

▸ **isUnlocked**(): *boolean*

**Returns:** *boolean*

Defined in: [EncryptHelper.ts:64](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/EncryptHelper.ts#L64)

___

### decryptWith

▸ `Static`**decryptWith**(`pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md), `encryptedMessage`: *string*, `checkKeyID?`: *string*): *Promise*<[status: "SUCCESS" \| "FAILURE" \| "KEYID\_CHECK\_ERROR", payload?: any]\>

#### Parameters:

Name | Type |
:------ | :------ |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |
`encryptedMessage` | *string* |
`checkKeyID?` | *string* |

**Returns:** *Promise*<[status: "SUCCESS" \| "FAILURE" \| "KEYID\_CHECK\_ERROR", payload?: any]\>

Defined in: [EncryptHelper.ts:153](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/EncryptHelper.ts#L153)

___

### encryptSignWith

▸ `Static`**encryptSignWith**(`encryptPublicKeys`: *string*[], `signPrivateKey`: *string*[], `data`: *string* \| ArrayBuffer \| *Uint8Array*, `trim?`: *boolean*): *Promise*<[*EncryptResolve*](../modules.md#encryptresolve)\>

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`encryptPublicKeys` | *string*[] | - |
`signPrivateKey` | *string*[] | - |
`data` | *string* \| ArrayBuffer \| *Uint8Array* | - |
`trim` | *boolean* | false |

**Returns:** *Promise*<[*EncryptResolve*](../modules.md#encryptresolve)\>

Defined in: [EncryptHelper.ts:125](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/EncryptHelper.ts#L125)

___

### getEncryptionKeyIds

▸ `Static`**getEncryptionKeyIds**(`encryptedMessage`: *string*): *Promise*<string[]\>

#### Parameters:

Name | Type |
:------ | :------ |
`encryptedMessage` | *string* |

**Returns:** *Promise*<string[]\>

Defined in: [EncryptHelper.ts:183](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/EncryptHelper.ts#L183)

___

### getKeyId

▸ `Static`**getKeyId**(`publicKey`: *string*): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`publicKey` | *string* |

**Returns:** *Promise*<string\>

Defined in: [EncryptHelper.ts:175](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/EncryptHelper.ts#L175)

___

### modifyPGPMessage

▸ `Static`**modifyPGPMessage**(`message`: *string*, `trim?`: *boolean*): *string*

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`message` | *string* | - |
`trim` | *boolean* | false |

**Returns:** *string*

Defined in: [EncryptHelper.ts:20](https://github.com/CoNET-project/kloak-bridge/blob/2fe9d22/src/EncryptHelper.ts#L20)
