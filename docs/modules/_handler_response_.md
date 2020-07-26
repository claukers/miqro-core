[@miqro/core](../README.md) › [Globals](../globals.md) › ["handler/response"](_handler_response_.md)

# Module: "handler/response"

## Index

### Functions

* [ErrorHandler](_handler_response_.md#const-errorhandler)
* [ResponseHandler](_handler_response_.md#const-responsehandler)
* [createErrorResponse](_handler_response_.md#const-createerrorresponse)
* [createServiceResponse](_handler_response_.md#const-createserviceresponse)

## Functions

### `Const` ErrorHandler

▸ **ErrorHandler**(`logger?`: [Logger](../interfaces/_util_logger_.logger.md)): *[ErrorCallback](_handler_common_.md#errorcallback)*

*Defined in [src/handler/response.ts:80](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/response.ts#L80)*

Express middleware that catches sequelize and other known errors. If the error is not **known** the next callback is called.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`logger?` | [Logger](../interfaces/_util_logger_.logger.md) | logger for logging errors ´ILogger´.  |

**Returns:** *[ErrorCallback](_handler_common_.md#errorcallback)*

___

### `Const` ResponseHandler

▸ **ResponseHandler**(`logger?`: [Logger](../interfaces/_util_logger_.logger.md)): *[NextCallback](_handler_common_.md#nextcallback)*

*Defined in [src/handler/response.ts:54](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/response.ts#L54)*

Express middleware that uses req.results to create a response.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`logger?` | [Logger](../interfaces/_util_logger_.logger.md) | logger for logging errors ´ILogger´.  |

**Returns:** *[NextCallback](_handler_common_.md#nextcallback)*

___

### `Const` createErrorResponse

▸ **createErrorResponse**(`e`: [Error](../classes/_util_error_named_.namederror.md#static-error)): *[APIResponse](../classes/_handler_responses_api_.apiresponse.md)*

*Defined in [src/handler/response.ts:14](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/response.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | [Error](../classes/_util_error_named_.namederror.md#static-error) |

**Returns:** *[APIResponse](../classes/_handler_responses_api_.apiresponse.md)*

___

### `Const` createServiceResponse

▸ **createServiceResponse**(`req`: any): *[ServiceResponse](../classes/_handler_responses_service_.serviceresponse.md)*

*Defined in [src/handler/response.ts:38](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/response.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`req` | any |

**Returns:** *[ServiceResponse](../classes/_handler_responses_service_.serviceresponse.md)*
