import {describe, it} from "mocha";
import {expect} from "chai";
import {resolve} from "path";

process.env.NODE_ENV = "test";

describe("Util loader tests", () => {

  it("getLogger without log.js and without loadConfig should work", (done) => {
    (async () => {
      const lib = require("../src");
      lib.Util.configLoaded = false;
      const logger = lib.Util.getLogger("bla");
      expect(logger).to.not.be.equals(undefined);
      expect(logger).to.not.be.equals(null);
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
      expect(process.env.one).to.be.equals("1");
      expect(process.env.two).to.be.equals("2");
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
      expect(lib.ConfigPathResolver.getConfigDirname()).to.be.equals(resolve(__dirname, "data", "blo", "test"));
      expect(lib.ConfigPathResolver.getServiceDirname()).to.be.equals(resolve(__dirname, "data", "bla"));
      process.chdir(cwd);
    })().then(done).catch(done);
  });
});
