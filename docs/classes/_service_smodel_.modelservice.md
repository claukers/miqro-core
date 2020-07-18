[@miqro/core](../README.md) › [Globals](../globals.md) › ["service/smodel"](../modules/_service_smodel_.md) › [ModelService](_service_smodel_.modelservice.md)

# Class: ModelService

## Hierarchy

* [AbstractModelService](_service_amodel_.abstractmodelservice.md)

  ↳ **ModelService**

  ↳ [PostListModelService](_service_postlist_.postlistmodelservice.md)

## Implements

* [ModelServiceInterface](../interfaces/_service_model_.modelserviceinterface.md)

## Index

### Constructors

* [constructor](_service_smodel_.modelservice.md#constructor)

### Properties

* [model](_service_smodel_.modelservice.md#protected-model)

### Methods

* [delete](_service_smodel_.modelservice.md#delete)
* [get](_service_smodel_.modelservice.md#get)
* [patch](_service_smodel_.modelservice.md#patch)
* [post](_service_smodel_.modelservice.md#post)
* [put](_service_smodel_.modelservice.md#put)

## Constructors

###  constructor

\+ **new ModelService**(`model`: any): *[ModelService](_service_smodel_.modelservice.md)*

*Defined in [src/service/smodel.ts:6](https://github.com/claukers/miqro-core/blob/cc47cc5/src/service/smodel.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | any |

**Returns:** *[ModelService](_service_smodel_.modelservice.md)*

## Properties

### `Protected` model

• **model**: *any*

*Defined in [src/service/smodel.ts:8](https://github.com/claukers/miqro-core/blob/cc47cc5/src/service/smodel.ts#L8)*

## Methods

###  delete

▸ **delete**(`__namedParameters`: object, `transaction?`: any): *Promise‹any›*

*Overrides [AbstractModelService](_service_amodel_.abstractmodelservice.md).[delete](_service_amodel_.abstractmodelservice.md#delete)*

*Defined in [src/service/smodel.ts:146](https://github.com/claukers/miqro-core/blob/cc47cc5/src/service/smodel.ts#L146)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`body` | [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹any› |
`params` | [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹string› |
`query` | [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹string› |

▪`Optional`  **transaction**: *any*

**Returns:** *Promise‹any›*

___

###  get

▸ **get**(`__namedParameters`: object, `transaction?`: any, `skipLocked?`: boolean): *Promise‹any›*

*Overrides [AbstractModelService](_service_amodel_.abstractmodelservice.md).[get](_service_amodel_.abstractmodelservice.md#get)*

*Defined in [src/service/smodel.ts:13](https://github.com/claukers/miqro-core/blob/cc47cc5/src/service/smodel.ts#L13)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`body` | [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹any› |
`params` | [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹string› |
`query` | [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹string› |

▪`Optional`  **transaction**: *any*

▪`Optional`  **skipLocked**: *boolean*

**Returns:** *Promise‹any›*

___

###  patch

▸ **patch**(`__namedParameters`: object, `transaction?`: any): *Promise‹any›*

*Overrides [AbstractModelService](_service_amodel_.abstractmodelservice.md).[patch](_service_amodel_.abstractmodelservice.md#patch)*

*Defined in [src/service/smodel.ts:128](https://github.com/claukers/miqro-core/blob/cc47cc5/src/service/smodel.ts#L128)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`body` | [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹any› |
`params` | [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹string› |
`query` | [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹string› |

▪`Optional`  **transaction**: *any*

**Returns:** *Promise‹any›*

___

###  post

▸ **post**(`__namedParameters`: object, `transaction?`: any): *Promise‹any›*

*Overrides [AbstractModelService](_service_amodel_.abstractmodelservice.md).[post](_service_amodel_.abstractmodelservice.md#post)*

*Defined in [src/service/smodel.ts:115](https://github.com/claukers/miqro-core/blob/cc47cc5/src/service/smodel.ts#L115)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`body` | [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹any› |
`params` | [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹string› |
`query` | [SimpleMapInterface](../interfaces/_util_util_.simplemapinterface.md)‹string› |

▪`Optional`  **transaction**: *any*

**Returns:** *Promise‹any›*

___

###  put

▸ **put**(`options`: [ModelServiceArgsInterface](../interfaces/_service_model_.modelserviceargsinterface.md)): *Promise‹any›*

*Inherited from [AbstractModelService](_service_amodel_.abstractmodelservice.md).[put](_service_amodel_.abstractmodelservice.md#put)*

*Defined in [src/service/amodel.ts:17](https://github.com/claukers/miqro-core/blob/cc47cc5/src/service/amodel.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [ModelServiceArgsInterface](../interfaces/_service_model_.modelserviceargsinterface.md) |

**Returns:** *Promise‹any›*
