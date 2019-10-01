import * as fs from "fs";
import * as path from "path";
import { Util } from "../util";
import { templates } from "../util/templates";

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

const servicesFolderPath = path.resolve(path.dirname(path.resolve(modulePath)), "services");
if(!fs.existsSync(servicesFolderPath)) {
  logger.warn(`services folder [${servicesFolderPath}] dont exists!`);
  logger.warn(`creating [${servicesFolderPath}]!`);
  fs.mkdirSync(servicesFolderPath);
}
const servicePath = path.resolve(servicesFolderPath, `${serviceName.toLowerCase()}.js`);

if (fs.existsSync(servicePath)) {
  throw new Error(`${servicePath} already exists!`);
}
logger.info(`creating [${servicePath}]!`);
fs.writeFileSync(servicePath, templates.servicejs(serviceName));
