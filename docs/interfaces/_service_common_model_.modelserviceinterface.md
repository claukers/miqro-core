[@miqro/core](../README.md) › [Globals](../globals.md) › ["service/common/model"](../modules/_service_common_model_.md) › [ModelServiceInterface](_service_common_model_.modelserviceinterface.md)

# Interface: ModelServiceInterface

## Hierarchy

* **ModelServiceInterface**

## Implemented by

* [AbstractModelService](../classes/_service_common_amodel_.abstractmodelservice.md)
* [FakeDeleteModelService](../classes/_service_deleted_.fakedeletemodelservice.md)
* [ModelService](../classes/_service_model_.modelservice.md)
* [PostListModelService](../classes/_service_postlist_.postlistmodelservice.md)

## Index

### Methods

* [delete](_service_common_model_.modelserviceinterface.md#delete)
* [get](_service_common_model_.modelserviceinterface.md#get)
* [patch](_service_common_model_.modelserviceinterface.md#patch)
* [post](_service_common_model_.modelserviceinterface.md#post)
* [put](_service_common_model_.modelserviceinterface.md#put)

## Methods

###  delete

▸ **delete**(`options`: [ModelServiceArgsInterface](_service_common_model_.modelserviceargsinterface.md), `transaction?`: any): *Promise‹any›*

*Defined in [src/service/common/model.ts:19](https://github.com/claukers/miqro-core/blob/65c3631/src/service/common/model.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [ModelServiceArgsInterface](_service_common_model_.modelserviceargsinterface.md) |
`transaction?` | any |

**Returns:** *Promise‹any›*

___

###  get

▸ **get**(`options`: [ModelServiceArgsInterface](_service_common_model_.modelserviceargsinterface.md), `transaction?`: any, `skipLocked?`: boolean): *Promise‹any›*

*Defined in [src/service/common/model.ts:11](https://github.com/claukers/miqro-core/blob/65c3631/src/service/common/model.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [ModelServiceArgsInterface](_service_common_model_.modelserviceargsinterface.md) |
`transaction?` | any |
`skipLocked?` | boolean |

**Returns:** *Promise‹any›*

___

###  patch

▸ **patch**(`options`: [ModelServiceArgsInterface](_service_common_model_.modelserviceargsinterface.md), `transaction?`: any): *Promise‹any›*

*Defined in [src/service/common/model.ts:17](https://github.com/claukers/miqro-core/blob/65c3631/src/service/common/model.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [ModelServiceArgsInterface](_service_common_model_.modelserviceargsinterface.md) |
`transaction?` | any |

**Returns:** *Promise‹any›*

___

###  post

▸ **post**(`options`: [ModelServiceArgsInterface](_service_common_model_.modelserviceargsinterface.md), `transaction?`: any): *Promise‹any›*

*Defined in [src/service/common/model.ts:13](https://github.com/claukers/miqro-core/blob/65c3631/src/service/common/model.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [ModelServiceArgsInterface](_service_common_model_.modelserviceargsinterface.md) |
`transaction?` | any |

**Returns:** *Promise‹any›*

___

###  put

▸ **put**(`options`: [ModelServiceArgsInterface](_service_common_model_.modelserviceargsinterface.md), `transaction?`: any): *Promise‹any›*

*Defined in [src/service/common/model.ts:15](https://github.com/claukers/miqro-core/blob/65c3631/src/service/common/model.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [ModelServiceArgsInterface](_service_common_model_.modelserviceargsinterface.md) |
`transaction?` | any |

**Returns:** *Promise‹any›*
