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
- [DecryptResolve](modules.md#decryptresolve)
- [DeleteKeychainResolve](modules.md#deletekeychainresolve)
- [DeleteKeychainStatus](modules.md#deletekeychainstatus)
- [DisassemblyCallback](modules.md#disassemblycallback)
- [DisassemblySource](modules.md#disassemblysource)
- [EncryptResolve](modules.md#encryptresolve)
- [EncryptSaveResolve](modules.md#encryptsaveresolve)
- [KeyPairType](modules.md#keypairtype)
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

Defined in: [define.ts:83](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L83)

___

### ChangeKeyContainerResolve

Ƭ **ChangeKeyContainerResolve**: [status: ChangeKeyContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:99](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L99)

___

### ChangeKeyContainerStatus

Ƭ **ChangeKeyContainerStatus**: *SUCCESS* \| *FAILURE* \| *NO_PASSPHRASE*

Defined in: [define.ts:97](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L97)

___

### CheckContainerResolve

Ƭ **CheckContainerResolve**: [status: CheckContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:111](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L111)

___

### CheckContainerStatus

Ƭ **CheckContainerStatus**: *EXISTS* \| *DOES_NOT_EXIST*

Defined in: [define.ts:109](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L109)

___

### CreateContainerResolve

Ƭ **CreateContainerResolve**: [status: CreateContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:103](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L103)

___

### CreateContainerStatus

Ƭ **CreateContainerStatus**: *SUCCESS* \| *FAILURE* \| *INVALID_PASSPHRASE*

Defined in: [define.ts:101](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L101)

___

### DecryptResolve

Ƭ **DecryptResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string \| Buffer]

Defined in: [define.ts:119](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L119)

___

### DeleteKeychainResolve

Ƭ **DeleteKeychainResolve**: [status: DeleteKeychainStatus]

Defined in: [define.ts:95](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L95)

___

### DeleteKeychainStatus

Ƭ **DeleteKeychainStatus**: *SUCCESS* \| *FAILURE*

Defined in: [define.ts:93](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L93)

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

Defined in: [define.ts:76](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L76)

___

### DisassemblySource

Ƭ **DisassemblySource**: File \| Blob

Defined in: [define.ts:47](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L47)

___

### EncryptResolve

Ƭ **EncryptResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string]

Defined in: [define.ts:117](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L117)

___

### EncryptSaveResolve

Ƭ **EncryptSaveResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string]

Defined in: [define.ts:121](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L121)

___

### KeyPairType

Ƭ **KeyPairType**: *device* \| *kloak* \| *storage* \| *messenger* \| *application*

Defined in: [define.ts:85](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L85)

___

### KeyResolve

Ƭ **KeyResolve**: [status: KeyStatus, payload?: PGPKeys]

Defined in: [define.ts:89](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L89)

___

### KeyStatus

Ƭ **KeyStatus**: *SUCCESS* \| *FAILURE* \| *INVALID_PASSPHRASE*

Defined in: [define.ts:87](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L87)

___

### LockContainerResolve

Ƭ **LockContainerResolve**: [status: LockContainerStatus]

Defined in: [define.ts:115](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L115)

___

### LockContainerStatus

Ƭ **LockContainerStatus**: *SUCCESS* \| *FAILURE*

Defined in: [define.ts:113](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L113)

___

### RetrieveDecryptResolve

Ƭ **RetrieveDecryptResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string]

Defined in: [define.ts:123](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L123)

___

### UnlockContainerResolve

Ƭ **UnlockContainerResolve**: [status: UnlockContainerStatus]

Defined in: [define.ts:107](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L107)

___

### UnlockContainerStatus

Ƭ **UnlockContainerStatus**: *SUCCESS* \| *FAILURE* \| *INVALID_PASSPHRASE* \| *MISSING_KEYCHAIN* \| *MISSING_CONTAINER*

Defined in: [define.ts:105](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L105)

___

### UnlockKeyResolve

Ƭ **UnlockKeyResolve**: [status: KeyStatus, payload?: EncryptHelper]

Defined in: [define.ts:91](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/define.ts#L91)

## Functions

### createRandomValues

▸ `Const`**createRandomValues**(): *Promise*<string\>

**Returns:** *Promise*<string\>

Defined in: [utils.ts:17](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/utils.ts#L17)

___

### getUUIDv4

▸ `Const`**getUUIDv4**(): *string*

**Returns:** *string*

Defined in: [utils.ts:3](https://github.com/CoNET-project/kloak-bridge/blob/3ef3646/src/utils.ts#L3)
