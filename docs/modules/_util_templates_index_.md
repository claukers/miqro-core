[@miqro/core](../README.md) › [Globals](../globals.md) › ["util/templates/index"](_util_templates_index_.md)

# Module: "util/templates/index"

## Index

### Variables

* [authEnvFile](_util_templates_index_.md#const-authenvfile)
* [dbEnvFile](_util_templates_index_.md#const-dbenvfile)
* [expressEnvFile](_util_templates_index_.md#const-expressenvfile)
* [featuresEnvFile](_util_templates_index_.md#const-featuresenvfile)
* [gitignore](_util_templates_index_.md#const-gitignore)
* [logEnvFile](_util_templates_index_.md#const-logenvfile)

### Functions

* [indexjs](_util_templates_index_.md#const-indexjs)
* [mainjs](_util_templates_index_.md#const-mainjs)
* [servicejs](_util_templates_index_.md#const-servicejs)

### Object literals

* [templates](_util_templates_index_.md#const-templates)

## Variables

### `Const` authEnvFile

• **authEnvFile**: *"####################
## Auth
TOKEN_LOCATION=header
#TOKEN_LOCATION=query
TOKEN_VERIFY_LOCATION=header
#TOKEN_VERIFY_LOCATION=query
TOKEN_HEADER=Authorization
#TOKEN_QUERY=Authorization
#TOKEN_VERIFY_ENDPOINT=
TOKEN_VERIFY_ENDPOINT_METHOD=GET
"* = `####################
## Auth
TOKEN_LOCATION=header
#TOKEN_LOCATION=query
TOKEN_VERIFY_LOCATION=header
#TOKEN_VERIFY_LOCATION=query
TOKEN_HEADER=Authorization
#TOKEN_QUERY=Authorization
#TOKEN_VERIFY_ENDPOINT=
TOKEN_VERIFY_ENDPOINT_METHOD=GET
`

*Defined in [src/util/templates/index.ts:52](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L52)*

___

### `Const` dbEnvFile

• **dbEnvFile**: *"####################
## db
DB_NAME=devdb
DB_HOST=localhost
DB_PORT=3306
# should be loadad from a secret manager into process.env.DB_USER
DB_USER=
# should be loadad from a secret manager into process.env.DB_PASS
DB_PASS=
DB_DIALECT=sqlite
DB_DIALECT_SSL="true"
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDDLE=10000
DB_STORAGE=./dev.sqlite3
DB_DROPTABLES=false
"* = `####################
## db
DB_NAME=devdb
DB_HOST=localhost
DB_PORT=3306
# should be loadad from a secret manager into process.env.DB_USER
DB_USER=
# should be loadad from a secret manager into process.env.DB_PASS
DB_PASS=
DB_DIALECT=sqlite
DB_DIALECT_SSL="true"
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDDLE=10000
DB_STORAGE=./dev.sqlite3
DB_DROPTABLES=false
`

*Defined in [src/util/templates/index.ts:17](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L17)*

___

### `Const` expressEnvFile

• **expressEnvFile**: *"####################
## express
PORT=8080
HTTPS_ENABLE=false
# should be loadad from a secret manager into process.env.HTTPS_KEY
#HTTPS_KEY=
# should be loadad from a secret manager into process.env.HTTPS_CERT
#HTTPS_CERT=
####################
## body-parser
BODYPARSER_INFLATE=true
BODYPARSER_LIMIT="100kb"
BODYPARSER_STRICT=true
BODYPARSER_TYPE="application/json"
"* = `####################
## express
PORT=8080
HTTPS_ENABLE=false
# should be loadad from a secret manager into process.env.HTTPS_KEY
#HTTPS_KEY=
# should be loadad from a secret manager into process.env.HTTPS_CERT
#HTTPS_CERT=
####################
## body-parser
BODYPARSER_INFLATE=true
BODYPARSER_LIMIT="100kb"
BODYPARSER_STRICT=true
BODYPARSER_TYPE="application/json"
`

*Defined in [src/util/templates/index.ts:36](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L36)*

___

### `Const` featuresEnvFile

• **featuresEnvFile**: *"####################
## features
FEATURE_TOGGLE_BODYPARSER=true
#FEATURE_TOGGLE_MY_CUSTOM_FEATURE=true
"* = `####################
## features
FEATURE_TOGGLE_BODYPARSER=true
#FEATURE_TOGGLE_MY_CUSTOM_FEATURE=true
`

*Defined in [src/util/templates/index.ts:11](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L11)*

___

### `Const` gitignore

• **gitignore**: *"logs/
node_modules/
*.sqlite3
"* = `logs/
node_modules/
*.sqlite3
`

*Defined in [src/util/templates/index.ts:66](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L66)*

___

### `Const` logEnvFile

• **logEnvFile**: *"####################
## logging
LOG_LEVEL="info"
LOG_LEVEL_Sequelize="error"
LOG_FILE=./logs/dev.log
#LOG_FILE_TRACE=./logs/dev-trace.log
"* = `####################
## logging
LOG_LEVEL="info"
LOG_LEVEL_Sequelize="error"
LOG_FILE=./logs/dev.log
#LOG_FILE_TRACE=./logs/dev-trace.log
`

*Defined in [src/util/templates/index.ts:3](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L3)*

## Functions

### `Const` indexjs

▸ **indexjs**(): *string*

*Defined in [src/util/templates/index.ts:93](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L93)*

**Returns:** *string*

___

### `Const` mainjs

▸ **mainjs**(`servicePath`: string): *string*

*Defined in [src/util/templates/index.ts:72](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`servicePath` | string |

**Returns:** *string*

___

### `Const` servicejs

▸ **servicejs**(`serviceName`: string): *string*

*Defined in [src/util/templates/index.ts:123](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L123)*

**Parameters:**

Name | Type |
------ | ------ |
`serviceName` | string |

**Returns:** *string*

## Object literals

### `Const` templates

### ▪ **templates**: *object*

*Defined in [src/util/templates/index.ts:147](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L147)*

###  authEnvFile

• **authEnvFile**: *string*

*Defined in [src/util/templates/index.ts:153](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L153)*

###  dbEnvFile

• **dbEnvFile**: *string*

*Defined in [src/util/templates/index.ts:154](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L154)*

###  expressEnvFile

• **expressEnvFile**: *string*

*Defined in [src/util/templates/index.ts:155](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L155)*

###  featuresEnvFile

• **featuresEnvFile**: *string*

*Defined in [src/util/templates/index.ts:156](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L156)*

###  gitignore

• **gitignore**: *string*

*Defined in [src/util/templates/index.ts:148](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L148)*

###  indexjs

• **indexjs**: *indexjs*

*Defined in [src/util/templates/index.ts:150](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L150)*

###  logEnvFile

• **logEnvFile**: *string*

*Defined in [src/util/templates/index.ts:152](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L152)*

###  mainjs

• **mainjs**: *mainjs*

*Defined in [src/util/templates/index.ts:151](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L151)*

###  servicejs

• **servicejs**: *[servicejs](_util_templates_index_.md#const-servicejs)*

*Defined in [src/util/templates/index.ts:149](https://github.com/claukers/miqro-core/blob/c1853a2/src/util/templates/index.ts#L149)*
