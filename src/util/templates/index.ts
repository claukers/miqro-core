const logjs =
  `const path = require("path");
const winston = require("winston");
const {
  format
} = winston;
const {
  combine,
  label,
  printf,
  timestamp
} = format;

["LOG_FILE", "LOG_FILE_TRACE"].forEach((envName) => {
  if (process.env[envName] === undefined) {
    throw new Error(\`Env variable [\${envName}!] not defined. Maybe you are missing Util.loadConfig(); call on your app.\`);
  }
});

const logFormat = printf((info) => {
  const pid = process.pid;
  const envString = pid;
  const component = info.label;
  const level = info.level;
  const text = info.message;
  const ret = \`\${new Date(info.timestamp).getTime()} \${envString} \` +
    \`[\${component}] \` +
    \`\${level !== "info" ? (level === "error" || level === "warn" ? \`[\${level.toUpperCase()}] \` : \`[\${level}] \`) : ""}\` +
    \`\${text}\`;
  return ret;
});

module.exports = (identifier) => {
  const level = process.env[\`LOG_LEVEL_\${identifier}\`] || process.env.LOG_LEVEL;
  return {
    format: combine(
      label({
        label: identifier
      }),
      timestamp(),
      logFormat
    ),
    transports: [
      new winston.transports.Console({
        level
      }),
      new winston.transports.File({
        level,
        filename: path.resolve(process.env.LOG_FILE)
      }),
      new winston.transports.File({
        level: "silly",
        filename: path.resolve(process.env.LOG_FILE_TRACE)
      })
    ]

  };
};
`;

export const defaultEnvFile = `####################
## logging
LOG_LEVEL="debug"
LOG_LEVEL_Sequelize="error"
####################
## body-parser
#FEATURE_TOGGLE_BODYPARSER=true
#BODYPARSER_INFLATE=true
#BODYPARSER_LIMIT="100kb"
#BODYPARSER_STRICT=true
#BODYPARSER_TYPE="application/json"
####################
## db
#DB_NAME=devdb
#DB_HOST=localhost
#DB_PORT=3306
# should be loadad from a secret manager into process.env.DB_USER
#DB_USER=
# should be loadad from a secret manager into process.env.DB_PASS
#DB_PASS=
#DB_DIALECT=sqlite
#DB_DIALECT_SSL="true"
#DB_POOL_MAX=5
#DB_POOL_MIN=0
#DB_POOL_ACQUIRE=30000
#DB_POOL_IDDLE=10000
#DB_STORAGE=./dev.sqlite3
#DB_DROPTABLES=false
####################
## express
#PORT=8080
#HTTPS_ENABLE=false
# should be loadad from a secret manager into process.env.HTTPS_KEY
#HTTPS_KEY=
# should be loadad from a secret manager into process.env.HTTPS_CERT
#HTTPS_CERT=
####################
## jsonwebtoken
#JWT_HEADER=X-MYSERVICE-TOKEN
# should be loadad from a secret manager into process.env.JWT_SECRET
#JWT_SECRET=
#JWT_EXPIRATION=3d
####################
`;

export const gitignore = `config/log.js
config/db.js
logs/
db/models/index.js
node_modules/
*.sqlite3
.sequelizerc
`;

export const mainjs = (servicejs) => {
  return `const express = require("express");
const { Util } = require("miqro-core");
const { setupMiddleware } = require("miqro-express");
process.env.MIQRO_DIRNAME = process.env.MIQRO_DIRNAME ? process.env.MIQRO_DIRNAME : __dirname;
Util.loadConfig();

const logger = Util.getLogger("main.js");
const service = require("./${servicejs}");

const app = express();
setupMiddleware(app, logger);
service(app).then((server) => {
  server.listen(process.env.PORT);
}).catch((e) => {
  logger.error(e);
});
`;
};

export const indexjs = () => {
  return `const {
  APIResponse
} = require("miqro-express");
const {
  Database
} = require("miqro-sequelize");
const {
  Util
} = require("miqro-core");
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

const servicejs = (serviceName: string)=>{
  return `const { Util } = require("miqro-core");

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

export const templates = {
  gitignore,
  servicejs,
  indexjs,
  mainjs,
  defaultEnvFile,
  logjs
};
