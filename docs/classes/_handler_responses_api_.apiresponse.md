[@miqro/core](../README.md) › [Globals](../globals.md) › ["handler/responses/api"](../modules/_handler_responses_api_.md) › [APIResponse](_handler_responses_api_.apiresponse.md)

# Class: APIResponse

## Hierarchy

* **APIResponse**

  ↳ [ServiceResponse](_handler_responses_service_.serviceresponse.md)

  ↳ [BadRequestResponse](_handler_responses_badrequest_.badrequestresponse.md)

  ↳ [NotFoundResponse](_handler_responses_notfound_.notfoundresponse.md)

  ↳ [ErrorResponse](_handler_responses_error_.errorresponse.md)

  ↳ [UnAuthorizedResponse](_handler_responses_unauth_.unauthorizedresponse.md)

  ↳ [ForbiddenResponse](_handler_responses_forbidden_.forbiddenresponse.md)

## Index

### Constructors

* [constructor](_handler_responses_api_.apiresponse.md#constructor)

### Properties

* [body](_handler_responses_api_.apiresponse.md#optional-body)
* [status](_handler_responses_api_.apiresponse.md#status)

### Methods

* [send](_handler_responses_api_.apiresponse.md#send)

## Constructors

###  constructor

\+ **new APIResponse**(`body?`: any): *[APIResponse](_handler_responses_api_.apiresponse.md)*

*Defined in [src/handler/responses/api.ts:2](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/responses/api.ts#L2)*

**Parameters:**

Name | Type |
------ | ------ |
`body?` | any |

**Returns:** *[APIResponse](_handler_responses_api_.apiresponse.md)*

## Properties

### `Optional` body

• **body**? : *any*

*Defined in [src/handler/responses/api.ts:5](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/responses/api.ts#L5)*

___

###  status

• **status**: *number* = 200

*Defined in [src/handler/responses/api.ts:2](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/responses/api.ts#L2)*

## Methods

###  send

▸ **send**(`res`: any): *void*

*Defined in [src/handler/responses/api.ts:8](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/responses/api.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`res` | any |

**Returns:** *void*
