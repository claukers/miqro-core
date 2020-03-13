import {describe, it} from "mocha";
import {expect} from "chai";
import {resolve} from "path";

describe("Util loader tests", () => {

  it("getLogger without log.js and without loadConfig should work", (done) => {
    (async () => {
      const lib = require("../src");
      const logger = lib.Util.getLogger("bla");
      expect(logger).to.not.be.equals(undefined);
      expect(logger).to.not.be.equals(null);
    })().then(done).catch(done);
  });

  it("loadConfig without .env file should work", (done) => {
    (async () => {
      const lib = require("../src");
      lib.Util.loadConfig();
    })().then(done).catch(done);
  });

  it("loadConfig with .miqrorc file should change defaults con ConfigPathLoader", (done) => {
    (async () => {
      const lib = require("../src");
      const cwd = process.cwd();
      process.chdir(resolve(__dirname, "data"));
      lib.Util.loadConfig();
      expect(lib.ConfigPathResolver.getConfigDirname()).to.be.equals(resolve(__dirname, "data", "blo"));
      expect(lib.ConfigPathResolver.getServiceDirname()).to.be.equals(resolve(__dirname, "data", "bla"));
      process.chdir(cwd);
    })().then(done).catch(done);
  });
});
