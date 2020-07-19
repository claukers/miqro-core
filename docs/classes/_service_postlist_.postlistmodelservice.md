[@miqro/core](../README.md) › [Globals](../globals.md) › ["service/postlist"](../modules/_service_postlist_.md) › [PostListModelService](_service_postlist_.postlistmodelservice.md)

# Class: PostListModelService

## Hierarchy

  ↳ [ModelService](_service_smodel_.modelservice.md)

  ↳ **PostListModelService**

  ↳ [FakeDeleteModelService](_service_deleted_.fakedeletemodelservice.md)

## Implements

* [ModelServiceInterface](../interfaces/_service_model_.modelserviceinterface.md)

## Index

### Constructors

* [constructor](_service_postlist_.postlistmodelservice.md#constructor)

### Properties

* [model](_service_postlist_.postlistmodelservice.md#protected-model)

### Methods

* [delete](_service_postlist_.postlistmodelservice.md#delete)
* [get](_service_postlist_.postlistmodelservice.md#get)
* [patch](_service_postlist_.postlistmodelservice.md#patch)
* [post](_service_postlist_.postlistmodelservice.md#post)
* [put](_service_postlist_.postlistmodelservice.md#put)

## Constructors

###  constructor

\+ **new PostListModelService**(`model`: any): *[PostListModelService](_service_postlist_.postlistmodelservice.md)*

*Inherited from [ModelService](_service_smodel_.modelservice.md).[constructor](_service_smodel_.modelservice.md#constructor)*

*Defined in [src/service/smodel.ts:6](https://github.com/claukers/miqro-core/blob/5cb140c/src/service/smodel.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | any |

**Returns:** *[PostListModelService](_service_postlist_.postlistmodelservice.md)*

## Properties

### `Protected` model

• **model**: *any*

*Inherited from [ModelService](_service_smodel_.modelservice.md).[model](_service_smodel_.modelservice.md#protected-model)*

*Defined in [src/service/smodel.ts:8](https://github.com/claukers/miqro-core/blob/5cb140c/src/service/smodel.ts#L8)*

## Methods

###  delete

▸ **delete**(`__namedParameters`: object, `transaction?`: any): *Promise‹any›*

*Inherited from [ModelService](_service_smodel_.modelservice.md).[delete](_service_smodel_.modelservice.md#delete)*

*Overrides [AbstractModelService](_service_amodel_.abstractmodelservice.md).[delete](_service_amodel_.abstractmodelservice.md#delete)*

*Defined in [src/service/smodel.ts:146](https://github.com/claukers/miqro-core/blob/5cb140c/src/service/smodel.ts#L146)*

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

*Inherited from [ModelService](_service_smodel_.modelservice.md).[get](_service_smodel_.modelservice.md#get)*

*Overrides [AbstractModelService](_service_amodel_.abstractmodelservice.md).[get](_service_amodel_.abstractmodelservice.md#get)*

*Defined in [src/service/smodel.ts:13](https://github.com/claukers/miqro-core/blob/5cb140c/src/service/smodel.ts#L13)*

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

*Inherited from [ModelService](_service_smodel_.modelservice.md).[patch](_service_smodel_.modelservice.md#patch)*

*Overrides [AbstractModelService](_service_amodel_.abstractmodelservice.md).[patch](_service_amodel_.abstractmodelservice.md#patch)*

*Defined in [src/service/smodel.ts:128](https://github.com/claukers/miqro-core/blob/5cb140c/src/service/smodel.ts#L128)*

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

▸ **post**(`args`: [ModelServiceArgsInterface](../interfaces/_service_model_.modelserviceargsinterface.md), `transaction?`: any): *Promise‹any›*

*Implementation of [ModelServiceInterface](../interfaces/_service_model_.modelserviceinterface.md)*

*Overrides [ModelService](_service_smodel_.modelservice.md).[post](_service_smodel_.modelservice.md#post)*

*Defined in [src/service/postlist.ts:8](https://github.com/claukers/miqro-core/blob/5cb140c/src/service/postlist.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | [ModelServiceArgsInterface](../interfaces/_service_model_.modelserviceargsinterface.md) |
`transaction?` | any |

**Returns:** *Promise‹any›*

___

###  put

▸ **put**(`options`: [ModelServiceArgsInterface](../interfaces/_service_model_.modelserviceargsinterface.md)): *Promise‹any›*

*Inherited from [AbstractModelService](_service_amodel_.abstractmodelservice.md).[put](_service_amodel_.abstractmodelservice.md#put)*

*Defined in [src/service/amodel.ts:17](https://github.com/claukers/miqro-core/blob/5cb140c/src/service/amodel.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [ModelServiceArgsInterface](../interfaces/_service_model_.modelserviceargsinterface.md) |

**Returns:** *Promise‹any›*
