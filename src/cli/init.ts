import {existsSync, mkdirSync, writeFileSync} from "fs";
import {resolve} from "path";
import {ConfigPathResolver, Util} from "../util";
import {templates} from "../util/templates";

const logger = console;

if (process.argv.length !== 3) {
  // noinspection SpellCheckingInspection
  throw new Error(`usage: miqro-core init`);
}

const service = resolve(ConfigPathResolver.getBaseDirname(), `index.js`);

if (!existsSync(service)) {
  logger.warn(`microservice [${service}] doesnt exists!`);
  logger.warn(`creating [${service}]!`);
  writeFileSync(service, templates.indexjs());
}

const configPath = ConfigPathResolver.getConfigDirname();
if (!existsSync(configPath)) {
  logger.warn(`[${configPath}] doesnt exists!`);
  mkdirSync(configPath, {
    recursive: true
  });

  const initEnvFile = (path, template) => {
    if (!existsSync(path)) {
      logger.warn(`creating ${path} env file`);
      writeFileSync(path, template);
    }
  };
  initEnvFile(resolve(configPath, `log.env`), templates.logEnvFile);
  initEnvFile(resolve(configPath, `db.env`), templates.dbEnvFile);
  initEnvFile(resolve(configPath, `auth.env`), templates.authEnvFile);
  initEnvFile(resolve(configPath, `express.env`), templates.expressEnvFile);
  initEnvFile(resolve(configPath, `features.env`), templates.featuresEnvFile);
}

// noinspection SpellCheckingInspection
const gitIgnorePath = resolve(ConfigPathResolver.getBaseDirname(), ".gitignore");
if (!existsSync(gitIgnorePath)) {
  logger.warn(`creating ${gitIgnorePath} file`);
  writeFileSync(gitIgnorePath, templates.gitignore);
}

Util.setupInstanceEnv("init", service);
Util.loadConfig();
