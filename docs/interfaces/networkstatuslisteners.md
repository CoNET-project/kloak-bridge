[Kloak Bridge](../README.md) / [Exports](../modules.md) / NetworkStatusListeners

# Interface: NetworkStatusListeners

## Table of contents

### Properties

- [onConnected](networkstatuslisteners.md#onconnected)
- [onConnecting](networkstatuslisteners.md#onconnecting)
- [onConnectionFail](networkstatuslisteners.md#onconnectionfail)
- [onDisconnected](networkstatuslisteners.md#ondisconnected)
- [onMessage](networkstatuslisteners.md#onmessage)

## Properties

### onConnected

• **onConnected**: () => *void*

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [define.ts:237](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L237)

Defined in: [define.ts:237](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L237)

___

### onConnecting

• **onConnecting**: () => *void*

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [define.ts:236](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L236)

Defined in: [define.ts:236](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L236)

___

### onConnectionFail

• **onConnectionFail**: (`error?`: *IMAP_UNAVAILABLE* \| *CONNECTION_UNAVAILABLE*) => *void*

#### Type declaration:

▸ (`error?`: *IMAP_UNAVAILABLE* \| *CONNECTION_UNAVAILABLE*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error?` | *IMAP_UNAVAILABLE* \| *CONNECTION_UNAVAILABLE* |

**Returns:** *void*

Defined in: [define.ts:238](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L238)

Defined in: [define.ts:238](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L238)

___

### onDisconnected

• **onDisconnected**: () => *void*

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [define.ts:239](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L239)

Defined in: [define.ts:239](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L239)

___

### onMessage

• **onMessage**: (`appId`: *string*, `message`: *string*, `cacheData`: (`appId`: *string*, `message`: *string*) => *Promise*<void\>) => *void*

#### Type declaration:

▸ (`appId`: *string*, `message`: *string*, `cacheData`: (`appId`: *string*, `message`: *string*) => *Promise*<void\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`appId` | *string* |
`message` | *string* |
`cacheData` | (`appId`: *string*, `message`: *string*) => *Promise*<void\> |

**Returns:** *void*

Defined in: [define.ts:240](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L240)

Defined in: [define.ts:240](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L240)
