# miqro-core

- Utility for loading a **dotenv** file located at ```<MIQRO_DIRNAME>config/<NODE_ENV>.env```.
- Utility for creating loggers using autogenerated winston config in ```config/log.js```.
- Utility for parsing option objects attribute types.

```javascript
const {
  Util
} = require("miqro-core");

// this should load the correct env file
Util.loadConfig();

// this logger will use the transports configured in config/log.js
// also this logger will respect LOG_LEVEL_MyIdentifier=debug|warn|info|error Env var as its log level
const logger = Util.getLogger("MyIdentifier");
logger.info("infolog");
logger.warn("warnlog");
logger.error("errorlog");
logger.debug("debuglog");


const data = {
  name: "aa",
  age: 0,
  likes:["cc", "dd"],
  extra: "bb"
};
// this will throw a ParseOptionError with a message like person.extra is not expected.
/*const { name, age } = Util.parseOptions("person", data, [
  { name: "name", type: "string", required: true },
  { name: "age", type: "number", required: true },
  { name: "likes", type: "array", required: true, arrayType: "string" }
], "no_extra");*/

// this will not
const resultWithExtra = Util.parseOptions("person", data, [
  { name: "name", type: "string", required: true },
  { name: "age", type: "number", required: true },
  { name: "likes", type: "array", required: true, arrayType: "string" }
], "add_extra");

// neither will this
const resultWithoutExtra = Util.parseOptions("person", data, [
  { name: "name", type: "string", required: true },
  { name: "age", type: "number", required: true },
  { name: "likes", type: "array", required: true, arrayType: "string" }
], "ignore_extra");
```

# env files

TODO

# setup log level per identifier

TODO
