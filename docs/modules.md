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
- [BridgeResolveStatus](modules.md#bridgeresolvestatus)
- [BridgeResolves](modules.md#bridgeresolves)
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

Defined in: [define.ts:84](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/define.ts#L84)

___

### BridgeResolveStatus

Ƭ **BridgeResolveStatus**: *NO_CONTAINER* \| *INVALID_PASSWORD* \| *SUCCESS*

Defined in: [define.ts:3](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/define.ts#L3)

___

### BridgeResolves

Ƭ **BridgeResolves**: [status: BridgeResolveStatus, payload?: any]

Defined in: [define.ts:5](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/define.ts#L5)

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

Defined in: [define.ts:77](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/define.ts#L77)

___

### DisassemblySource

Ƭ **DisassemblySource**: File \| Blob

Defined in: [define.ts:48](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/define.ts#L48)

___

### KeyPairType

Ƭ **KeyPairType**: *device* \| *kloak* \| *storage* \| *messenger* \| *application*

Defined in: [define.ts:86](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/define.ts#L86)

## Functions

### createRandomValues

▸ `Const`**createRandomValues**(): *Promise*<string\>

**Returns:** *Promise*<string\>

Defined in: [utils.ts:17](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/utils.ts#L17)

___

### getUUIDv4

▸ `Const`**getUUIDv4**(): *string*

**Returns:** *string*

Defined in: [utils.ts:3](https://github.com/CoNET-project/kloak-bridge/blob/37276fa/src/utils.ts#L3)
