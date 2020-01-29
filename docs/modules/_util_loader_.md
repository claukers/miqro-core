[miqro-core](../README.md) › [Globals](../globals.md) › ["util/loader"](_util_loader_.md)

# External module: "util/loader"

## Index

### Variables

* [combine](_util_loader_.md#combine)
* [defaultLogFormat](_util_loader_.md#const-defaultlogformat)
* [label](_util_loader_.md#label)
* [printf](_util_loader_.md#printf)
* [timestamp](_util_loader_.md#timestamp)

### Functions

* [defaultLoggerFactory](_util_loader_.md#const-defaultloggerfactory)
* [winstonConfig](_util_loader_.md#const-winstonconfig)

## Variables

###  combine

• **combine**: *combine*

*Defined in [src/util/loader.ts:8](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/loader.ts#L8)*

___

### `Const` defaultLogFormat

• **defaultLogFormat**: *Format‹›* = printf((info) => {
  const pid = process.pid;
  const envString = pid;
  const component = info.label;
  const level = info.level;
  const text = info.message;
  const ret = `${new Date(info.timestamp).getTime()} ${envString} ` +
    `[${component}] ` +
    `${level !== "info" ? (level === "error" || level === "warn" ? `[${level.toUpperCase()}] ` : `[${level}] `) : ""}` +
    `${text}`;
  return ret;
})

*Defined in [src/util/loader.ts:14](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/loader.ts#L14)*

___

###  label

• **label**: *label*

*Defined in [src/util/loader.ts:9](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/loader.ts#L9)*

___

###  printf

• **printf**: *printf*

*Defined in [src/util/loader.ts:10](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/loader.ts#L10)*

___

###  timestamp

• **timestamp**: *timestamp*

*Defined in [src/util/loader.ts:11](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/loader.ts#L11)*

## Functions

### `Const` defaultLoggerFactory

▸ **defaultLoggerFactory**(`identifier`: any): *object*

*Defined in [src/util/loader.ts:27](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/loader.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`identifier` | any |

**Returns:** *object*

* **format**: *Format‹›* = combine(
      label({
        label: identifier
      }),
      timestamp(),
      logFormat
    )

* **transports**: *any[]* = transportList

___

### `Const` winstonConfig

▸ **winstonConfig**(): *any*

*Defined in [src/util/loader.ts:61](https://github.com/claukers/miqro-core/blob/4847fd5/src/util/loader.ts#L61)*

**Returns:** *any*
