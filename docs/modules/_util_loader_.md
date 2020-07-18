[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/loader"](_util_loader_.md)

# Module: "util/loader"

## Index

### Type aliases

* [LoggerFactory](_util_loader_.md#loggerfactory)

### Functions

* [defaultLoggerFactory](_util_loader_.md#const-defaultloggerfactory)
* [getLoggerFactory](_util_loader_.md#const-getloggerfactory)
* [loadSequelizeRC](_util_loader_.md#const-loadsequelizerc)

## Type aliases

###  LoggerFactory

Ƭ **LoggerFactory**: *function*

*Defined in [src/util/loader.ts:11](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/loader.ts#L11)*

#### Type declaration:

▸ (`identifier`: string): *[Logger](../interfaces/_util_logger_.logger.md)*

**Parameters:**

Name | Type |
------ | ------ |
`identifier` | string |

## Functions

### `Const` defaultLoggerFactory

▸ **defaultLoggerFactory**(`identifier`: string): *[Logger](../interfaces/_util_logger_.logger.md)*

*Defined in [src/util/loader.ts:13](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/loader.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`identifier` | string |

**Returns:** *[Logger](../interfaces/_util_logger_.logger.md)*

___

### `Const` getLoggerFactory

▸ **getLoggerFactory**(): *[LoggerFactory](_util_loader_.md#loggerfactory)*

*Defined in [src/util/loader.ts:52](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/loader.ts#L52)*

**Returns:** *[LoggerFactory](_util_loader_.md#loggerfactory)*

___

### `Const` loadSequelizeRC

▸ **loadSequelizeRC**(): *object*

*Defined in [src/util/loader.ts:19](https://github.com/claukers/miqro-core/blob/cc47cc5/src/util/loader.ts#L19)*

**Returns:** *object*

* **dbConfigFilePath**: *string*

* **migrationsFolder**: *string*

* **modelsFolder**: *string*

* **seedersFolder**: *string*

* **sequelizercPath**: *any*
