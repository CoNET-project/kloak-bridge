[Kloak Bridge](../README.md) / [Exports](../modules.md) / KloakBridge

# Class: KloakBridge

## Table of contents

### Constructors

- [constructor](kloakbridge.md#constructor)

### Properties

- [IDBHelper](kloakbridge.md#idbhelper)
- [assemblyHelpers](kloakbridge.md#assemblyhelpers)
- [encryptHelpers](kloakbridge.md#encrypthelpers)
- [keyContainer](kloakbridge.md#keycontainer)
- [uploadHelpers](kloakbridge.md#uploadhelpers)

### Methods

- [addApplicationKey](kloakbridge.md#addapplicationkey)
- [changeKeyContainer](kloakbridge.md#changekeycontainer)
- [checkKeyContainer](kloakbridge.md#checkkeycontainer)
- [createKey](kloakbridge.md#createkey)
- [createKeyContainer](kloakbridge.md#createkeycontainer)
- [delete](kloakbridge.md#delete)
- [deleteKeyContainer](kloakbridge.md#deletekeycontainer)
- [download](kloakbridge.md#download)
- [encryptSave](kloakbridge.md#encryptsave)
- [getKey](kloakbridge.md#getkey)
- [getKeyChain](kloakbridge.md#getkeychain)
- [lockKeyContainer](kloakbridge.md#lockkeycontainer)
- [retrieve](kloakbridge.md#retrieve)
- [retrieveDecrypt](kloakbridge.md#retrievedecrypt)
- [save](kloakbridge.md#save)
- [setKey](kloakbridge.md#setkey)
- [unlockKey](kloakbridge.md#unlockkey)
- [unlockKeyContainer](kloakbridge.md#unlockkeycontainer)
- [upload](kloakbridge.md#upload)

## Constructors

### constructor

\+ **new KloakBridge**(): [*KloakBridge*](kloakbridge.md)

**Returns:** [*KloakBridge*](kloakbridge.md)

## Properties

### IDBHelper

• `Private` **IDBHelper**: [*IDBDatabaseHelper*](idbdatabasehelper.md)

Defined in: [KloakBridge.ts:21](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L21)

___

### assemblyHelpers

• `Private` **assemblyHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:18](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L18)

___

### encryptHelpers

• `Private` **encryptHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:19](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L19)

___

### keyContainer

• `Private` **keyContainer**: *undefined* \| [*KeyContainer*](keycontainer.md)

Defined in: [KloakBridge.ts:20](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L20)

___

### uploadHelpers

• `Private` **uploadHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:17](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L17)

## Methods

### addApplicationKey

▸ **addApplicationKey**(`appID`: *string*, `pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md)): *Promise*<undefined \| boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`appID` | *string* |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |

**Returns:** *Promise*<undefined \| boolean\>

Defined in: [KloakBridge.ts:120](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L120)

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

Defined in: [KloakBridge.ts:129](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L129)

___

### checkKeyContainer

▸ **checkKeyContainer**(): *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Check if IndexedDB contains a "KeyChainContainer".

**Returns:** *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Defined in: [KloakBridge.ts:33](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L33)

___

### createKey

▸ **createKey**(`instanceName`: *string*, `options`: [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md), `unlock?`: *boolean*): *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

Create an OpenPGP key pair.

#### Parameters:

Name | Type |
:------ | :------ |
`instanceName` | *string* |
`options` | [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md) |
`unlock?` | *boolean* |

**Returns:** *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

Defined in: [KloakBridge.ts:151](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L151)

___

### createKeyContainer

▸ **createKeyContainer**(`passphrase`: *string*): *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Create a KeyChainContainer and save into IndexedDB.

#### Parameters:

Name | Type |
:------ | :------ |
`passphrase` | *string* |

**Returns:** *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Defined in: [KloakBridge.ts:70](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L70)

___

### delete

▸ **delete**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:193](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L193)

___

### deleteKeyContainer

▸ **deleteKeyContainer**(): *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Delete KeyChainContainer from IndexedDB.

**Returns:** *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Defined in: [KloakBridge.ts:107](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L107)

___

### download

▸ **download**(`encryptInstance`: *string*, `uuid`: *string*, `callback`: (`err`: *null* \| Error, `progress`: *number*) => *void*): *Promise*<unknown\>

#### Parameters:

Name | Type |
:------ | :------ |
`encryptInstance` | *string* |
`uuid` | *string* |
`callback` | (`err`: *null* \| Error, `progress`: *number*) => *void* |

**Returns:** *Promise*<unknown\>

Defined in: [KloakBridge.ts:263](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L263)

___

### encryptSave

▸ **encryptSave**(`instanceName`: *string*, `data`: *string* \| ArrayBuffer \| *Uint8Array*, `uuid?`: *string*): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`instanceName` | *string* |
`data` | *string* \| ArrayBuffer \| *Uint8Array* |
`uuid?` | *string* |

**Returns:** *Promise*<string\>

Defined in: [KloakBridge.ts:195](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L195)

___

### getKey

▸ **getKey**(`keyType`: [*KeyPairType*](../modules.md#keypairtype), `keyID?`: *string*, `appID?`: *string*): *undefined* \| *Promise*<{} \| [*PGPKeys*](../interfaces/pgpkeys.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`keyType` | [*KeyPairType*](../modules.md#keypairtype) |
`keyID?` | *string* |
`appID?` | *string* |

**Returns:** *undefined* \| *Promise*<{} \| [*PGPKeys*](../interfaces/pgpkeys.md)\>

Defined in: [KloakBridge.ts:124](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L124)

___

### getKeyChain

▸ **getKeyChain**(): *undefined* \| *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

**Returns:** *undefined* \| *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

Defined in: [KloakBridge.ts:118](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L118)

___

### lockKeyContainer

▸ **lockKeyContainer**(): *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

**Returns:** *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

Defined in: [KloakBridge.ts:23](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L23)

___

### retrieve

▸ **retrieve**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:189](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L189)

___

### retrieveDecrypt

▸ **retrieveDecrypt**(`instanceName`: *string*, `uuid`: *string*, `buffer?`: *boolean*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`instanceName` | *string* |
`uuid` | *string* |
`buffer?` | *boolean* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:213](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L213)

___

### save

▸ **save**(`uuid`: *string*, `data`: *any*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |
`data` | *any* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:191](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L191)

___

### setKey

▸ **setKey**(`keyType`: *device* \| *kloak* \| *storage* \| *messenger*, `pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md)): *Promise*<undefined \| boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`keyType` | *device* \| *kloak* \| *storage* \| *messenger* |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |

**Returns:** *Promise*<undefined \| boolean\>

Defined in: [KloakBridge.ts:122](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L122)

___

### unlockKey

▸ **unlockKey**(`instanceName`: *string*, `pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md), `passphrase`: *string*): *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

Unlock an OpenPGP key pair.

#### Parameters:

Name | Type |
:------ | :------ |
`instanceName` | *string* |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |
`passphrase` | *string* |

**Returns:** *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

Defined in: [KloakBridge.ts:171](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L171)

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

Defined in: [KloakBridge.ts:47](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L47)

___

### upload

▸ **upload**(`encryptInstance`: *string*, `source`: File \| Blob, `callback`: (`err`: *null* \| Error, `progress`: *number*, `done`: *boolean*) => *void*): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`encryptInstance` | *string* |
`source` | File \| Blob |
`callback` | (`err`: *null* \| Error, `progress`: *number*, `done`: *boolean*) => *void* |

**Returns:** *Promise*<string\>

Defined in: [KloakBridge.ts:232](https://github.com/CoNET-project/kloak-bridge/blob/5b853dc/src/KloakBridge.ts#L232)
