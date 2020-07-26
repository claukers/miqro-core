[@miqro/core](../README.md) › [Globals](../globals.md) › ["handler/responses/notfound"](../modules/_handler_responses_notfound_.md) › [NotFoundResponse](_handler_responses_notfound_.notfoundresponse.md)

# Class: NotFoundResponse

## Hierarchy

* [APIResponse](_handler_responses_api_.apiresponse.md)

  ↳ **NotFoundResponse**

## Index

### Constructors

* [constructor](_handler_responses_notfound_.notfoundresponse.md#constructor)

### Properties

* [body](_handler_responses_notfound_.notfoundresponse.md#optional-body)
* [status](_handler_responses_notfound_.notfoundresponse.md#status)

### Methods

* [send](_handler_responses_notfound_.notfoundresponse.md#send)

## Constructors

###  constructor

\+ **new NotFoundResponse**(): *[NotFoundResponse](_handler_responses_notfound_.notfoundresponse.md)*

*Overrides [APIResponse](_handler_responses_api_.apiresponse.md).[constructor](_handler_responses_api_.apiresponse.md#constructor)*

*Defined in [src/handler/responses/notfound.ts:3](https://github.com/claukers/miqro-core/blob/f2fd61b/src/handler/responses/notfound.ts#L3)*

**Returns:** *[NotFoundResponse](_handler_responses_notfound_.notfoundresponse.md)*

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
