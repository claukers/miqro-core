import {describe, it} from "mocha";
import {expect} from "chai";

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
});
