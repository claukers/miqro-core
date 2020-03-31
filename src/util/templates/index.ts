// noinspection SpellCheckingInspection

export const logEnvFile = `####################
## logging
LOG_LEVEL="info"
LOG_LEVEL_Sequelize="error"
LOG_FILE=./logs/dev.log
#LOG_FILE_TRACE=./logs/dev-trace.log
`;

export const featuresEnvFile = `####################
## features
FEATURE_TOGGLE_BODYPARSER=true
#FEATURE_TOGGLE_MY_CUSTOM_FEATURE=true
`;

export const dbEnvFile = `####################
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
`;

export const expressEnvFile = `####################
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
`;

export const authEnvFile = `####################
## Auth
TOKEN_LOCATION=header
#TOKEN_LOCATION=query
TOKEN_VERIFY_LOCATION=header
#TOKEN_VERIFY_LOCATION=query
TOKEN_HEADER=Authorization
#TOKEN_QUERY=Authorization
#TOKEN_VERIFY_ENDPOINT=
TOKEN_VERIFY_ENDPOINT_METHOD=GET
`;


// noinspection SpellCheckingInspection,SpellCheckingInspection
export const gitignore = `logs/
node_modules/
*.sqlite3
`;

// noinspection SpellCheckingInspection
export const mainjs = (servicePath) => {
  // noinspection SpellCheckingInspection
  return `const express = require("express");
const { Util } = require("@miqro/core");
const { setupMiddleware } = require("@miqro/handlers");
Util.loadConfig();

const logger = Util.getLogger("main.js");
const service = require("./${servicePath}");

const app = express();
setupMiddleware(app, logger);
service(app).then((server) => {
  server.listen(process.env.PORT);
}).catch((e) => {
  logger.error(e);
});
`;
};

// noinspection SpellCheckingInspection
export const indexjs = () => {
  // noinspection SpellCheckingInspection
  return `const {
  APIResponse
} = require("@miqro/handlers");
const {
  Database
} = require("@miqro/database");
const {
  Util
} = require("@miqro/core");
const path = require("path");

module.exports = async (app) => {
  const logger = Util.getLogger(path.basename(__filename));
  const db = await Database.getInstance();

  app.get("/hello", async (req, res) => {
    logger.info("GET /hello called!");
    await new APIResponse({
      result: "world"
    }).send(res);
  });
  logger.info("started");
  return app;
};
`;
};

// noinspection SpellCheckingInspection
const servicejs = (serviceName: string) => {
  // noinspection SpellCheckingInspection
  return `const { Util } = require("@miqro/core");

class ${serviceName}Service {
  static getInstance() {
    ${serviceName}Service.instance = ${serviceName}Service.instance ? ${serviceName}Service.instance : new ${serviceName}Service();
    return ${serviceName}Service.instance;
  }
  constructor() {
    this.logger = Util.getLogger("${serviceName}Service");
  }
  async myFunction({ body, params, query, session, headers }) {
    this.logger.info("myFunction has been called!");
    return null;
  }
}

module.exports.${serviceName}Service = ${serviceName}Service;

`;
};

// noinspection SpellCheckingInspection
export const templates = {
  gitignore,
  servicejs,
  indexjs,
  mainjs,
  logEnvFile,
  authEnvFile,
  dbEnvFile,
  expressEnvFile,
  featuresEnvFile
};
