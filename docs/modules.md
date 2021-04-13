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
- [DeleteKeychainResolve](modules.md#deletekeychainresolve)
- [DeleteKeychainStatus](modules.md#deletekeychainstatus)
- [DisassemblyCallback](modules.md#disassemblycallback)
- [DisassemblySource](modules.md#disassemblysource)
- [KeyPairType](modules.md#keypairtype)
- [KeyResolve](modules.md#keyresolve)
- [KeyStatus](modules.md#keystatus)
- [LockContainerResolve](modules.md#lockcontainerresolve)
- [LockContainerStatus](modules.md#lockcontainerstatus)
- [UnlockContainerResolve](modules.md#unlockcontainerresolve)
- [UnlockContainerStatus](modules.md#unlockcontainerstatus)

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

Defined in: [define.ts:80](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L80)

___

### ChangeKeyContainerResolve

Ƭ **ChangeKeyContainerResolve**: [status: ChangeKeyContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:94](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L94)

___

### ChangeKeyContainerStatus

Ƭ **ChangeKeyContainerStatus**: *SUCCESS* \| *FAILURE* \| *NO_PASSPHRASE*

Defined in: [define.ts:92](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L92)

___

### CheckContainerResolve

Ƭ **CheckContainerResolve**: [status: CheckContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:106](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L106)

___

### CheckContainerStatus

Ƭ **CheckContainerStatus**: *EXISTS* \| *DOES_NOT_EXIST*

Defined in: [define.ts:104](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L104)

___

### CreateContainerResolve

Ƭ **CreateContainerResolve**: [status: CreateContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:98](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L98)

___

### CreateContainerStatus

Ƭ **CreateContainerStatus**: *SUCCESS* \| *FAILURE* \| *INVALID_PASSPHRASE*

Defined in: [define.ts:96](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L96)

___

### DeleteKeychainResolve

Ƭ **DeleteKeychainResolve**: [status: DeleteKeychainStatus]

Defined in: [define.ts:90](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L90)

___

### DeleteKeychainStatus

Ƭ **DeleteKeychainStatus**: *SUCCESS* \| *FAILURE*

Defined in: [define.ts:88](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L88)

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

Defined in: [define.ts:73](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L73)

___

### DisassemblySource

Ƭ **DisassemblySource**: File \| Blob

Defined in: [define.ts:44](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L44)

___

### KeyPairType

Ƭ **KeyPairType**: *device* \| *kloak* \| *storage* \| *messenger* \| *application*

Defined in: [define.ts:82](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L82)

___

### KeyResolve

Ƭ **KeyResolve**: [status: KeyStatus, payload?: PGPKeys]

Defined in: [define.ts:86](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L86)

___

### KeyStatus

Ƭ **KeyStatus**: *SUCCESS* \| *FAILURE* \| *INVALID_PASSPHRASE*

Defined in: [define.ts:84](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L84)

___

### LockContainerResolve

Ƭ **LockContainerResolve**: [status: LockContainerStatus]

Defined in: [define.ts:110](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L110)

___

### LockContainerStatus

Ƭ **LockContainerStatus**: *SUCCESS* \| *FAILURE*

Defined in: [define.ts:108](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L108)

___

### UnlockContainerResolve

Ƭ **UnlockContainerResolve**: [status: UnlockContainerStatus]

Defined in: [define.ts:102](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L102)

___

### UnlockContainerStatus

Ƭ **UnlockContainerStatus**: *SUCCESS* \| *FAILURE* \| *INVALID_PASSPHRASE* \| *MISSING_CONTAINER*

Defined in: [define.ts:100](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/define.ts#L100)

## Functions

### createRandomValues

▸ `Const`**createRandomValues**(): *Promise*<string\>

**Returns:** *Promise*<string\>

Defined in: [utils.ts:17](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/utils.ts#L17)

___

### getUUIDv4

▸ `Const`**getUUIDv4**(): *string*

**Returns:** *string*

Defined in: [utils.ts:3](https://github.com/CoNET-project/kloak-bridge/blob/fd9d775/src/utils.ts#L3)
