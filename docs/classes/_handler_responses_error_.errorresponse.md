[@miqro/core](../README.md) › [Globals](../globals.md) › ["handler/responses/error"](../modules/_handler_responses_error_.md) › [ErrorResponse](_handler_responses_error_.errorresponse.md)

# Class: ErrorResponse

## Hierarchy

* [APIResponse](_handler_responses_api_.apiresponse.md)

  ↳ **ErrorResponse**

## Index

### Constructors

* [constructor](_handler_responses_error_.errorresponse.md#constructor)

### Properties

* [body](_handler_responses_error_.errorresponse.md#optional-body)
* [status](_handler_responses_error_.errorresponse.md#status)

### Methods

* [send](_handler_responses_error_.errorresponse.md#send)

## Constructors

###  constructor

\+ **new ErrorResponse**(`e`: [Error](_util_error_named_.namederror.md#static-error)): *[ErrorResponse](_handler_responses_error_.errorresponse.md)*

*Overrides [APIResponse](_handler_responses_api_.apiresponse.md).[constructor](_handler_responses_api_.apiresponse.md#constructor)*

*Defined in [src/handler/responses/error.ts:3](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/responses/error.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | [Error](_util_error_named_.namederror.md#static-error) |

**Returns:** *[ErrorResponse](_handler_responses_error_.errorresponse.md)*

## Properties

### `Optional` body

• **body**? : *any*

*Inherited from [APIResponse](_handler_responses_api_.apiresponse.md).[body](_handler_responses_api_.apiresponse.md#optional-body)*

*Defined in [src/handler/responses/api.ts:5](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/responses/api.ts#L5)*

___

###  status

• **status**: *number* = 200

*Inherited from [APIResponse](_handler_responses_api_.apiresponse.md).[status](_handler_responses_api_.apiresponse.md#status)*

*Defined in [src/handler/responses/api.ts:2](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/responses/api.ts#L2)*

## Methods

###  send

▸ **send**(`res`: any): *void*

*Inherited from [APIResponse](_handler_responses_api_.apiresponse.md).[send](_handler_responses_api_.apiresponse.md#send)*

*Defined in [src/handler/responses/api.ts:8](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/responses/api.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`res` | any |

**Returns:** *void*