import {existsSync, mkdirSync, writeFileSync} from "fs";
import {basename, dirname, resolve} from "path";
import {Util} from "../util";
import {ConfigPathResolver} from "../util/config";
import {templates} from "../util/templates";

const logger = console;

if (process.argv.length !== 3) {
  throw new Error(`usage: miqro-core init`);
}

const service = resolve(ConfigPathResolver.getBaseDirname(), `index.js`);

if (!existsSync(service)) {
  logger.warn(`microservice [${service}] doesnt exists!`);
  logger.warn(`creating [${service}]!`);
  const mainjsPath = resolve(dirname(service), "main.js");
  writeFileSync(service, templates.indexjs());
  if (!existsSync(mainjsPath)) {
    writeFileSync(mainjsPath, templates.mainjs(basename(service)));
  }
}

const configFolder = ConfigPathResolver.getConfigDirname();
const configPath = ConfigPathResolver.getConfigFilePath();
if (!existsSync(configPath)) {
  logger.warn(`[${configPath}] env file doesnt exists!`);
  if (!existsSync(configFolder)) {
    mkdirSync(configFolder);
  }
  logger.warn(`creating a new ${configPath} env file`);
  writeFileSync(configPath, templates.defaultEnvFile);
}

const gitignorePath = resolve(ConfigPathResolver.getBaseDirname(), ".gitignore");
if (!existsSync(gitignorePath)) {
  logger.warn(`creating ${gitignorePath} file`);
  writeFileSync(gitignorePath, templates.gitignore);
}

Util.setupInstanceEnv("init", service);
Util.loadConfig();
