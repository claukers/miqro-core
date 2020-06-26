[@miqro/core](../README.md) › [Globals](../globals.md) › ["service/deleted"](../modules/_service_deleted_.md) › [FakeDeleteModelService](_service_deleted_.fakedeletemodelservice.md)

# Class: FakeDeleteModelService

## Hierarchy

  ↳ [PostListModelService](_service_postlist_.postlistmodelservice.md)

  ↳ **FakeDeleteModelService**

## Implements

* [ModelServiceInterface](../interfaces/_service_common_model_.modelserviceinterface.md)

## Index

### Constructors

* [constructor](_service_deleted_.fakedeletemodelservice.md#constructor)

### Properties

* [model](_service_deleted_.fakedeletemodelservice.md#protected-model)
* [modelIsDeletedAttribute](_service_deleted_.fakedeletemodelservice.md#protected-modelisdeletedattribute)

### Methods

* [delete](_service_deleted_.fakedeletemodelservice.md#delete)
* [get](_service_deleted_.fakedeletemodelservice.md#get)
* [patch](_service_deleted_.fakedeletemodelservice.md#patch)
* [post](_service_deleted_.fakedeletemodelservice.md#post)
* [put](_service_deleted_.fakedeletemodelservice.md#put)

## Constructors

###  constructor

\+ **new FakeDeleteModelService**(`model`: any): *[FakeDeleteModelService](_service_deleted_.fakedeletemodelservice.md)*

*Inherited from [ModelService](_service_model_.modelservice.md).[constructor](_service_model_.modelservice.md#constructor)*

*Defined in [src/service/model.ts:6](https://github.com/claukers/miqro-core/blob/65c3631/src/service/model.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | any |

**Returns:** *[FakeDeleteModelService](_service_deleted_.fakedeletemodelservice.md)*

## Properties

### `Protected` model

• **model**: *any*

*Inherited from [ModelService](_service_model_.modelservice.md).[model](_service_model_.modelservice.md#protected-model)*

*Defined in [src/service/model.ts:8](https://github.com/claukers/miqro-core/blob/65c3631/src/service/model.ts#L8)*

___

### `Protected` modelIsDeletedAttribute

• **modelIsDeletedAttribute**: *string* = "deleted"

*Defined in [src/service/deleted.ts:5](https://github.com/claukers/miqro-core/blob/65c3631/src/service/deleted.ts#L5)*

## Methods

###  delete

▸ **delete**(`args`: [ModelServiceArgsInterface](../interfaces/_service_common_model_.modelserviceargsinterface.md)): *Promise‹any›*

*Overrides [ModelService](_service_model_.modelservice.md).[delete](_service_model_.modelservice.md#delete)*

*Defined in [src/service/deleted.ts:12](https://github.com/claukers/miqro-core/blob/65c3631/src/service/deleted.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | [ModelServiceArgsInterface](../interfaces/_service_common_model_.modelserviceargsinterface.md) |

**Returns:** *Promise‹any›*

___

###  get

▸ **get**(`args`: [ModelServiceArgsInterface](../interfaces/_service_common_model_.modelserviceargsinterface.md)): *Promise‹any›*

*Overrides [ModelService](_service_model_.modelservice.md).[get](_service_model_.modelservice.md#get)*

*Defined in [src/service/deleted.ts:7](https://github.com/claukers/miqro-core/blob/65c3631/src/service/deleted.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | [ModelServiceArgsInterface](../interfaces/_service_common_model_.modelserviceargsinterface.md) |

**Returns:** *Promise‹any›*

___

###  patch

▸ **patch**(`args`: [ModelServiceArgsInterface](../interfaces/_service_common_model_.modelserviceargsinterface.md)): *Promise‹any›*

*Overrides [ModelService](_service_model_.modelservice.md).[patch](_service_model_.modelservice.md#patch)*

*Defined in [src/service/deleted.ts:17](https://github.com/claukers/miqro-core/blob/65c3631/src/service/deleted.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | [ModelServiceArgsInterface](../interfaces/_service_common_model_.modelserviceargsinterface.md) |

**Returns:** *Promise‹any›*

___

###  post

▸ **post**(`args`: [ModelServiceArgsInterface](../interfaces/_service_common_model_.modelserviceargsinterface.md)): *Promise‹any›*

*Overrides [PostListModelService](_service_postlist_.postlistmodelservice.md).[post](_service_postlist_.postlistmodelservice.md#post)*

*Defined in [src/service/deleted.ts:24](https://github.com/claukers/miqro-core/blob/65c3631/src/service/deleted.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | [ModelServiceArgsInterface](../interfaces/_service_common_model_.modelserviceargsinterface.md) |

**Returns:** *Promise‹any›*

___

###  put

▸ **put**(`options`: [ModelServiceArgsInterface](../interfaces/_service_common_model_.modelserviceargsinterface.md)): *Promise‹any›*

*Inherited from [AbstractModelService](_service_common_amodel_.abstractmodelservice.md).[put](_service_common_amodel_.abstractmodelservice.md#put)*

*Defined in [src/service/common/amodel.ts:17](https://github.com/claukers/miqro-core/blob/65c3631/src/service/common/amodel.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [ModelServiceArgsInterface](../interfaces/_service_common_model_.modelserviceargsinterface.md) |

**Returns:** *Promise‹any›*
