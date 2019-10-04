import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('grouppolicy func tests', function () {
  it("happy path mix tape 1 invalid auth", (done) => {
    const { GroupPolicy } = require("../src");
    GroupPolicy.validateSession({ account: "a", username: "u", groups: ["1", "2", "3"] }, {
      groups: [["5", "1"], ["3", "4"], "5"],
      groupPolicy: "at_leats_one"
    }, {
      info: console.log,
      debug: console.log,
      warn: console.warn,
      error: console.error
    }).catch((e) => {
      expect(e.message).to.be.equals("Invalid session. You are not permitted to do this!");
      done();
    });
  });
  it("happy path mix tape 1 valid auth", (done) => {
    const { GroupPolicy } = require("../src");
    GroupPolicy.validateSession({ account: "a", username: "u", groups: ["1", "4", "3"] }, {
      groups: [["5", "1"], ["3", "4"], "5"],
      groupPolicy: "at_leats_one"
    }, {
      info: console.log,
      debug: console.log,
      warn: console.warn,
      error: console.error
    }).then((ret) => {
      expect(ret).to.be.equals(true);
      done();
    });
  });
  it("happy path mix tape 2 valid auth", (done) => {
    const { GroupPolicy } = require("../src");
    GroupPolicy.validateSession({ account: "a", username: "u", groups: ["6", "4", "3"] }, {
      groups: [["5", "1"], ["3", "4", "6"], "5"],
      groupPolicy: "at_leats_one"
    }, {
      info: console.log,
      debug: console.log,
      warn: console.warn,
      error: console.error
    }).then((ret) => {
      expect(ret).to.be.equals(true);
      done();
    });
  });
  it("happy path mix tape 2 invalid auth", (done) => {
    const { GroupPolicy } = require("../src");
    GroupPolicy.validateSession({ account: "a", username: "u", groups: ["6", "0", "3"] }, {
      groups: [["5", "1"], ["3", "4", "6"], "5"],
      groupPolicy: "at_leats_one"
    }, {
      info: console.log,
      debug: console.log,
      warn: console.warn,
      error: console.error
    }).catch((e) => {
      expect(e.message).to.be.equals("Invalid session. You are not permitted to do this!");
      done();
    });
  });
});
