[Kloak Bridge](../README.md) / [Exports](../modules.md) / IDBDatabaseHelper

# Class: IDBDatabaseHelper

## Table of contents

### Constructors

- [constructor](idbdatabasehelper.md#constructor)

### Properties

- [databaseName](idbdatabasehelper.md#databasename)
- [version](idbdatabasehelper.md#version)

### Methods

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

Defined in: [IDBDatabaseHelper.ts:8](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/IDBDatabaseHelper.ts#L8)

## Properties

### databaseName

• `Private` **databaseName**: *string*= 'kloak'

Defined in: [IDBDatabaseHelper.ts:7](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/IDBDatabaseHelper.ts#L7)

___

### version

• `Private` **version**: *number*= 1

Defined in: [IDBDatabaseHelper.ts:8](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/IDBDatabaseHelper.ts#L8)

## Methods

### delete

▸ **delete**(`uuid`: *string*): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<string\>

Defined in: [IDBDatabaseHelper.ts:69](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/IDBDatabaseHelper.ts#L69)

___

### getObjectStore

▸ **getObjectStore**(): *Promise*<IDBObjectStore\>

**Returns:** *Promise*<IDBObjectStore\>

Defined in: [IDBDatabaseHelper.ts:15](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/IDBDatabaseHelper.ts#L15)

___

### retrieve

▸ **retrieve**(`uuid`: *string*): *Promise*<any\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *Promise*<any\>

Defined in: [IDBDatabaseHelper.ts:51](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/IDBDatabaseHelper.ts#L51)

___

### save

▸ **save**(`uuid`: *string*, `data`: *any*): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |
`data` | *any* |

**Returns:** *Promise*<string\>

Defined in: [IDBDatabaseHelper.ts:40](https://github.com/CoNET-project/kloak-bridge/blob/3ce5978/src/IDBDatabaseHelper.ts#L40)
