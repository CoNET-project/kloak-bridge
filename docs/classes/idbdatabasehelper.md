[Kloak Bridge](../README.md) / [Exports](../modules.md) / IDBDatabaseHelper

# Class: IDBDatabaseHelper

## Table of contents

### Constructors

- [constructor](idbdatabasehelper.md#constructor)

### Properties

- [databaseName](idbdatabasehelper.md#databasename)
- [version](idbdatabasehelper.md#version)

### Methods

- [clearObjectStore](idbdatabasehelper.md#clearobjectstore)
- [delete](idbdatabasehelper.md#delete)
- [getObjectStore](idbdatabasehelper.md#getobjectstore)
- [retrieve](idbdatabasehelper.md#retrieve)
- [save](idbdatabasehelper.md#save)

## Constructors

### constructor

\+ **new IDBDatabaseHelper**(`databaseName?`: *string*, `version?`: *number*): [*IDBDatabaseHelper*](idbdatabasehelper.md)

#### Parameters:

Name | Type |
:------ | :------ |
`databaseName?` | *string* |
`version?` | *number* |

**Returns:** [*IDBDatabaseHelper*](idbdatabasehelper.md)

Defined in: [IDBDatabaseHelper.ts:8](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/IDBDatabaseHelper.ts#L8)

## Properties

### databaseName

• `Private` **databaseName**: *string*= 'kloak'

Defined in: [IDBDatabaseHelper.ts:7](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/IDBDatabaseHelper.ts#L7)

___

### version

• `Private` **version**: *number*= 1

Defined in: [IDBDatabaseHelper.ts:8](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/IDBDatabaseHelper.ts#L8)

## Methods

### clearObjectStore

▸ **clearObjectStore**(): *Promise*<boolean\>

**Returns:** *Promise*<boolean\>

Defined in: [IDBDatabaseHelper.ts:40](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/IDBDatabaseHelper.ts#L40)

___

### delete

▸ **delete**(`uuid`: *string*): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<string\>

Defined in: [IDBDatabaseHelper.ts:87](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/IDBDatabaseHelper.ts#L87)

___

### getObjectStore

▸ **getObjectStore**(): *Promise*<[tx: IDBTransaction, objectStore: IDBObjectStore]\>

**Returns:** *Promise*<[tx: IDBTransaction, objectStore: IDBObjectStore]\>

Defined in: [IDBDatabaseHelper.ts:15](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/IDBDatabaseHelper.ts#L15)

___

### retrieve

▸ **retrieve**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [IDBDatabaseHelper.ts:67](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/IDBDatabaseHelper.ts#L67)

___

### save

▸ **save**(`uuid`: *string*, `data`: *any*): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |
`data` | *any* |

**Returns:** *Promise*<string\>

Defined in: [IDBDatabaseHelper.ts:54](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/IDBDatabaseHelper.ts#L54)
