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
- [decryptWith](encrypthelper.md#decryptwith)
- [encryptSignWith](encrypthelper.md#encryptsignwith)
- [getEncryptionKeyIds](encrypthelper.md#getencryptionkeyids)

## Constructors

### constructor

\+ **new EncryptHelper**(): [*EncryptHelper*](encrypthelper.md)

**Returns:** [*EncryptHelper*](encrypthelper.md)

Defined in: [EncryptHelper.ts:14](https://github.com/CoNET-project/kloak-bridge/blob/89f6f20/src/EncryptHelper.ts#L14)

## Properties

### pgpKeyPair

• `Private` **pgpKeyPair**: [*PGPKeys*](../interfaces/pgpkeys.md)

Defined in: [EncryptHelper.ts:9](https://github.com/CoNET-project/kloak-bridge/blob/89f6f20/src/EncryptHelper.ts#L9)

## Methods

### checkPassword

▸ **checkPassword**(`keyPair`: [*PGPKeys*](../interfaces/pgpkeys.md), `passphrase`: *string*): *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`keyPair` | [*PGPKeys*](../interfaces/pgpkeys.md) |
`passphrase` | *string* |

**Returns:** *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

Defined in: [EncryptHelper.ts:53](https://github.com/CoNET-project/kloak-bridge/blob/89f6f20/src/EncryptHelper.ts#L53)

___

### decryptMessage

▸ **decryptMessage**(`encryptedMessage`: *string*, `buffer?`: *boolean*): *Promise*<[*DecryptResolve*](../modules.md#decryptresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`encryptedMessage` | *string* |
`buffer?` | *boolean* |

**Returns:** *Promise*<[*DecryptResolve*](../modules.md#decryptresolve)\>

Defined in: [EncryptHelper.ts:102](https://github.com/CoNET-project/kloak-bridge/blob/89f6f20/src/EncryptHelper.ts#L102)

___

### encryptMessage

▸ **encryptMessage**(`originalData`: *string* \| ArrayBuffer \| *Uint8Array*): *Promise*<[*EncryptResolve*](../modules.md#encryptresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`originalData` | *string* \| ArrayBuffer \| *Uint8Array* |

**Returns:** *Promise*<[*EncryptResolve*](../modules.md#encryptresolve)\>

Defined in: [EncryptHelper.ts:85](https://github.com/CoNET-project/kloak-bridge/blob/89f6f20/src/EncryptHelper.ts#L85)

___

### generateKey

▸ **generateKey**(`options`: [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md)): *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md) |

**Returns:** *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

Defined in: [EncryptHelper.ts:20](https://github.com/CoNET-project/kloak-bridge/blob/89f6f20/src/EncryptHelper.ts#L20)

___

### isUnlocked

▸ **isUnlocked**(): *boolean*

**Returns:** *boolean*

Defined in: [EncryptHelper.ts:46](https://github.com/CoNET-project/kloak-bridge/blob/89f6f20/src/EncryptHelper.ts#L46)

___

### modifyPGPMessage

▸ **modifyPGPMessage**(`message`: *string*, `trim?`: *boolean*): *string*

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`message` | *string* | - |
`trim` | *boolean* | false |

**Returns:** *string*

Defined in: [EncryptHelper.ts:66](https://github.com/CoNET-project/kloak-bridge/blob/89f6f20/src/EncryptHelper.ts#L66)

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

Defined in: [EncryptHelper.ts:149](https://github.com/CoNET-project/kloak-bridge/blob/89f6f20/src/EncryptHelper.ts#L149)

___

### encryptSignWith

▸ `Static`**encryptSignWith**(`encryptPublicKeys`: *string*[], `signPrivateKey`: *string*[], `data`: *string* \| ArrayBuffer \| *Uint8Array*): *Promise*<[*EncryptResolve*](../modules.md#encryptresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`encryptPublicKeys` | *string*[] |
`signPrivateKey` | *string*[] |
`data` | *string* \| ArrayBuffer \| *Uint8Array* |

**Returns:** *Promise*<[*EncryptResolve*](../modules.md#encryptresolve)\>

Defined in: [EncryptHelper.ts:126](https://github.com/CoNET-project/kloak-bridge/blob/89f6f20/src/EncryptHelper.ts#L126)

___

### getEncryptionKeyIds

▸ `Static`**getEncryptionKeyIds**(`encryptedMessage`: *string*): *Promise*<string[]\>

#### Parameters:

Name | Type |
:------ | :------ |
`encryptedMessage` | *string* |

**Returns:** *Promise*<string[]\>

Defined in: [EncryptHelper.ts:168](https://github.com/CoNET-project/kloak-bridge/blob/89f6f20/src/EncryptHelper.ts#L168)
