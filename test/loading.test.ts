import {describe, it} from "mocha";
import {strictEqual} from "assert";
import {resolve} from "path";

process.env.NODE_ENV = "test";

describe("Util loader tests", () => {

  it("getLogger without log.js and without loadConfig should work", (done) => {
    (async () => {
      const lib = require("../src");
      lib.Util.configLoaded = false;
      const logger = lib.Util.getLogger("bla");
      strictEqual(logger !== undefined, true);
      strictEqual(logger !== null, true);
    })().then(done).catch(done);
  });

  it("loadConfig without .env file should work", (done) => {
    (async () => {
      const lib = require("../src");
      lib.Util.configLoaded = false;
      lib.Util.loadConfig();
    })().then(done).catch(done);
  })

  it("loadConfig with multiple env files should work", (done) => {
    (async () => {
      const lib = require("../src");
      lib.Util.configLoaded = false;
      const old = process.env.MIQRO_DIRNAME;
      process.env.MIQRO_DIRNAME = resolve(__dirname, "data2");
      lib.Util.loadConfig();
      strictEqual(process.env.one, "1");
      strictEqual(process.env.two, "2");
      delete process.env.MIQRO_DIRNAME;
    })().then(done).catch(done);
  });

  it("loadConfig with multiple env files should override", (done) => {
    (async () => {
      const lib = require("../src");
      lib.Util.configLoaded = false;
      const old = process.env.MIQRO_DIRNAME;
      process.env.MIQRO_DIRNAME = resolve(__dirname, "data3");
      lib.Util.loadConfig();
      strictEqual(process.env.one, "0");
      strictEqual(process.env.two, "2");
      delete process.env.MIQRO_DIRNAME;
    })().then(done).catch(done);
  });

  it("getConfig with multiple env files should override", (done) => {
    (async () => {
      const lib = require("../src");
      lib.Util.configLoaded = false;
      const old = process.env.MIQRO_DIRNAME;
      process.env.MIQRO_DIRNAME = resolve(__dirname, "data3");
      const list = lib.Util.getConfig();
      strictEqual(process.env.one, "0");
      strictEqual(process.env.two, "2");
      strictEqual(list.outputs.length, 2);
      strictEqual(list.combined.one, "0");
      strictEqual(list.combined.two, "2");
      strictEqual(list.outputs[0].one, "1");
      strictEqual(list.outputs[1].one, "0");
      delete process.env.MIQRO_DIRNAME;
    })().then(done).catch(done);
  });

  it("loadConfig with .miqrorc file should change defaults con ConfigPathLoader", (done) => {
    (async () => {
      const lib = require("../src");
      lib.Util.configLoaded = false;
      const cwd = process.cwd();
      process.chdir(resolve(__dirname, "data"));
      lib.Util.loadConfig();
      strictEqual(lib.ConfigPathResolver.getConfigDirname(), resolve(__dirname, "data", "blo", "test"));
      strictEqual(lib.ConfigPathResolver.getServiceDirname(), resolve(__dirname, "data", "bla"));
      process.chdir(cwd);
    })().then(done).catch(done);
  });
});
