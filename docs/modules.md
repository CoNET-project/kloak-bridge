[Kloak Bridge](README.md) / Exports

# Kloak Bridge

## Table of contents

### Classes

- [AssemblyHelper](classes/assemblyhelper.md)
- [DisassemblyHelper](classes/disassemblyhelper.md)
- [EncryptHelper](classes/encrypthelper.md)
- [IDBDatabaseHelper](classes/idbdatabasehelper.md)
- [KeyContainer](classes/keycontainer.md)
- [KloakBridge](classes/kloakbridge.md)

### Interfaces

- [ApplicationKeys](interfaces/applicationkeys.md)
- [DisassemblyOptions](interfaces/disassemblyoptions.md)
- [DisassemblyProgress](interfaces/disassemblyprogress.md)
- [KeyChain](interfaces/keychain.md)
- [KeyChainContainer](interfaces/keychaincontainer.md)
- [KloakFileIndex](interfaces/kloakfileindex.md)
- [KloakFileMetadata](interfaces/kloakfilemetadata.md)
- [MessengerKey](interfaces/messengerkey.md)
- [MessengerKeys](interfaces/messengerkeys.md)
- [PGPGenerateOptions](interfaces/pgpgenerateoptions.md)
- [PGPKeys](interfaces/pgpkeys.md)

### Type aliases

