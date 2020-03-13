import {existsSync, mkdirSync, writeFileSync} from "fs";
import {basename, dirname, resolve} from "path";
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
  const mainJSPath = resolve(dirname(service), "main.js");
  writeFileSync(service, templates.indexjs());
  if (!existsSync(mainJSPath)) {
    writeFileSync(mainJSPath, templates.mainjs(basename(service)));
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

// noinspection SpellCheckingInspection
const gitIgnorePath = resolve(ConfigPathResolver.getBaseDirname(), ".gitignore");
if (!existsSync(gitIgnorePath)) {
  logger.warn(`creating ${gitIgnorePath} file`);
  writeFileSync(gitIgnorePath, templates.gitignore);
}

Util.setupInstanceEnv("init", service);
Util.loadConfig();
