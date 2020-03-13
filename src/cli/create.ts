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

const servicesFolderPath = ConfigPathResolver.getServiceDirname();
if (!existsSync(servicesFolderPath)) {
  logger.warn(`services folder [${servicesFolderPath}] dont exists!`);
  logger.warn(`creating [${servicesFolderPath}]!`);
  mkdirSync(servicesFolderPath, {
    recursive: true
  });
}
const servicePath = resolve(servicesFolderPath, `${serviceName.toLowerCase()}.js`);

if (existsSync(servicePath)) {
  throw new Error(`${servicePath} already exists!`);
}
logger.info(`creating [${servicePath}]!`);
writeFileSync(servicePath, templates.servicejs(serviceName));
