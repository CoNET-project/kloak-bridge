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

Defined in: [DisassemblyHelper.ts:30](https://github.com/CoNET-project/kloak-bridge/blob/725d1ff/src/DisassemblyHelper.ts#L30)

## Properties

### callback

• `Private` **callback**: [*DisassemblyCallback*](../modules.md#disassemblycallback)

Defined in: [DisassemblyHelper.ts:13](https://github.com/CoNET-project/kloak-bridge/blob/725d1ff/src/DisassemblyHelper.ts#L13)

___

### fileUUID

• `Private` **fileUUID**: *string*

Defined in: [DisassemblyHelper.ts:11](https://github.com/CoNET-project/kloak-bridge/blob/725d1ff/src/DisassemblyHelper.ts#L11)

___

### index

• `Private` **index**: [*KloakFileIndex*](../interfaces/kloakfileindex.md)

Defined in: [DisassemblyHelper.ts:22](https://github.com/CoNET-project/kloak-bridge/blob/725d1ff/src/DisassemblyHelper.ts#L22)

___

### metadata

• `Private` **metadata**: [*KloakFileMetadata*](../interfaces/kloakfilemetadata.md)

Defined in: [DisassemblyHelper.ts:14](https://github.com/CoNET-project/kloak-bridge/blob/725d1ff/src/DisassemblyHelper.ts#L14)

___

### options

• `Private` **options**: [*DisassemblyOptions*](../interfaces/disassemblyoptions.md)

Defined in: [DisassemblyHelper.ts:27](https://github.com/CoNET-project/kloak-bridge/blob/725d1ff/src/DisassemblyHelper.ts#L27)

___

### source

• `Private` **source**: [*DisassemblySource*](../modules.md#disassemblysource)

Defined in: [DisassemblyHelper.ts:12](https://github.com/CoNET-project/kloak-bridge/blob/725d1ff/src/DisassemblyHelper.ts#L12)

## Methods

### disassemble

▸ `Private`**disassemble**(): *Promise*<any\>

**Returns:** *Promise*<any\>

Defined in: [DisassemblyHelper.ts:88](https://github.com/CoNET-project/kloak-bridge/blob/725d1ff/src/DisassemblyHelper.ts#L88)

___

### getMetadata

▸ `Private`**getMetadata**(): *Promise*<[*KloakFileMetadata*](../interfaces/kloakfilemetadata.md)\>

**Returns:** *Promise*<[*KloakFileMetadata*](../interfaces/kloakfilemetadata.md)\>

Defined in: [DisassemblyHelper.ts:57](https://github.com/CoNET-project/kloak-bridge/blob/725d1ff/src/DisassemblyHelper.ts#L57)

___

### start

▸ `Private`**start**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [DisassemblyHelper.ts:48](https://github.com/CoNET-project/kloak-bridge/blob/725d1ff/src/DisassemblyHelper.ts#L48)
