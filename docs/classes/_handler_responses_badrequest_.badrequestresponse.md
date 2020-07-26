[@miqro/core](../README.md) › [Globals](../globals.md) › ["handler/responses/badrequest"](../modules/_handler_responses_badrequest_.md) › [BadRequestResponse](_handler_responses_badrequest_.badrequestresponse.md)

# Class: BadRequestResponse

## Hierarchy

* [APIResponse](_handler_responses_api_.apiresponse.md)

  ↳ **BadRequestResponse**

## Index

### Constructors

* [constructor](_handler_responses_badrequest_.badrequestresponse.md#constructor)

### Properties

* [body](_handler_responses_badrequest_.badrequestresponse.md#optional-body)
* [status](_handler_responses_badrequest_.badrequestresponse.md#status)

### Methods

* [send](_handler_responses_badrequest_.badrequestresponse.md#send)

## Constructors

###  constructor

\+ **new BadRequestResponse**(`message`: string): *[BadRequestResponse](_handler_responses_badrequest_.badrequestresponse.md)*

*Overrides [APIResponse](_handler_responses_api_.apiresponse.md).[constructor](_handler_responses_api_.apiresponse.md#constructor)*

*Defined in [src/handler/responses/badrequest.ts:3](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/responses/badrequest.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *[BadRequestResponse](_handler_responses_badrequest_.badrequestresponse.md)*

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
