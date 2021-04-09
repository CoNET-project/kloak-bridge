[@conet-project/kloak-bridge](README.md) / Exports

# @conet-project/kloak-bridge

## Table of contents

### Classes

- [AssemblyHelper](classes/assemblyhelper.md)
- [DisassemblyHelper](classes/disassemblyhelper.md)
- [EncryptHelper](classes/encrypthelper.md)
- [IDBDatabaseHelper](classes/idbdatabasehelper.md)
- [KeyContainer](classes/keycontainer.md)
- [StorageHelper](classes/storagehelper.md)

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
- [DisassemblyCallback](modules.md#disassemblycallback)
- [DisassemblySource](modules.md#disassemblysource)
- [KeyPairType](modules.md#keypairtype)

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

Defined in: [define.ts:80](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/define.ts#L80)

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

Defined in: [define.ts:73](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/define.ts#L73)

___

### DisassemblySource

Ƭ **DisassemblySource**: File \| Blob

Defined in: [define.ts:44](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/define.ts#L44)

___

### KeyPairType

Ƭ **KeyPairType**: *device* \| *kloak* \| *storage* \| *messenger* \| *application*

Defined in: [define.ts:82](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/define.ts#L82)

## Functions

### createRandomValues

▸ `Const`**createRandomValues**(): *Promise*<string\>

**Returns:** *Promise*<string\>

Defined in: [utils.ts:17](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/utils.ts#L17)

___

### getUUIDv4

▸ `Const`**getUUIDv4**(): *string*

**Returns:** *string*

Defined in: [utils.ts:3](https://github.com/CoNET-project/kloak-bridge/blob/24232a1/src/utils.ts#L3)
