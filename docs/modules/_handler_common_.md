[@miqro/core](../README.md) › [Globals](../globals.md) › ["handler/common"](_handler_common_.md)

# Module: "handler/common"

## Index

### Namespaces

* [__global](_handler_common_.__global.md)

### Interfaces

* [HandleAllOptionsOutput](../interfaces/_handler_common_.handlealloptionsoutput.md)
* [NoTokenSession](../interfaces/_handler_common_.notokensession.md)
* [Session](../interfaces/_handler_common_.session.md)
* [VerifyTokenService](../interfaces/_handler_common_.verifytokenservice.md)

### Type aliases

* [AsyncCallback](_handler_common_.md#asynccallback)
* [AsyncNextCallback](_handler_common_.md#asyncnextcallback)
* [Callback](_handler_common_.md#callback)
* [ErrorCallback](_handler_common_.md#errorcallback)
* [HandleAllOptions](_handler_common_.md#handlealloptions)
* [NextCallback](_handler_common_.md#nextcallback)
* [NextFunction](_handler_common_.md#nextfunction)

### Functions

* [HandleAll](_handler_common_.md#const-handleall)
* [Handler](_handler_common_.md#const-handler)
* [getResults](_handler_common_.md#const-getresults)
* [setResults](_handler_common_.md#const-setresults)

## Type aliases

###  AsyncCallback

Ƭ **AsyncCallback**: *function*

*Defined in [src/handler/common.ts:38](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/common.ts#L38)*

#### Type declaration:

▸ (`req`: [Request](../interfaces/_handler_common_.__global.express.request.md), `res`: any): *Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`req` | [Request](../interfaces/_handler_common_.__global.express.request.md) |
`res` | any |

___

###  AsyncNextCallback

Ƭ **AsyncNextCallback**: *function*

*Defined in [src/handler/common.ts:40](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/common.ts#L40)*

#### Type declaration:

▸ (`req`: [Request](../interfaces/_handler_common_.__global.express.request.md), `res`: any, `next`: [NextFunction](_handler_common_.md#nextfunction)): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`req` | [Request](../interfaces/_handler_common_.__global.express.request.md) |
`res` | any |
`next` | [NextFunction](_handler_common_.md#nextfunction) |

___

###  Callback

Ƭ **Callback**: *function*

*Defined in [src/handler/common.ts:37](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/common.ts#L37)*

#### Type declaration:

▸ (`req`: [Request](../interfaces/_handler_common_.__global.express.request.md), `res`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`req` | [Request](../interfaces/_handler_common_.__global.express.request.md) |
`res` | any |

___

###  ErrorCallback

Ƭ **ErrorCallback**: *function*

*Defined in [src/handler/common.ts:36](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/common.ts#L36)*

#### Type declaration:

▸ (`err`: [Error](../classes/_util_error_named_.namederror.md#static-error), `req`: [Request](../interfaces/_handler_common_.__global.express.request.md), `res`: any, `next`: [NextFunction](_handler_common_.md#nextfunction)): *any*

**Parameters:**

Name | Type |
------ | ------ |
`err` | [Error](../classes/_util_error_named_.namederror.md#static-error) |
`req` | [Request](../interfaces/_handler_common_.__global.express.request.md) |
`res` | any |
`next` | [NextFunction](_handler_common_.md#nextfunction) |

___

###  HandleAllOptions

Ƭ **HandleAllOptions**: *function*

*Defined in [src/handler/common.ts:95](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/common.ts#L95)*

#### Type declaration:

▸ (`req`: any): *Promise‹[HandleAllOptionsOutput](../interfaces/_handler_common_.handlealloptionsoutput.md)[]›*

**Parameters:**

Name | Type |
------ | ------ |
`req` | any |

___

###  NextCallback

Ƭ **NextCallback**: *function*

*Defined in [src/handler/common.ts:39](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/common.ts#L39)*

#### Type declaration:

▸ (`req`: [Request](../interfaces/_handler_common_.__global.express.request.md), `res`: any, `next`: [NextFunction](_handler_common_.md#nextfunction)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`req` | [Request](../interfaces/_handler_common_.__global.express.request.md) |
`res` | any |
`next` | [NextFunction](_handler_common_.md#nextfunction) |

___

###  NextFunction

Ƭ **NextFunction**: *function*

*Defined in [src/handler/common.ts:34](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/common.ts#L34)*

#### Type declaration:

▸ (`e?`: [Error](../classes/_util_error_named_.namederror.md#static-error)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`e?` | [Error](../classes/_util_error_named_.namederror.md#static-error) |

## Functions

### `Const` HandleAll

▸ **HandleAll**(`generator`: [HandleAllOptions](_handler_common_.md#handlealloptions), `logger?`: [Logger](../interfaces/_util_logger_.logger.md)): *[NextCallback](_handler_common_.md#nextcallback)*

*Defined in [src/handler/common.ts:97](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/common.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`generator` | [HandleAllOptions](_handler_common_.md#handlealloptions) |
`logger?` | [Logger](../interfaces/_util_logger_.logger.md) |

**Returns:** *[NextCallback](_handler_common_.md#nextcallback)*

___

### `Const` Handler

▸ **Handler**(`fn`: [AsyncCallback](_handler_common_.md#asynccallback) | [Callback](_handler_common_.md#callback), `logger?`: [Logger](../interfaces/_util_logger_.logger.md)): *[NextCallback](_handler_common_.md#nextcallback)*

*Defined in [src/handler/common.ts:61](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/common.ts#L61)*

Wraps an async express request handler but catches the return value and appends it to req.results

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fn` | [AsyncCallback](_handler_common_.md#asynccallback) &#124; [Callback](_handler_common_.md#callback) | express request handler ´async function´. |
`logger?` | [Logger](../interfaces/_util_logger_.logger.md) | logger for logging errors ´ILogger´.  |

**Returns:** *[NextCallback](_handler_common_.md#nextcallback)*

___

### `Const` getResults

▸ **getResults**(`req`: [Request](../interfaces/_handler_common_.__global.express.request.md)): *any[]*

*Defined in [src/handler/common.ts:48](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/common.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`req` | [Request](../interfaces/_handler_common_.__global.express.request.md) |

**Returns:** *any[]*

___

### `Const` setResults

▸ **setResults**(`req`: [Request](../interfaces/_handler_common_.__global.express.request.md), `results`: any[]): *void*

*Defined in [src/handler/common.ts:43](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/common.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`req` | [Request](../interfaces/_handler_common_.__global.express.request.md) |
`results` | any[] |

**Returns:** *void*
