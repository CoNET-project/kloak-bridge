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

- [AppKeys](interfaces/appkeys.md)
- [ApplicationKeys](interfaces/applicationkeys.md)
- [ContainerNetwork](interfaces/containernetwork.md)
- [DisassemblyOptions](interfaces/disassemblyoptions.md)
- [DisassemblyProgress](interfaces/disassemblyprogress.md)
- [IMAPAccount](interfaces/imapaccount.md)
- [KeyChain](interfaces/keychain.md)
- [KeyChainContainer](interfaces/keychaincontainer.md)
- [KloakFileIndex](interfaces/kloakfileindex.md)
- [KloakFileMetadata](interfaces/kloakfilemetadata.md)
- [MessengerKey](interfaces/messengerkey.md)
- [MessengerKeys](interfaces/messengerkeys.md)
- [PGPGenerateOptions](interfaces/pgpgenerateoptions.md)
- [PGPKeys](interfaces/pgpkeys.md)
- [connectRequest](interfaces/connectrequest.md)
- [connectRequest\_test](interfaces/connectrequest_test.md)
- [connect\_imap\_reqponse](interfaces/connect_imap_reqponse.md)
- [imapConnect](interfaces/imapconnect.md)
- [next\_time\_connect](interfaces/next_time_connect.md)

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
- [GetAppDataUUID](modules.md#getappdatauuid)
- [GetDeviceKey](modules.md#getdevicekey)
- [GetKloakKey](modules.md#getkloakkey)
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

Defined in: [define.ts:161](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L161)

___

### ChangeKeyContainerResolve

Ƭ **ChangeKeyContainerResolve**: [status: ChangeKeyContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:175](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L175)

___

### ChangeKeyContainerStatus

Ƭ **ChangeKeyContainerStatus**: *SUCCESS* \| *FAILURE* \| *NO_PASSPHRASE*

Defined in: [define.ts:173](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L173)

___

### CheckContainerResolve

Ƭ **CheckContainerResolve**: [status: CheckContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:187](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L187)

___

### CheckContainerStatus

Ƭ **CheckContainerStatus**: *EXISTS* \| *DOES_NOT_EXIST*

Defined in: [define.ts:185](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L185)

___

### CreateContainerResolve

Ƭ **CreateContainerResolve**: [status: CreateContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:179](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L179)

___

### CreateContainerStatus

Ƭ **CreateContainerStatus**: *SUCCESS* \| *FAILURE* \| *INVALID_PASSPHRASE*

Defined in: [define.ts:177](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L177)

___

### DecryptResolve

Ƭ **DecryptResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string \| Buffer]

Defined in: [define.ts:195](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L195)

___

### DeleteKeychainResolve

Ƭ **DeleteKeychainResolve**: [status: DeleteKeychainStatus]

Defined in: [define.ts:171](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L171)

___

### DeleteKeychainStatus

Ƭ **DeleteKeychainStatus**: *SUCCESS* \| *FAILURE*

Defined in: [define.ts:169](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L169)

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

Defined in: [define.ts:154](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L154)

___

### DisassemblySource

Ƭ **DisassemblySource**: File \| Blob

Defined in: [define.ts:125](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L125)

___

### EncryptResolve

Ƭ **EncryptResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string]

Defined in: [define.ts:193](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L193)

___

### EncryptSaveResolve

Ƭ **EncryptSaveResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string]

Defined in: [define.ts:197](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L197)

___

### GetAppDataUUID

Ƭ **GetAppDataUUID**: [status: "SUCCESS" \| "DOES\_NOT\_EXIST" \| "FAILURE" \| "NO\_KEY\_CONTAINER", appData?: object]

Defined in: [define.ts:205](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L205)

___

### GetDeviceKey

Ƭ **GetDeviceKey**: [status: "NO\_DEVICE\_KEY" \| "SUCCESS" \| "FAILURE" \| "NO\_KEY\_CONTAINER", deviceKey?: PGPKeys]

Defined in: [define.ts:201](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L201)

___

### GetKloakKey

Ƭ **GetKloakKey**: [status: "NO\_KLOAK\_KEY" \| "SUCCESS" \| "FAILURE" \| "NO\_KEY\_CONTAINER", kloakKey?: PGPKeys]

Defined in: [define.ts:203](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L203)

___

### KeyResolve

Ƭ **KeyResolve**: [status: KeyStatus, payload?: PGPKeys]

Defined in: [define.ts:165](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L165)

___

### KeyStatus

Ƭ **KeyStatus**: *SUCCESS* \| *FAILURE* \| *INVALID_PASSPHRASE*

Defined in: [define.ts:163](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L163)

___

### LockContainerResolve

Ƭ **LockContainerResolve**: [status: LockContainerStatus]

Defined in: [define.ts:191](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L191)

___

### LockContainerStatus

Ƭ **LockContainerStatus**: *SUCCESS* \| *FAILURE*

Defined in: [define.ts:189](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L189)

___

### RetrieveDecryptResolve

Ƭ **RetrieveDecryptResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string]

Defined in: [define.ts:199](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L199)

___

### UnlockContainerResolve

Ƭ **UnlockContainerResolve**: [status: UnlockContainerStatus]

Defined in: [define.ts:183](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L183)

___

### UnlockContainerStatus

Ƭ **UnlockContainerStatus**: *SUCCESS* \| *ALREADY_UNLOCKED* \| *FAILURE* \| *INVALID_PASSPHRASE* \| *MISSING_KEYCHAIN* \| *MISSING_CONTAINER*

Defined in: [define.ts:181](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L181)

___

### UnlockKeyResolve

Ƭ **UnlockKeyResolve**: [status: KeyStatus, payload?: EncryptHelper]

Defined in: [define.ts:167](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/define.ts#L167)

## Functions

### createRandomValues

▸ `Const`**createRandomValues**(): *Promise*<string\>

**Returns:** *Promise*<string\>

Defined in: [utils.ts:17](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/utils.ts#L17)

___

### getUUIDv4

▸ `Const`**getUUIDv4**(): *string*

**Returns:** *string*

Defined in: [utils.ts:3](https://github.com/CoNET-project/kloak-bridge/blob/fcc364f/src/utils.ts#L3)
