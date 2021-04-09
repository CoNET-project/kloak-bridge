[Kloak Bridge](../README.md) / [Exports](../modules.md) / DisassemblyHelper

# Class: DisassemblyHelper

## Table of contents

### Constructors

- [constructor](disassemblyhelper.md#constructor)

### Properties

- [callback](disassemblyhelper.md#callback)
- [fileUUID](disassemblyhelper.md#fileuuid)
- [index](disassemblyhelper.md#index)
- [metadata](disassemblyhelper.md#metadata)
- [options](disassemblyhelper.md#options)
- [source](disassemblyhelper.md#source)

### Methods

- [disassemble](disassemblyhelper.md#disassemble)
- [getMetadata](disassemblyhelper.md#getmetadata)
- [start](disassemblyhelper.md#start)

## Constructors

### constructor

\+ **new DisassemblyHelper**(`source`: [*DisassemblySource*](../modules.md#disassemblysource), `callback`: [*DisassemblyCallback*](../modules.md#disassemblycallback), `options?`: [*DisassemblyOptions*](../interfaces/disassemblyoptions.md)): [*DisassemblyHelper*](disassemblyhelper.md)

#### Parameters:

Name | Type |
:------ | :------ |
`source` | [*DisassemblySource*](../modules.md#disassemblysource) |
`callback` | [*DisassemblyCallback*](../modules.md#disassemblycallback) |
`options?` | [*DisassemblyOptions*](../interfaces/disassemblyoptions.md) |

**Returns:** [*DisassemblyHelper*](disassemblyhelper.md)

Defined in: [DisassemblyHelper.ts:32](https://github.com/CoNET-project/kloak-bridge/blob/8b4497c/src/DisassemblyHelper.ts#L32)

## Properties

### callback

• `Private` **callback**: [*DisassemblyCallback*](../modules.md#disassemblycallback)

Defined in: [DisassemblyHelper.ts:15](https://github.com/CoNET-project/kloak-bridge/blob/8b4497c/src/DisassemblyHelper.ts#L15)

___

### fileUUID

• `Private` **fileUUID**: *string*

Defined in: [DisassemblyHelper.ts:13](https://github.com/CoNET-project/kloak-bridge/blob/8b4497c/src/DisassemblyHelper.ts#L13)

___

### index

• `Private` **index**: [*KloakFileIndex*](../interfaces/kloakfileindex.md)

Defined in: [DisassemblyHelper.ts:24](https://github.com/CoNET-project/kloak-bridge/blob/8b4497c/src/DisassemblyHelper.ts#L24)

___

### metadata

• `Private` **metadata**: [*KloakFileMetadata*](../interfaces/kloakfilemetadata.md)

Defined in: [DisassemblyHelper.ts:16](https://github.com/CoNET-project/kloak-bridge/blob/8b4497c/src/DisassemblyHelper.ts#L16)

___

### options

• `Private` **options**: [*DisassemblyOptions*](../interfaces/disassemblyoptions.md)

Defined in: [DisassemblyHelper.ts:29](https://github.com/CoNET-project/kloak-bridge/blob/8b4497c/src/DisassemblyHelper.ts#L29)

___

### source

• `Private` **source**: [*DisassemblySource*](../modules.md#disassemblysource)

Defined in: [DisassemblyHelper.ts:14](https://github.com/CoNET-project/kloak-bridge/blob/8b4497c/src/DisassemblyHelper.ts#L14)

## Methods

### disassemble

▸ `Private`**disassemble**(): *Promise*<any\>

**Returns:** *Promise*<any\>

Defined in: [DisassemblyHelper.ts:90](https://github.com/CoNET-project/kloak-bridge/blob/8b4497c/src/DisassemblyHelper.ts#L90)

___

### getMetadata

▸ `Private`**getMetadata**(): *Promise*<[*KloakFileMetadata*](../interfaces/kloakfilemetadata.md)\>

**Returns:** *Promise*<[*KloakFileMetadata*](../interfaces/kloakfilemetadata.md)\>

Defined in: [DisassemblyHelper.ts:59](https://github.com/CoNET-project/kloak-bridge/blob/8b4497c/src/DisassemblyHelper.ts#L59)

___

### start

▸ `Private`**start**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [DisassemblyHelper.ts:50](https://github.com/CoNET-project/kloak-bridge/blob/8b4497c/src/DisassemblyHelper.ts#L50)
