[Kloak Bridge](../README.md) / [Exports](../modules.md) / AssemblyHelper

# Class: AssemblyHelper

## Table of contents

### Constructors

- [constructor](assemblyhelper.md#constructor)

### Properties

- [callback](assemblyhelper.md#callback)
- [chunks](assemblyhelper.md#chunks)
- [currentOffset](assemblyhelper.md#currentoffset)
- [currentProgress](assemblyhelper.md#currentprogress)
- [index](assemblyhelper.md#index)
- [workerInstance](assemblyhelper.md#workerinstance)

### Methods

- [append](assemblyhelper.md#append)
- [createWorker](assemblyhelper.md#createworker)
- [finish](assemblyhelper.md#finish)
- [init](assemblyhelper.md#init)
- [messageChannel](assemblyhelper.md#messagechannel)
- [next](assemblyhelper.md#next)
- [workerFn](assemblyhelper.md#workerfn)

## Constructors

### constructor

\+ **new AssemblyHelper**(`index`: [*KloakFileIndex*](../interfaces/kloakfileindex.md), `callback`: [*AssemblyCallback*](../modules.md#assemblycallback)): [*AssemblyHelper*](assemblyhelper.md)

#### Parameters:

Name | Type |
:------ | :------ |
`index` | [*KloakFileIndex*](../interfaces/kloakfileindex.md) |
`callback` | [*AssemblyCallback*](../modules.md#assemblycallback) |

**Returns:** [*AssemblyHelper*](assemblyhelper.md)

Defined in: [AssemblyHelper.ts:9](https://github.com/CoNET-project/kloak-bridge/blob/e8c6fc3/src/AssemblyHelper.ts#L9)

## Properties

### callback

• `Private` **callback**: [*AssemblyCallback*](../modules.md#assemblycallback)

Defined in: [AssemblyHelper.ts:4](https://github.com/CoNET-project/kloak-bridge/blob/e8c6fc3/src/AssemblyHelper.ts#L4)

___

### chunks

• `Private` **chunks**: *string*[]= []

Defined in: [AssemblyHelper.ts:9](https://github.com/CoNET-project/kloak-bridge/blob/e8c6fc3/src/AssemblyHelper.ts#L9)

___

### currentOffset

• `Private` **currentOffset**: *number*= 0

Defined in: [AssemblyHelper.ts:5](https://github.com/CoNET-project/kloak-bridge/blob/e8c6fc3/src/AssemblyHelper.ts#L5)

___

### currentProgress

• `Private` **currentProgress**: *number*= 0

Defined in: [AssemblyHelper.ts:6](https://github.com/CoNET-project/kloak-bridge/blob/e8c6fc3/src/AssemblyHelper.ts#L6)

___

### index

• `Private` **index**: *undefined* \| [*KloakFileIndex*](../interfaces/kloakfileindex.md)

Defined in: [AssemblyHelper.ts:7](https://github.com/CoNET-project/kloak-bridge/blob/e8c6fc3/src/AssemblyHelper.ts#L7)

___

### workerInstance

• `Private` **workerInstance**: *undefined* \| Worker

Defined in: [AssemblyHelper.ts:8](https://github.com/CoNET-project/kloak-bridge/blob/e8c6fc3/src/AssemblyHelper.ts#L8)

## Methods

### append

▸ **append**(`uuid`: *string*, `data`: *Uint8Array*, `done?`: *boolean*): *undefined* \| *void*

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |
`data` | *Uint8Array* |
`done?` | *boolean* |

**Returns:** *undefined* \| *void*

Defined in: [AssemblyHelper.ts:30](https://github.com/CoNET-project/kloak-bridge/blob/e8c6fc3/src/AssemblyHelper.ts#L30)

___

### createWorker

▸ `Private`**createWorker**(): *Promise*<Worker\>

**Returns:** *Promise*<Worker\>

Defined in: [AssemblyHelper.ts:100](https://github.com/CoNET-project/kloak-bridge/blob/e8c6fc3/src/AssemblyHelper.ts#L100)

___

### finish

▸ `Private`**finish**(): *undefined* \| *void*

**Returns:** *undefined* \| *void*

Defined in: [AssemblyHelper.ts:46](https://github.com/CoNET-project/kloak-bridge/blob/e8c6fc3/src/AssemblyHelper.ts#L46)

___

### init

▸ `Private`**init**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [AssemblyHelper.ts:16](https://github.com/CoNET-project/kloak-bridge/blob/e8c6fc3/src/AssemblyHelper.ts#L16)

___

### messageChannel

▸ `Private`**messageChannel**(`evt`: *MessageEvent*<any\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`evt` | *MessageEvent*<any\> |

**Returns:** *void*

Defined in: [AssemblyHelper.ts:86](https://github.com/CoNET-project/kloak-bridge/blob/e8c6fc3/src/AssemblyHelper.ts#L86)

___

### next

▸ `Private`**next**(): *void*

**Returns:** *void*

Defined in: [AssemblyHelper.ts:22](https://github.com/CoNET-project/kloak-bridge/blob/e8c6fc3/src/AssemblyHelper.ts#L22)

___

### workerFn

▸ `Private`**workerFn**(): *void*

**Returns:** *void*

Defined in: [AssemblyHelper.ts:53](https://github.com/CoNET-project/kloak-bridge/blob/e8c6fc3/src/AssemblyHelper.ts#L53)
