[@conet-project/kloak-bridge](../README.md) / [Exports](../modules.md) / StorageHelper

# Class: StorageHelper

## Table of contents

### Constructors

- [constructor](storagehelper.md#constructor)

### Properties

- [IDBHelper](storagehelper.md#idbhelper)
- [assemblyHelpers](storagehelper.md#assemblyhelpers)
- [encryptHelpers](storagehelper.md#encrypthelpers)
- [keyContainer](storagehelper.md#keycontainer)
- [uploadHelpers](storagehelper.md#uploadhelpers)

### Methods

- [addApplicationKey](storagehelper.md#addapplicationkey)
- [changeContainer](storagehelper.md#changecontainer)
- [checkKeyContainer](storagehelper.md#checkkeycontainer)
- [createKey](storagehelper.md#createkey)
- [createKeyContainer](storagehelper.md#createkeycontainer)
- [delete](storagehelper.md#delete)
- [deleteKeyContainer](storagehelper.md#deletekeycontainer)
- [download](storagehelper.md#download)
- [encryptSave](storagehelper.md#encryptsave)
- [getKey](storagehelper.md#getkey)
- [getKeyChain](storagehelper.md#getkeychain)
- [retrieve](storagehelper.md#retrieve)
- [retrieveDecrypt](storagehelper.md#retrievedecrypt)
- [save](storagehelper.md#save)
- [setKey](storagehelper.md#setkey)
- [unlockContainer](storagehelper.md#unlockcontainer)
- [unlockKey](storagehelper.md#unlockkey)
- [upload](storagehelper.md#upload)

## Constructors

### constructor

\+ **new StorageHelper**(): [*StorageHelper*](storagehelper.md)

**Returns:** [*StorageHelper*](storagehelper.md)

## Properties

### IDBHelper

• `Private` **IDBHelper**: [*IDBDatabaseHelper*](idbdatabasehelper.md)

Defined in: [StorageHelper.ts:15](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L15)

___

### assemblyHelpers

• `Private` **assemblyHelpers**: *object*= {}

#### Type declaration:

Defined in: [StorageHelper.ts:12](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L12)

___

### encryptHelpers

• `Private` **encryptHelpers**: *object*= {}

#### Type declaration:

Defined in: [StorageHelper.ts:13](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L13)

___

### keyContainer

• `Private` **keyContainer**: *undefined* \| [*KeyContainer*](keycontainer.md)

Defined in: [StorageHelper.ts:14](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L14)

___

### uploadHelpers

• `Private` **uploadHelpers**: *object*= {}

#### Type declaration:

Defined in: [StorageHelper.ts:11](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L11)

## Methods

### addApplicationKey

▸ **addApplicationKey**(`appID`: *string*, `pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md)): *Promise*<undefined \| boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`appID` | *string* |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |

**Returns:** *Promise*<undefined \| boolean\>

Defined in: [StorageHelper.ts:104](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L104)

___

### changeContainer

▸ **changeContainer**(`newPassphrase`: *string*, `keyChain`: [*KeyChain*](../interfaces/keychain.md)): *Promise*<[*KeyChainContainer*](../interfaces/keychaincontainer.md)\>

Change password from KeyChainContainer.

#### Parameters:

Name | Type |
:------ | :------ |
`newPassphrase` | *string* |
`keyChain` | [*KeyChain*](../interfaces/keychain.md) |

**Returns:** *Promise*<[*KeyChainContainer*](../interfaces/keychaincontainer.md)\>

Defined in: [StorageHelper.ts:113](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L113)

___

### checkKeyContainer

▸ **checkKeyContainer**(): *Promise*<[*KeyChainContainer*](../interfaces/keychaincontainer.md)\>

Check if IndexedDB contains a "KeyChainContainer".

**Returns:** *Promise*<[*KeyChainContainer*](../interfaces/keychaincontainer.md)\>

Defined in: [StorageHelper.ts:20](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L20)

___

### createKey

▸ **createKey**(`instanceName`: *string*, `options`: [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md), `unlock?`: *boolean*): *Promise*<[*PGPKeys*](../interfaces/pgpkeys.md)\>

Create an OpenPGP key pair.

#### Parameters:

Name | Type |
:------ | :------ |
`instanceName` | *string* |
`options` | [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md) |
`unlock?` | *boolean* |

**Returns:** *Promise*<[*PGPKeys*](../interfaces/pgpkeys.md)\>

Defined in: [StorageHelper.ts:135](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L135)

___

### createKeyContainer

▸ **createKeyContainer**(`passphrase`: *string*): *Promise*<[*KeyChainContainer*](../interfaces/keychaincontainer.md)\>

Create a KeyChainContainer and save into IndexedDB.

#### Parameters:

Name | Type |
:------ | :------ |
`passphrase` | *string* |

**Returns:** *Promise*<[*KeyChainContainer*](../interfaces/keychaincontainer.md)\>

Defined in: [StorageHelper.ts:54](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L54)

___

### delete

▸ **delete**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [StorageHelper.ts:173](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L173)

___

### deleteKeyContainer

▸ **deleteKeyContainer**(): *Promise*<boolean\>

Delete KeyChainContainer from IndexedDB.

**Returns:** *Promise*<boolean\>

Defined in: [StorageHelper.ts:91](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L91)

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

Defined in: [StorageHelper.ts:243](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L243)

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

Defined in: [StorageHelper.ts:175](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L175)

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

Defined in: [StorageHelper.ts:108](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L108)

___

### getKeyChain

▸ **getKeyChain**(): *undefined* \| *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

**Returns:** *undefined* \| *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

Defined in: [StorageHelper.ts:102](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L102)

___

### retrieve

▸ **retrieve**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [StorageHelper.ts:169](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L169)

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

Defined in: [StorageHelper.ts:193](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L193)

___

### save

▸ **save**(`uuid`: *string*, `data`: *any*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |
`data` | *any* |

**Returns:** *Promise*<any\>

Defined in: [StorageHelper.ts:171](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L171)

___

### setKey

▸ **setKey**(`keyType`: *device* \| *kloak* \| *storage* \| *messenger*, `pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md)): *Promise*<undefined \| boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`keyType` | *device* \| *kloak* \| *storage* \| *messenger* |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |

**Returns:** *Promise*<undefined \| boolean\>

Defined in: [StorageHelper.ts:106](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L106)

___

### unlockContainer

▸ **unlockContainer**(`passphrase`: *string*): *Promise*<boolean\>

Unlock a "KeyChainContainer".
If no KeyChainContainer exists in IndexedDB, return error.

#### Parameters:

Name | Type |
:------ | :------ |
`passphrase` | *string* |

**Returns:** *Promise*<boolean\>

Defined in: [StorageHelper.ts:34](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L34)

___

### unlockKey

▸ **unlockKey**(`instanceName`: *string*, `pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md), `passphrase`: *string*): *Promise*<boolean\>

Unlock an OpenPGP key pair.

#### Parameters:

Name | Type |
:------ | :------ |
`instanceName` | *string* |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |
`passphrase` | *string* |

**Returns:** *Promise*<boolean\>

Defined in: [StorageHelper.ts:155](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L155)

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

Defined in: [StorageHelper.ts:212](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/StorageHelper.ts#L212)
