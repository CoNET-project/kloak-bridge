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
- [AppMessage](interfaces/appmessage.md)
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
- [MessagesCache](interfaces/messagescache.md)
- [MessengerKey](interfaces/messengerkey.md)
- [MessengerKeys](interfaces/messengerkeys.md)
- [NetworkInformation](interfaces/networkinformation.md)
- [NetworkStatusListeners](interfaces/networkstatuslisteners.md)
- [NextTimeConnect](interfaces/nexttimeconnect.md)
- [PGPGenerateOptions](interfaces/pgpgenerateoptions.md)
- [PGPKeys](interfaces/pgpkeys.md)
- [PostMessageRequest](interfaces/postmessagerequest.md)
- [RequestData](interfaces/requestdata.md)
- [SeguroConnection](interfaces/seguroconnection.md)
- [TestNetworkResponse](interfaces/testnetworkresponse.md)
- [WebsocketResponse](interfaces/websocketresponse.md)
- [connectImapResponse](interfaces/connectimapresponse.md)
- [connectRequest\_test](interfaces/connectrequest_test.md)
- [imapConnect](interfaces/imapconnect.md)

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
- [TestNetworkResponses](modules.md#testnetworkresponses)
- [UnlockContainerResolve](modules.md#unlockcontainerresolve)
- [UnlockContainerStatus](modules.md#unlockcontainerstatus)
- [UnlockKeyResolve](modules.md#unlockkeyresolve)

### Functions

- [createRandomValues](modules.md#createrandomvalues)
- [getUUIDv4](modules.md#getuuidv4)

## Type aliases

### AssemblyCallback

?? **AssemblyCallback**: (`error`: *any*, `progress`: *number*, `nextChunk?`: *string*, `data?`: ArrayBuffer) => *void*

#### Type declaration:

??? (`error`: *any*, `progress`: *number*, `nextChunk?`: *string*, `data?`: ArrayBuffer): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | *any* |
`progress` | *number* |
`nextChunk?` | *string* |
`data?` | ArrayBuffer |

**Returns:** *void*

Defined in: [define.ts:176](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L176)

___

### ChangeKeyContainerResolve

?? **ChangeKeyContainerResolve**: [status: ChangeKeyContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:190](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L190)

___

### ChangeKeyContainerStatus

?? **ChangeKeyContainerStatus**: *SUCCESS* \| *FAILURE* \| *NO_PASSPHRASE*

Defined in: [define.ts:188](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L188)

___

### CheckContainerResolve

?? **CheckContainerResolve**: [status: CheckContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:202](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L202)

___

### CheckContainerStatus

?? **CheckContainerStatus**: *EXISTS* \| *DOES_NOT_EXIST*

Defined in: [define.ts:200](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L200)

___

### CreateContainerResolve

?? **CreateContainerResolve**: [status: CreateContainerStatus, payload?: KeyChainContainer]

Defined in: [define.ts:194](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L194)

___

### CreateContainerStatus

?? **CreateContainerStatus**: *SUCCESS* \| *FAILURE* \| *INVALID_PASSPHRASE*

Defined in: [define.ts:192](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L192)

___

### DecryptResolve

?? **DecryptResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string \| Buffer]

Defined in: [define.ts:210](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L210)

___

### DeleteKeychainResolve

?? **DeleteKeychainResolve**: [status: DeleteKeychainStatus]

Defined in: [define.ts:186](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L186)

___

### DeleteKeychainStatus

?? **DeleteKeychainStatus**: *SUCCESS* \| *FAILURE*

Defined in: [define.ts:184](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L184)

___

### DisassemblyCallback

?? **DisassemblyCallback**: (`error`: *any*, `current`: [*DisassemblyProgress*](interfaces/disassemblyprogress.md), `next?`: () => *void*) => *void*

#### Type declaration:

??? (`error`: *any*, `current`: [*DisassemblyProgress*](interfaces/disassemblyprogress.md), `next?`: () => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`error` | *any* |
`current` | [*DisassemblyProgress*](interfaces/disassemblyprogress.md) |
`next?` | () => *void* |

**Returns:** *void*

Defined in: [define.ts:169](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L169)

___

### DisassemblySource

?? **DisassemblySource**: File \| Blob

Defined in: [define.ts:140](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L140)

___

### EncryptResolve

?? **EncryptResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string]

Defined in: [define.ts:208](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L208)

___

### EncryptSaveResolve

?? **EncryptSaveResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string]

Defined in: [define.ts:212](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L212)

___

### GenericStatus

?? **GenericStatus**: [status: "SUCCESS" \| "FAILURE"]

Defined in: [define.ts:222](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L222)

___

### GetAppDataUUID

?? **GetAppDataUUID**: [status: "SUCCESS" \| "DOES\_NOT\_EXIST" \| "FAILURE" \| "NO\_KEY\_CONTAINER", appData?: object]

Defined in: [define.ts:220](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L220)

___

### GetDeviceKey

?? **GetDeviceKey**: [status: "NO\_DEVICE\_KEY" \| "SUCCESS" \| "FAILURE" \| "NO\_KEY\_CONTAINER", deviceKey?: PGPKeys]

Defined in: [define.ts:216](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L216)

___

### GetSeguroKey

?? **GetSeguroKey**: [status: "NO\_KLOAK\_KEY" \| "SUCCESS" \| "FAILURE" \| "NO\_KEY\_CONTAINER", seguroKey?: PGPKeys]

Defined in: [define.ts:218](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L218)

___

### KeyResolve

?? **KeyResolve**: [status: KeyStatus, payload?: PGPKeys]

Defined in: [define.ts:180](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L180)

___

### KeyStatus

?? **KeyStatus**: *SUCCESS* \| *FAILURE* \| *INVALID_PASSPHRASE*

Defined in: [define.ts:178](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L178)

___

### LockContainerResolve

?? **LockContainerResolve**: [status: LockContainerStatus]

Defined in: [define.ts:206](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L206)

___

### LockContainerStatus

?? **LockContainerStatus**: *SUCCESS* \| *FAILURE*

Defined in: [define.ts:204](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L204)

___

### NetworkPostStatus

?? **NetworkPostStatus**: [status: "SUCCESS" \| "NETWORK\_NOT\_AVAILABLE" \| "NOT\_CONNECTED" \| "FAILURE"]

Defined in: [define.ts:224](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L224)

___

### RetrieveDecryptResolve

?? **RetrieveDecryptResolve**: [status: "SUCCESS" \| "FAILURE", payload?: string]

Defined in: [define.ts:214](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L214)

___

### TestNetworkResponses

?? **TestNetworkResponses**: [*TestNetworkResponse*](interfaces/testnetworkresponse.md)[]

Defined in: [define.ts:249](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L249)

___

### UnlockContainerResolve

?? **UnlockContainerResolve**: [status: UnlockContainerStatus]

Defined in: [define.ts:198](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L198)

___

### UnlockContainerStatus

?? **UnlockContainerStatus**: *SUCCESS* \| *ALREADY_UNLOCKED* \| *FAILURE* \| *INVALID_PASSPHRASE* \| *MISSING_KEYCHAIN* \| *MISSING_CONTAINER*

Defined in: [define.ts:196](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L196)

___

### UnlockKeyResolve

?? **UnlockKeyResolve**: [status: KeyStatus, payload?: EncryptHelper]

Defined in: [define.ts:182](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/define.ts#L182)

## Functions

### createRandomValues

??? `Const`**createRandomValues**(): *Promise*<string\>

**Returns:** *Promise*<string\>

Defined in: [utils.ts:17](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/utils.ts#L17)

___

### getUUIDv4

??? `Const`**getUUIDv4**(): *string*

**Returns:** *string*

Defined in: [utils.ts:3](https://github.com/CoNET-project/kloak-bridge/blob/944a10e/src/utils.ts#L3)
