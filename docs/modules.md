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
- [ConnectRequest](interfaces/connectrequest.md)
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
- [NetworkStatusListeners](interfaces/networkstatuslisteners.md)
- [PGPGenerateOptions](interfaces/pgpgenerateoptions.md)
- [PGPKeys](interfaces/pgpkeys.md)
- [PostMessageRequest](interfaces/postmessagerequest.md)
- [RequestData](interfaces/requestdata.md)
- [SeguroConnection](interfaces/seguroconnection.md)
- [WebsocketResponse](interfaces/websocketresponse.md)
- [connectImapResponse](interfaces/connectimapresponse.md)
- [connectRequest\_test](interfaces/connectrequest_test.md)
- [imapConnect](interfaces/imapconnect.md)
- [nextTimeConnect](interfaces/nexttimeconnect.md)

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
- [GenericStatus](modules.md#genericstatus)
- [GetAppDataUUID](modules.md#getappdatauuid)
- [GetDeviceKey](modules.md#getdevicekey)
- [GetSeguroKey](modules.md#getsegurokey)
- [KeyResolve](modules.md#keyresolve)
- [KeyStatus](modules.md#keystatus)
- [LockContainerResolve](modules.md#lockcontainerresolve)
- [LockContainerStatus](modules.md#lockcontainerstatus)
- [NetworkPostStatus](modules.md#networkpoststatus)
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

Defined in: [define.ts:166](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L166)

___

### ChangeKeyContainerResolve

Ƭ **ChangeKeyContainerResolve**: [status: ChangeKeyContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:180](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L180)

___

### ChangeKeyContainerStatus

Ƭ **ChangeKeyContainerStatus**: *SUCCESS* \| *FAILURE* \| *NO_PASSPHRASE*

Defined in: [define.ts:178](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L178)

___

### CheckContainerResolve

Ƭ **CheckContainerResolve**: [status: CheckContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:192](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L192)

___

### CheckContainerStatus

Ƭ **CheckContainerStatus**: *EXISTS* \| *DOES_NOT_EXIST*

Defined in: [define.ts:190](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L190)

___

### CreateContainerResolve

Ƭ **CreateContainerResolve**: [status: CreateContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:184](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L184)

___

### CreateContainerStatus

Ƭ **CreateContainerStatus**: *SUCCESS* \| *FAILURE* \| *INVALID_PASSPHRASE*

Defined in: [define.ts:182](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L182)

___

### DecryptResolve

Ƭ **DecryptResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string \| Buffer]

Defined in: [define.ts:200](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L200)

___

### DeleteKeychainResolve

Ƭ **DeleteKeychainResolve**: [status: DeleteKeychainStatus]

Defined in: [define.ts:176](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L176)

___

### DeleteKeychainStatus

Ƭ **DeleteKeychainStatus**: *SUCCESS* \| *FAILURE*

Defined in: [define.ts:174](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L174)

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

Defined in: [define.ts:159](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L159)

___

### DisassemblySource

Ƭ **DisassemblySource**: File \| Blob

Defined in: [define.ts:130](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L130)

___

### EncryptResolve

Ƭ **EncryptResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string]

Defined in: [define.ts:198](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L198)

___

### EncryptSaveResolve

Ƭ **EncryptSaveResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string]

Defined in: [define.ts:202](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L202)

___

### GenericStatus

Ƭ **GenericStatus**: [status: "SUCCESS" \| "FAILURE"]

Defined in: [define.ts:212](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L212)

___

### GetAppDataUUID

Ƭ **GetAppDataUUID**: [status: "SUCCESS" \| "DOES\_NOT\_EXIST" \| "FAILURE" \| "NO\_KEY\_CONTAINER", appData?: object]

Defined in: [define.ts:210](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L210)

___

### GetDeviceKey

Ƭ **GetDeviceKey**: [status: "NO\_DEVICE\_KEY" \| "SUCCESS" \| "FAILURE" \| "NO\_KEY\_CONTAINER", deviceKey?: PGPKeys]

Defined in: [define.ts:206](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L206)

___

### GetSeguroKey

Ƭ **GetSeguroKey**: [status: "NO\_KLOAK\_KEY" \| "SUCCESS" \| "FAILURE" \| "NO\_KEY\_CONTAINER", seguroKey?: PGPKeys]

Defined in: [define.ts:208](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L208)

___

### KeyResolve

Ƭ **KeyResolve**: [status: KeyStatus, payload?: PGPKeys]

Defined in: [define.ts:170](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L170)

___

### KeyStatus

Ƭ **KeyStatus**: *SUCCESS* \| *FAILURE* \| *INVALID_PASSPHRASE*

Defined in: [define.ts:168](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L168)

___

### LockContainerResolve

Ƭ **LockContainerResolve**: [status: LockContainerStatus]

Defined in: [define.ts:196](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L196)

___

### LockContainerStatus

Ƭ **LockContainerStatus**: *SUCCESS* \| *FAILURE*

Defined in: [define.ts:194](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L194)

___

### NetworkPostStatus

Ƭ **NetworkPostStatus**: [status: "SUCCESS" \| "NETWORK\_NOT\_AVAILABLE" \| "NOT\_CONNECTED" \| "FAILURE"]

Defined in: [define.ts:214](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L214)

___

### RetrieveDecryptResolve

Ƭ **RetrieveDecryptResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string]

Defined in: [define.ts:204](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L204)

___

### UnlockContainerResolve

Ƭ **UnlockContainerResolve**: [status: UnlockContainerStatus]

Defined in: [define.ts:188](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L188)

___

### UnlockContainerStatus

Ƭ **UnlockContainerStatus**: *SUCCESS* \| *ALREADY_UNLOCKED* \| *FAILURE* \| *INVALID_PASSPHRASE* \| *MISSING_KEYCHAIN* \| *MISSING_CONTAINER*

Defined in: [define.ts:186](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L186)

___

### UnlockKeyResolve

Ƭ **UnlockKeyResolve**: [status: KeyStatus, payload?: EncryptHelper]

Defined in: [define.ts:172](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/define.ts#L172)

## Functions

### createRandomValues

▸ `Const`**createRandomValues**(): *Promise*<string\>

**Returns:** *Promise*<string\>

Defined in: [utils.ts:17](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/utils.ts#L17)

___

### getUUIDv4

▸ `Const`**getUUIDv4**(): *string*

**Returns:** *string*

Defined in: [utils.ts:3](https://github.com/CoNET-project/kloak-bridge/blob/94a2fac/src/utils.ts#L3)