- [AssemblyCallback](modules.md#assemblycallback)
- [ChangeKeyContainerResolve](modules.md#changekeycontainerresolve)
- [ChangeKeyContainerStatus](modules.md#changekeycontainerstatus)
- [CheckContainerResolve](modules.md#checkcontainerresolve)
- [CheckContainerStatus](modules.md#checkcontainerstatus)
- [CreateContainerResolve](modules.md#createcontainerresolve)
- [CreateContainerStatus](modules.md#createcontainerstatus)
- [DecryptResolve](modules.md#decryptresolve)
- [DeleteKeychainResolve](modules.md#deletekeychainresolve)
- [DeleteKeychainStatus](modules.md#deletekeychainstatus)
- [DisassemblyCallback](modules.md#disassemblycallback)
- [DisassemblySource](modules.md#disassemblysource)
- [EncryptResolve](modules.md#encryptresolve)
- [EncryptSaveResolve](modules.md#encryptsaveresolve)
- [KeyResolve](modules.md#keyresolve)
- [KeyStatus](modules.md#keystatus)
- [LockContainerResolve](modules.md#lockcontainerresolve)
- [LockContainerStatus](modules.md#lockcontainerstatus)
- [RetrieveDecryptResolve](modules.md#retrievedecryptresolve)
- [UnlockContainerResolve](modules.md#unlockcontainerresolve)
- [UnlockContainerStatus](modules.md#unlockcontainerstatus)
- [UnlockKeyResolve](modules.md#unlockkeyresolve)

### Functions

- [createRandomValues](modules.md#createrandomvalues)
- [getUUIDv4](modules.md#getuuidv4)

## Type aliases

### AssemblyCallback

Ƭ **AssemblyCallback**: (`error`: *any*, `progress`: *number*, `nextChunk?`: *string*, `data?`: ArrayBuffer) => *void*

#### Type declaration:

▸ (`error`: *any*, `progress`: *number*, `nextChunk?`: *string*, `data?`: ArrayBuffer): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | *any* |
`progress` | *number* |
`nextChunk?` | *string* |
`data?` | ArrayBuffer |

**Returns:** *void*

Defined in: [define.ts:86](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L86)

___

### ChangeKeyContainerResolve

Ƭ **ChangeKeyContainerResolve**: [status: ChangeKeyContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:100](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L100)

___

### ChangeKeyContainerStatus

Ƭ **ChangeKeyContainerStatus**: *SUCCESS* \| *FAILURE* \| *NO_PASSPHRASE*

Defined in: [define.ts:98](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L98)

___

### CheckContainerResolve

Ƭ **CheckContainerResolve**: [status: CheckContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:112](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L112)

___

### CheckContainerStatus

Ƭ **CheckContainerStatus**: *EXISTS* \| *DOES_NOT_EXIST*

Defined in: [define.ts:110](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L110)

___

### CreateContainerResolve

Ƭ **CreateContainerResolve**: [status: CreateContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:104](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L104)

___

### CreateContainerStatus

Ƭ **CreateContainerStatus**: *SUCCESS* \| *FAILURE* \| *INVALID_PASSPHRASE*

Defined in: [define.ts:102](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L102)

___

### DecryptResolve

Ƭ **DecryptResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string \| Buffer]

Defined in: [define.ts:120](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L120)

___

### DeleteKeychainResolve

Ƭ **DeleteKeychainResolve**: [status: DeleteKeychainStatus]

Defined in: [define.ts:96](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L96)

___

### DeleteKeychainStatus

Ƭ **DeleteKeychainStatus**: *SUCCESS* \| *FAILURE*

Defined in: [define.ts:94](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L94)

___

### DisassemblyCallback

Ƭ **DisassemblyCallback**: (`error`: *any*, `current`: [*DisassemblyProgress*](interfaces/disassemblyprogress.md), `next?`: () => *void*) => *void*

#### Type declaration:

▸ (`error`: *any*, `current`: [*DisassemblyProgress*](interfaces/disassemblyprogress.md), `next?`: () => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | *any* |
`current` | [*DisassemblyProgress*](interfaces/disassemblyprogress.md) |
`next?` | () => *void* |

**Returns:** *void*

Defined in: [define.ts:79](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L79)

___

### DisassemblySource

Ƭ **DisassemblySource**: File \| Blob

Defined in: [define.ts:50](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L50)

___

### EncryptResolve

Ƭ **EncryptResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string]

Defined in: [define.ts:118](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L118)

___

### EncryptSaveResolve

Ƭ **EncryptSaveResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string]

Defined in: [define.ts:122](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L122)

___

### KeyResolve

Ƭ **KeyResolve**: [status: KeyStatus, payload?: PGPKeys]

Defined in: [define.ts:90](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L90)

___

### KeyStatus

Ƭ **KeyStatus**: *SUCCESS* \| *FAILURE* \| *INVALID_PASSPHRASE*

Defined in: [define.ts:88](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L88)

___

### LockContainerResolve

Ƭ **LockContainerResolve**: [status: LockContainerStatus]

Defined in: [define.ts:116](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L116)

___

### LockContainerStatus

Ƭ **LockContainerStatus**: *SUCCESS* \| *FAILURE*

Defined in: [define.ts:114](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L114)

___

### RetrieveDecryptResolve

Ƭ **RetrieveDecryptResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string]

Defined in: [define.ts:124](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L124)

___

### UnlockContainerResolve

Ƭ **UnlockContainerResolve**: [status: UnlockContainerStatus]

Defined in: [define.ts:108](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L108)

___

### UnlockContainerStatus

Ƭ **UnlockContainerStatus**: *SUCCESS* \| *FAILURE* \| *INVALID_PASSPHRASE* \| *MISSING_KEYCHAIN* \| *MISSING_CONTAINER*

Defined in: [define.ts:106](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L106)

___

### UnlockKeyResolve

Ƭ **UnlockKeyResolve**: [status: KeyStatus, payload?: EncryptHelper]

Defined in: [define.ts:92](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/define.ts#L92)

## Functions

### createRandomValues

▸ `Const`**createRandomValues**(): *Promise*<string\>

**Returns:** *Promise*<string\>

Defined in: [utils.ts:17](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/utils.ts#L17)

___

### getUUIDv4

▸ `Const`**getUUIDv4**(): *string*

**Returns:** *string*

Defined in: [utils.ts:3](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/utils.ts#L3)
