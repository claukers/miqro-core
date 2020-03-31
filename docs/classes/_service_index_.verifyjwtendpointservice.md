[@miqro/core](../README.md) › [Globals](../globals.md) › ["service/index"](../modules/_service_index_.md) › [VerifyJWTEndpointService](_service_index_.verifyjwtendpointservice.md)

# Class: VerifyJWTEndpointService

## Hierarchy

* **VerifyJWTEndpointService**

## Implements

* [IVerifyTokenService](../interfaces/_service_index_.iverifytokenservice.md)

## Index

### Constructors

* [constructor](_service_index_.verifyjwtendpointservice.md#constructor)

### Properties

* [logger](_service_index_.verifyjwtendpointservice.md#protected-logger)
* [instance](_service_index_.verifyjwtendpointservice.md#static-protected-instance)

### Methods

* [verify](_service_index_.verifyjwtendpointservice.md#verify)
* [getInstance](_service_index_.verifyjwtendpointservice.md#static-getinstance)

## Constructors

###  constructor

\+ **new VerifyJWTEndpointService**(): *[VerifyJWTEndpointService](_service_index_.verifyjwtendpointservice.md)*

*Defined in [src/service/index.ts:23](https://github.com/claukers/miqro-core/blob/6617130/src/service/index.ts#L23)*

**Returns:** *[VerifyJWTEndpointService](_service_index_.verifyjwtendpointservice.md)*

## Properties

### `Protected` logger

• **logger**: *any* = null

*Defined in [src/service/index.ts:23](https://github.com/claukers/miqro-core/blob/6617130/src/service/index.ts#L23)*

___

### `Static` `Protected` instance

▪ **instance**: *[VerifyJWTEndpointService](_service_index_.verifyjwtendpointservice.md)* = null

*Defined in [src/service/index.ts:15](https://github.com/claukers/miqro-core/blob/6617130/src/service/index.ts#L15)*

## Methods

###  verify

▸ **verify**(`__namedParameters`: object): *Promise‹[ISession](../interfaces/_service_common_index_.isession.md)›*

*Defined in [src/service/index.ts:41](https://github.com/claukers/miqro-core/blob/6617130/src/service/index.ts#L41)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`token` | string |

**Returns:** *Promise‹[ISession](../interfaces/_service_common_index_.isession.md)›*

___

### `Static` getInstance

▸ **getInstance**(): *[VerifyJWTEndpointService](_service_index_.verifyjwtendpointservice.md)*

*Defined in [src/service/index.ts:17](https://github.com/claukers/miqro-core/blob/6617130/src/service/index.ts#L17)*

**Returns:** *[VerifyJWTEndpointService](_service_index_.verifyjwtendpointservice.md)*
