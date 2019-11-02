import {existsSync, mkdirSync, writeFileSync} from "fs";
import {dirname, resolve} from "path";
import {templates} from "../util/templates";

const logger = console;
const modulePath = process.argv[3];
const serviceName = process.argv[4];

if (process.argv.length !== 5) {
  throw new Error(`usage: miqro-core createservice <microservice.js> <servicename>`);
}
if (typeof modulePath !== "string") {
  throw new Error(`<microservice.js> must be a string!`);
}

if (typeof serviceName !== "string") {
  throw new Error(`<servicename> must be a string!`);
}

const servicesFolderPath = resolve(dirname(resolve(modulePath)), "services");
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
