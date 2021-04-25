[Kloak Bridge](../README.md) / [Exports](../modules.md) / KloakBridge

# Class: KloakBridge

## Table of contents

### Constructors

- [constructor](kloakbridge.md#constructor)

### Properties

- [IDBHelper](kloakbridge.md#idbhelper)
- [assemblyHelpers](kloakbridge.md#assemblyhelpers)
- [keyContainer](kloakbridge.md#keycontainer)
- [uploadHelpers](kloakbridge.md#uploadhelpers)

### Methods

- [changeKeyContainer](kloakbridge.md#changekeycontainer)
- [checkKeyContainer](kloakbridge.md#checkkeycontainer)
- [createKey](kloakbridge.md#createkey)
- [createKeyContainer](kloakbridge.md#createkeycontainer)
- [delete](kloakbridge.md#delete)
- [deleteKeyContainer](kloakbridge.md#deletekeycontainer)
- [encryptSave](kloakbridge.md#encryptsave)
- [encryptWithDeviceKey](kloakbridge.md#encryptwithdevicekey)
- [generateDefaultKeychain](kloakbridge.md#generatedefaultkeychain)
- [getAppData](kloakbridge.md#getappdata)
- [getAppDataUUID](kloakbridge.md#getappdatauuid)
- [getDeviceKey](kloakbridge.md#getdevicekey)
- [getKloakKey](kloakbridge.md#getkloakkey)
- [lockKeyContainer](kloakbridge.md#lockkeycontainer)
- [retrieve](kloakbridge.md#retrieve)
- [retrieveDecrypt](kloakbridge.md#retrievedecrypt)
- [save](kloakbridge.md#save)
- [unlockKey](kloakbridge.md#unlockkey)
- [unlockKeyContainer](kloakbridge.md#unlockkeycontainer)

## Constructors

### constructor

\+ **new KloakBridge**(): [*KloakBridge*](kloakbridge.md)

**Returns:** [*KloakBridge*](kloakbridge.md)

## Properties

### IDBHelper

• `Private` **IDBHelper**: [*IDBDatabaseHelper*](idbdatabasehelper.md)

Defined in: [KloakBridge.ts:21](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L21)

___

### assemblyHelpers

• `Private` **assemblyHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:19](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L19)

___

### keyContainer

• `Private` **keyContainer**: *undefined* \| [*KeyContainer*](keycontainer.md)

Defined in: [KloakBridge.ts:20](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L20)

___

### uploadHelpers

• `Private` **uploadHelpers**: *object*= {}

#### Type declaration:

Defined in: [KloakBridge.ts:18](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L18)

## Methods

### changeKeyContainer

▸ **changeKeyContainer**(`oldPassphrase`: *string*, `newPassphrase`: *string*): *Promise*<[*ChangeKeyContainerResolve*](../modules.md#changekeycontainerresolve)\>

Change password from KeyChainContainer.

#### Parameters:

Name | Type |
:------ | :------ |
`oldPassphrase` | *string* |
`newPassphrase` | *string* |

**Returns:** *Promise*<[*ChangeKeyContainerResolve*](../modules.md#changekeycontainerresolve)\>

Defined in: [KloakBridge.ts:177](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L177)

___

### checkKeyContainer

▸ **checkKeyContainer**(): *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Check if IndexedDB contains a "KeyChainContainer".

**Returns:** *Promise*<[*CheckContainerResolve*](../modules.md#checkcontainerresolve)\>

Defined in: [KloakBridge.ts:88](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L88)

___

### createKey

▸ **createKey**(`options`: [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md), `unlock?`: *boolean*): *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

Create an OpenPGP key pair.

#### Parameters:

Name | Type |
:------ | :------ |
`options` | [*PGPGenerateOptions*](../interfaces/pgpgenerateoptions.md) |
`unlock?` | *boolean* |

**Returns:** *Promise*<[*KeyResolve*](../modules.md#keyresolve)\>

Defined in: [KloakBridge.ts:223](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L223)

___

### createKeyContainer

▸ **createKeyContainer**(`passphrase`: *string*): *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Create a KeyChainContainer and save into IndexedDB.

#### Parameters:

Name | Type |
:------ | :------ |
`passphrase` | *string* |

**Returns:** *Promise*<[*CreateContainerResolve*](../modules.md#createcontainerresolve)\>

Defined in: [KloakBridge.ts:130](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L130)

___

### delete

▸ **delete**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:262](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L262)

___

### deleteKeyContainer

▸ **deleteKeyContainer**(): *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Delete KeyChainContainer from IndexedDB.

**Returns:** *Promise*<[*DeleteKeychainResolve*](../modules.md#deletekeychainresolve)\>

Defined in: [KloakBridge.ts:159](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L159)

___

### encryptSave

▸ **encryptSave**(`encryptHelper`: [*EncryptHelper*](encrypthelper.md), `data`: *string* \| ArrayBuffer \| *Uint8Array*, `uuid?`: *string*): *Promise*<[*EncryptSaveResolve*](../modules.md#encryptsaveresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`encryptHelper` | [*EncryptHelper*](encrypthelper.md) |
`data` | *string* \| ArrayBuffer \| *Uint8Array* |
`uuid?` | *string* |

**Returns:** *Promise*<[*EncryptSaveResolve*](../modules.md#encryptsaveresolve)\>

Defined in: [KloakBridge.ts:264](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L264)

___

### encryptWithDeviceKey

▸ **encryptWithDeviceKey**(`data`: *string*): *Promise*<[status: "SUCCESS" \| "FAILURE", encryptedData?: string]\>

#### Parameters:

Name | Type |
:------ | :------ |
`data` | *string* |

**Returns:** *Promise*<[status: "SUCCESS" \| "FAILURE", encryptedData?: string]\>

Defined in: [KloakBridge.ts:294](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L294)

___

### generateDefaultKeychain

▸ `Private`**generateDefaultKeychain**(): *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

**Returns:** *Promise*<[*KeyChain*](../interfaces/keychain.md)\>

Defined in: [KloakBridge.ts:23](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L23)

___

### getAppData

▸ **getAppData**(`appID`: *string*): *Promise*<[*GetAppDataUUID*](../modules.md#getappdatauuid)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appID` | *string* |

**Returns:** *Promise*<[*GetAppDataUUID*](../modules.md#getappdatauuid)\>

Defined in: [KloakBridge.ts:332](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L332)

___

### getAppDataUUID

▸ **getAppDataUUID**(`appKeyID`: *string*): *Promise*<undefined \| [*GetAppDataUUID*](../modules.md#getappdatauuid)\>

#### Parameters:

Name | Type |
:------ | :------ |
`appKeyID` | *string* |

**Returns:** *Promise*<undefined \| [*GetAppDataUUID*](../modules.md#getappdatauuid)\>

Defined in: [KloakBridge.ts:173](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L173)

___

### getDeviceKey

▸ **getDeviceKey**(): *Promise*<[*GetDeviceKey*](../modules.md#getdevicekey)\>

**Returns:** *Promise*<[*GetDeviceKey*](../modules.md#getdevicekey)\>

Defined in: [KloakBridge.ts:314](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L314)

___

### getKloakKey

▸ **getKloakKey**(): *Promise*<[*GetKloakKey*](../modules.md#getkloakkey)\>

**Returns:** *Promise*<[*GetKloakKey*](../modules.md#getkloakkey)\>

Defined in: [KloakBridge.ts:323](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L323)

___

### lockKeyContainer

▸ **lockKeyContainer**(): *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

**Returns:** *Promise*<[*LockContainerResolve*](../modules.md#lockcontainerresolve)\>

Defined in: [KloakBridge.ts:78](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L78)

___

### retrieve

▸ **retrieve**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:258](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L258)

___

### retrieveDecrypt

▸ **retrieveDecrypt**(`encryptHelper`: [*EncryptHelper*](encrypthelper.md), `uuid`: *string*, `buffer?`: *boolean*): *Promise*<[*RetrieveDecryptResolve*](../modules.md#retrievedecryptresolve)\>

#### Parameters:

Name | Type |
:------ | :------ |
`encryptHelper` | [*EncryptHelper*](encrypthelper.md) |
`uuid` | *string* |
`buffer?` | *boolean* |

**Returns:** *Promise*<[*RetrieveDecryptResolve*](../modules.md#retrievedecryptresolve)\>

Defined in: [KloakBridge.ts:279](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L279)

___

### save

▸ **save**(`uuid`: *string*, `data`: *any*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |
`data` | *any* |

**Returns:** *Promise*<any\>

Defined in: [KloakBridge.ts:260](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L260)

___

### unlockKey

▸ **unlockKey**(`pgpKeys`: [*PGPKeys*](../interfaces/pgpkeys.md), `passphrase`: *string*): *Promise*<[*UnlockKeyResolve*](../modules.md#unlockkeyresolve)\>

Unlock an OpenPGP key pair.

#### Parameters:

Name | Type |
:------ | :------ |
`pgpKeys` | [*PGPKeys*](../interfaces/pgpkeys.md) |
`passphrase` | *string* |

**Returns:** *Promise*<[*UnlockKeyResolve*](../modules.md#unlockkeyresolve)\>

Defined in: [KloakBridge.ts:242](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L242)

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

Defined in: [KloakBridge.ts:102](https://github.com/CoNET-project/kloak-bridge/blob/31a272e/src/KloakBridge.ts#L102)
