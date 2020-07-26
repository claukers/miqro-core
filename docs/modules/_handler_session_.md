[@miqro/core](../README.md) › [Globals](../globals.md) › ["handler/session"](_handler_session_.md)

# Module: "handler/session"

## Index

### Functions

* [GroupPolicyHandler](_handler_session_.md#const-grouppolicyhandler)
* [SessionHandler](_handler_session_.md#const-sessionhandler)

## Functions

### `Const` GroupPolicyHandler

▸ **GroupPolicyHandler**(`options`: [GroupPolicyOptions](../interfaces/_util_index_.grouppolicyoptions.md), `logger?`: [Logger](../interfaces/_util_logger_.logger.md)): *[AsyncNextCallback](_handler_common_.md#asyncnextcallback)*

*Defined in [src/handler/session.ts:69](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/session.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [GroupPolicyOptions](../interfaces/_util_index_.grouppolicyoptions.md) |
`logger?` | [Logger](../interfaces/_util_logger_.logger.md) |

**Returns:** *[AsyncNextCallback](_handler_common_.md#asyncnextcallback)*

___

### `Const` SessionHandler

▸ **SessionHandler**(`authService`: [VerifyTokenService](../interfaces/_handler_common_.verifytokenservice.md), `logger?`: [Logger](../interfaces/_util_logger_.logger.md)): *[AsyncNextCallback](_handler_common_.md#asyncnextcallback)*

*Defined in [src/handler/session.ts:12](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/session.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`authService` | [VerifyTokenService](../interfaces/_handler_common_.verifytokenservice.md) |
`logger?` | [Logger](../interfaces/_util_logger_.logger.md) |

**Returns:** *[AsyncNextCallback](_handler_common_.md#asyncnextcallback)*
