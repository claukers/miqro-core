[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/util"](../modules/_util_util_.md) › [ResponseError](_util_util_.responseerror.md)

# Class: ResponseError

## Hierarchy

* [Error](_util_error_named_.namederror.md#static-error)

  ↳ **ResponseError**

## Index

### Constructors

* [constructor](_util_util_.responseerror.md#constructor)

### Properties

* [data](_util_util_.responseerror.md#data)
* [headers](_util_util_.responseerror.md#headers)
* [message](_util_util_.responseerror.md#message)
* [name](_util_util_.responseerror.md#name)
* [redirectedUrl](_util_util_.responseerror.md#redirectedurl)
* [response](_util_util_.responseerror.md#response)
* [stack](_util_util_.responseerror.md#optional-stack)
* [status](_util_util_.responseerror.md#status)
* [url](_util_util_.responseerror.md#url)
* [Error](_util_util_.responseerror.md#static-error)

## Constructors

###  constructor

\+ **new ResponseError**(`status`: number | undefined, `response`: IncomingMessage | undefined, `headers`: IncomingHttpHeaders | undefined, `url`: string, `redirectedUrl`: string | null, `data`: any): *[ResponseError](_util_util_.responseerror.md)*

*Defined in [src/util/util.ts:11](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`status` | number &#124; undefined |
`response` | IncomingMessage &#124; undefined |
`headers` | IncomingHttpHeaders &#124; undefined |
`url` | string |
`redirectedUrl` | string &#124; null |
`data` | any |

**Returns:** *[ResponseError](_util_util_.responseerror.md)*

## Properties

###  data

• **data**: *any*

*Defined in [src/util/util.ts:19](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L19)*

___

###  headers

• **headers**: *IncomingHttpHeaders | undefined*

*Defined in [src/util/util.ts:16](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L16)*

___

###  message

• **message**: *string*

*Inherited from [NamedError](_util_error_named_.namederror.md).[message](_util_error_named_.namederror.md#message)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from [ResponseError](_util_util_.responseerror.md).[name](_util_util_.responseerror.md#name)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:973

___

###  redirectedUrl

• **redirectedUrl**: *string | null*

*Defined in [src/util/util.ts:18](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L18)*

___

###  response

• **response**: *IncomingMessage | undefined*

*Defined in [src/util/util.ts:15](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L15)*

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from [NamedError](_util_error_named_.namederror.md).[stack](_util_error_named_.namederror.md#optional-stack)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:975

___

###  status

• **status**: *number | undefined*

*Defined in [src/util/util.ts:14](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L14)*

___

###  url

• **url**: *string*

*Defined in [src/util/util.ts:17](https://github.com/claukers/miqro-core/blob/4c91395/src/util/util.ts#L17)*

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:984
