[@miqro/core](../README.md) › [Globals](../globals.md) › ["cli/init"](_cli_init_.md)

# Module: "cli/init"

## Index

### Variables

* [configPath](_cli_init_.md#const-configpath)
* [gitIgnorePath](_cli_init_.md#const-gitignorepath)
* [logger](_cli_init_.md#const-logger)
* [service](_cli_init_.md#const-service)

## Variables

### `Const` configPath

• **configPath**: *string* = ConfigPathResolver.getConfigDirname()

*Defined in [src/cli/init.ts:21](https://github.com/claukers/miqro-core/blob/c1853a2/src/cli/init.ts#L21)*

___

### `Const` gitIgnorePath

• **gitIgnorePath**: *string* = resolve(ConfigPathResolver.getBaseDirname(), ".gitignore")

*Defined in [src/cli/init.ts:44](https://github.com/claukers/miqro-core/blob/c1853a2/src/cli/init.ts#L44)*

___

### `Const` logger

• **logger**: *Console* = console

*Defined in [src/cli/init.ts:6](https://github.com/claukers/miqro-core/blob/c1853a2/src/cli/init.ts#L6)*

___

### `Const` service

• **service**: *string* = resolve(ConfigPathResolver.getBaseDirname(), `index.js`)

*Defined in [src/cli/init.ts:13](https://github.com/claukers/miqro-core/blob/c1853a2/src/cli/init.ts#L13)*
