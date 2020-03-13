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

const configPath = ConfigPathResolver.getConfigFilePath();
if (!existsSync(configPath)) {
  logger.warn(`[${configPath}] env file doesnt exists!`);
  const configFolder = ConfigPathResolver.getConfigDirname();
  if (!existsSync(configFolder)) {
    logger.warn(`[${configFolder}] folder doesnt exists!`);
    logger.warn(`creating ${configFolder} folder`);
    mkdirSync(configFolder, {
      recursive: true
    });
  }
  logger.warn(`creating a new ${configPath} env file`);
  writeFileSync(configPath, templates.defaultEnvFile);
}

// noinspection SpellCheckingInspection
const gitIgnorePath = resolve(ConfigPathResolver.getBaseDirname(), ".gitignore");
if (!existsSync(gitIgnorePath)) {
  logger.warn(`creating ${gitIgnorePath} file`);
  writeFileSync(gitIgnorePath, templates.gitignore);
}

Util.setupInstanceEnv("init", service);
Util.loadConfig();
