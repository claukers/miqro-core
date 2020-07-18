[@miqro/core](../README.md) › [Globals](../globals.md) › ["service/index"](../modules/_service_index_.md) › [VerifyJWTEndpointService](_service_index_.verifyjwtendpointservice.md)

# Class: VerifyJWTEndpointService

## Hierarchy

* **VerifyJWTEndpointService**

## Implements

* [VerifyTokenServiceInterface](../interfaces/_service_index_.verifytokenserviceinterface.md)

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

*Defined in [src/service/index.ts:27](https://github.com/claukers/miqro-core/blob/543c996/src/service/index.ts#L27)*

**Returns:** *[VerifyJWTEndpointService](_service_index_.verifyjwtendpointservice.md)*

## Properties

### `Protected` logger

• **logger**: *[Logger](../interfaces/_util_logger_.logger.md)* = null

*Defined in [src/service/index.ts:27](https://github.com/claukers/miqro-core/blob/543c996/src/service/index.ts#L27)*

___

### `Static` `Protected` instance

▪ **instance**: *[VerifyJWTEndpointService](_service_index_.verifyjwtendpointservice.md)* = null

*Defined in [src/service/index.ts:19](https://github.com/claukers/miqro-core/blob/543c996/src/service/index.ts#L19)*

## Methods

###  verify

▸ **verify**(`__namedParameters`: object): *Promise‹[SessionInterface](../interfaces/_service_common_.sessioninterface.md)›*

*Defined in [src/service/index.ts:45](https://github.com/claukers/miqro-core/blob/543c996/src/service/index.ts#L45)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`token` | string |

**Returns:** *Promise‹[SessionInterface](../interfaces/_service_common_.sessioninterface.md)›*

___

### `Static` getInstance

▸ **getInstance**(): *[VerifyJWTEndpointService](_service_index_.verifyjwtendpointservice.md)*

*Defined in [src/service/index.ts:21](https://github.com/claukers/miqro-core/blob/543c996/src/service/index.ts#L21)*

**Returns:** *[VerifyJWTEndpointService](_service_index_.verifyjwtendpointservice.md)*
