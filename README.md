# @miqro/core

this module provides helpers functions to develop nodejs applications like **logging**, **config** and **request parsing**

```javascript
const {
  request,
  loadConfig,
  overrideConfig,
  getLogger,
  getComponentLogger,
  isFeatureEnabled,
  parseOptions,
} = require("@miqro/core");

// this should load env files in config/$NODE_ENV/*.env into process.env
const output = loadConfig();

// this should load env files in directoryPath into process.env
loadConfig(directoryPath);

// force the load of an env file into process.env
overrideConfig("other.env");

// this will throw if ENV_VAR_A doesnt exists
checkEnvVariables(["ENV_VAR_A"]);

// this logger will be created using the factory in config/log.js if the file exists.
// also this logger will respect LOG_LEVEL_MyIdentifier=debug|warn|info|error Env var as its log level
const logger = getLogger("MyIdentifier");
logger.info("infolog");
logger.warn("warnlog");
logger.error("errorlog");
logger.debug("debuglog");

const mainLogger = getComponentLogger(); // this will produce a logger named myscript where myscript is the service name
const moduleALogger = getComponentLogger("moduleA"); // this will produce a logger named myscript.moduleA where myscript is the service name

// this is a wrapper for https|http request method using a Promise that follows redirects
const response = await request({
    url:...,
    ignoreRedirect: false,
    ....
});

// this will check if FEATURE_TOGGLE_BODY_PARSER env var is set to true.
if(isFeatureEnabled("body_parser")) {
  logger.info("body_parser feature enabled");
}

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

// this will not and "resultWithExtra" will have any extra attrs data may have
const resultWithExtra = parseOptions("person", data, [
  { name: "name", type: "string", required: true },
  { name: "age", type: "number", required: true },
  { name: "likes", type: "array", required: true, arrayType: "string" }
], "add_extra");

// neither will this, but this will discard the extra attrs in data in "resultWithoutExtra"
const resultWithoutExtra = parseOptions("person", data, [
  { name: "name", type: "string", required: true },
  { name: "age", type: "number", required: true },
  { name: "likes", type: "array", required: true, arrayType: "string" }
], "remove_extra");
```

###### custom logger factory example

```config/log.js```

```javascript
module.exports = (identifier) => {
  return console;
};
```

###### custom transport

```config/log.js```

```javascript
const {DefaultLogger} = require("@miqro/core");

module.exports = (identifier) => {
  const level = (process.env[`LOG_LEVEL_${identifier}`] || process.env.LOG_LEVEL || "info");
  const logger = new DefaultLogger(identifier, level);
  logger.on("write", ({level, out}) => {
    ....
  });
  return logger;
};
```

###### change format

```config/log.js```

```javascript
const {DefaultLogger} = require("@miqro/core");

module.exports = (identifier) => {
  const level = (process.env[`LOG_LEVEL_${identifier}`] || process.env.LOG_LEVEL || "info");
  const myFormatter = (level, message) => {
    return `${new Date().toISOString()} ${pid} ` +
      `[${identifier}] ` +
      `${level !== "info" ? (level === "error" || level === "warn" ? `[${level.toUpperCase()}] ` : `[${level}] `) : ""}` +
      `${message}`;
  };
  const logger = new DefaultLogger(identifier, level, myFormatter);
  return logger;
};
```

