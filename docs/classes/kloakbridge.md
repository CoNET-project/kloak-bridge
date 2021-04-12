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
- [changeContainer](kloakbridge.md#changecontainer)
- [checkKeyContainer](kloakbridge.md#checkkeycontainer)
- [createKey](kloakbridge.md#createkey)
- [createKeyContainer](kloakbridge.md#createkeycontainer)
- [delete](kloakbridge.md#delete)
- [deleteKeyContainer](kloakbridge.md#deletekeycontainer)
- [download](kloakbridge.md#download)
- [encryptSave](kloakbridge.md#encryptsave)
- [getKey](kloakbridge.md#getkey)
- [getKeyChain](kloakbridge.md#getkeychain)
- [retrieve](kloakbridge.md#retrieve)
- [retrieveDecrypt](kloakbridge.md#retrievedecrypt)
- [save](kloakbridge.md#save)
- [setKey](kloakbridge.md#setkey)
- [unlockContainer](kloakbridge.md#unlockcontainer)
- [unlockKey](kloakbridge.md#unlockkey)
- [upload](kloakbridge.md#upload)

## Constructors

### constructor

\+ **new KloakBridge**(): [*KloakBridge*](kloakbridge.md)

**Returns:** [*KloakBridge*](kloakbridge.md)

## Properties

### IDBHelper

• `Private` **IDBHelper**: [*IDBDatabaseHelper*](idbdatabasehelper.md)

Defined in: [KloakBridge.ts:15](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L15)

___

### assemblyHelpers

• `Private` **assemblyHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:12](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L12)

___

### encryptHelpers

• `Private` **encryptHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:13](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L13)

___

### keyContainer

• `Private` **keyContainer**: *undefined* \| [*KeyContainer*](keycontainer.md)

Defined in: [KloakBridge.ts:14](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L14)

___

### uploadHelpers

• `Private` **uploadHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:11](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L11)

## Methods

### addApplicationKey

▸ **addApplicationKey**(`appID`: *string*, `pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md)): *Promise*<undefined \| boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`appID` | *string* |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |

**Returns:** *Promise*<undefined \| boolean\>

Defined in: [KloakBridge.ts:107](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L107)

___

### changeContainer

▸ **changeContainer**(`newPassphrase`: *string*, `keyChain`: [*KeyChain*](../interfaces/keychain.md)): *Promise*<[*BridgeResolves*](../modules.md#bridgeresolves)\>

Change password from KeyChainContainer.

#### Parameters:

Name | Type |
:------ | :------ |
`newPassphrase` | *string* |
`keyChain` | [*KeyChain*](../interfaces/keychain.md) |

**Returns:** *Promise*<[*BridgeResolves*](../modules.md#bridgeresolves)\>

Defined in: [KloakBridge.ts:116](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L116)

___

### checkKeyContainer

▸ **checkKeyContainer**(): *Promise*<[*BridgeResolves*](../modules.md#bridgeresolves)\>

Check if IndexedDB contains a "KeyChainContainer".

**Returns:** *Promise*<[*BridgeResolves*](../modules.md#bridgeresolves)\>

Defined in: [KloakBridge.ts:20](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L20)

___

### createKey

▸ **createKey**(`instanceName`: *string*, `options`: [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md), `unlock?`: *boolean*): *Promise*<[*BridgeResolves*](../modules.md#bridgeresolves)\>

Create an OpenPGP key pair.

#### Parameters:

Name | Type |
:------ | :------ |
`instanceName` | *string* |
`options` | [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md) |
`unlock?` | *boolean* |

**Returns:** *Promise*<[*BridgeResolves*](../modules.md#bridgeresolves)\>

Defined in: [KloakBridge.ts:138](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L138)

___

### createKeyContainer

▸ **createKeyContainer**(`passphrase`: *string*): *Promise*<[*BridgeResolves*](../modules.md#bridgeresolves)\>

Create a KeyChainContainer and save into IndexedDB.

#### Parameters:

Name | Type |
:------ | :------ |
`passphrase` | *string* |

**Returns:** *Promise*<[*BridgeResolves*](../modules.md#bridgeresolves)\>

Defined in: [KloakBridge.ts:57](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L57)

___

### delete

▸ **delete**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:180](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L180)

___

### deleteKeyContainer

▸ **deleteKeyContainer**(): *Promise*<[*BridgeResolves*](../modules.md#bridgeresolves)\>

Delete KeyChainContainer from IndexedDB.

**Returns:** *Promise*<[*BridgeResolves*](../modules.md#bridgeresolves)\>

Defined in: [KloakBridge.ts:94](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L94)

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

Defined in: [KloakBridge.ts:250](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L250)

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

Defined in: [KloakBridge.ts:182](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L182)

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

Defined in: [KloakBridge.ts:111](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L111)

___

### getKeyChain

▸ **getKeyChain**(): *undefined* \| *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

**Returns:** *undefined* \| *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

Defined in: [KloakBridge.ts:105](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L105)

___

### retrieve

▸ **retrieve**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:176](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L176)

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

Defined in: [KloakBridge.ts:200](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L200)

___

### save

▸ **save**(`uuid`: *string*, `data`: *any*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |
`data` | *any* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:178](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L178)

___

### setKey

▸ **setKey**(`keyType`: *device* \| *kloak* \| *storage* \| *messenger*, `pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md)): *Promise*<undefined \| boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`keyType` | *device* \| *kloak* \| *storage* \| *messenger* |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |

**Returns:** *Promise*<undefined \| boolean\>

Defined in: [KloakBridge.ts:109](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L109)

___

### unlockContainer

▸ **unlockContainer**(`passphrase`: *string*): *Promise*<[*BridgeResolves*](../modules.md#bridgeresolves)\>

Unlock a "KeyChainContainer".
If no KeyChainContainer exists in IndexedDB, return error.

#### Parameters:

Name | Type |
:------ | :------ |
`passphrase` | *string* |

**Returns:** *Promise*<[*BridgeResolves*](../modules.md#bridgeresolves)\>

Defined in: [KloakBridge.ts:34](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L34)

___

### unlockKey

▸ **unlockKey**(`instanceName`: *string*, `pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md), `passphrase`: *string*): *Promise*<[*BridgeResolves*](../modules.md#bridgeresolves)\>

Unlock an OpenPGP key pair.

#### Parameters:

Name | Type |
:------ | :------ |
`instanceName` | *string* |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |
`passphrase` | *string* |

**Returns:** *Promise*<[*BridgeResolves*](../modules.md#bridgeresolves)\>

Defined in: [KloakBridge.ts:158](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L158)

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

Defined in: [KloakBridge.ts:219](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/KloakBridge.ts#L219)
