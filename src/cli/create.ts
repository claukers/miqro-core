import {existsSync, mkdirSync, writeFileSync} from "fs";
import {resolve} from "path";
import {ConfigPathResolver} from "../util";
import {templates} from "../util/templates";

const logger = console;
const serviceName = process.argv[3];

if (process.argv.length !== 4) {
  // noinspection SpellCheckingInspection
  throw new Error(`usage: miqro-core createservice <servicename>`);
}

if (typeof serviceName !== "string") {
  throw new Error(`<servicename> must be a string!`);
}

const srcFolderPath = ConfigPathResolver.getSrcDirname();
if (!existsSync(srcFolderPath)) {
  logger.warn(`src folder [${srcFolderPath}] dont exists!`);
  logger.warn(`creating [${srcFolderPath}]!`);
  mkdirSync(srcFolderPath);
}
const servicesFolderPath = ConfigPathResolver.getServiceDirname();
if (!existsSync(servicesFolderPath)) {
  logger.warn(`services folder [${servicesFolderPath}] dont exists!`);
  logger.warn(`creating [${servicesFolderPath}]!`);
  mkdirSync(servicesFolderPath);
}
const servicePath = resolve(servicesFolderPath, `${serviceName.toLowerCase()}.js`);

if (existsSync(servicePath)) {
  throw new Error(`${servicePath} already exists!`);
}
logger.info(`creating [${servicePath}]!`);
writeFileSync(servicePath, templates.servicejs(serviceName));
