import {describe, it} from 'mocha';
import {strictEqual} from "assert";

describe('GroupPolicyValidator func tests', function () {
  this.timeout(10000);
  it("happy path mix tape 1 invalid auth", (done) => {
    const {GroupPolicyValidator} = require("../src");
    GroupPolicyValidator.validate({account: "a", username: "u", groups: ["1", "2", "3"]}, {
      groups: [["5", "1"], ["3", "4"], "5"],
      groupPolicy: "at_least_one"
    }, {
      info: console.log,
      debug: console.log,
      warn: console.warn,
      trace: console.log,
      error: console.error
    }).catch((e: Error) => {
      strictEqual(e.message, "Invalid session. You are not permitted to do this!");
      done();
    });
  });
  it("happy path mix tape 1 valid auth", (done) => {
    const {GroupPolicyValidator} = require("../src");
    GroupPolicyValidator.validate({account: "a", username: "u", groups: ["1", "4", "3"]}, {
      groups: [["5", "1"], ["3", "4"], "5"],
      groupPolicy: "at_least_one"
    }, {
      info: console.log,
      debug: console.log,
      warn: console.warn,
      trace: console.log,
      error: console.error
    }).then((ret: boolean) => {
      strictEqual(ret, true);
      done();
    });
  });
  it("happy path mix tape 2 valid auth", (done) => {
    const {GroupPolicyValidator} = require("../src");
    GroupPolicyValidator.validate({account: "a", username: "u", groups: ["6", "4", "3"]}, {
      groups: [["5", "1"], ["3", "4", "6"], "5"],
      groupPolicy: "at_least_one"
    }, {
      info: console.log,
      debug: console.log,
      warn: console.warn,
      trace: console.log,
      error: console.error
    }).then((ret: boolean) => {
      strictEqual(ret, true);
      done();
    });
  });
  it("happy path mix tape 2 invalid auth", (done) => {
    const {GroupPolicyValidator} = require("../src");
    GroupPolicyValidator.validate({account: "a", username: "u", groups: ["6", "0", "3"]}, {
      groups: [["5", "1"], ["3", "4", "6"], "5"],
      groupPolicy: "at_least_one"
    }, {
      info: console.log,
      debug: console.log,
      warn: console.warn,
      trace: console.log,
      error: console.error
    }).catch((e: Error) => {
      strictEqual(e.message, "Invalid session. You are not permitted to do this!");
      done();
    });
  });

  it("happy path mix tape 2 invalid policu", (done) => {
    const {GroupPolicyValidator} = require("../src");
    GroupPolicyValidator.validate({account: "a", username: "u", groups: ["6", "0", "3"]}, {
      groups: [["5", "1"], ["3", "4", "6"], "5"],
      groupPolicy: "invalid_policy"
    }, {
      info: console.log,
      debug: console.log,
      warn: console.warn,
      trace: console.log,
      error: console.error
    }).catch((e: Error) => {
      strictEqual(e.message, "policy [invalid_policy] not implemented!!");
      done();
    });
  });

  it("happy path handler mix tape 1 invalid", (done) => {
    const { GroupPolicyHandler, App, TestHelper } = require("../src");
    const app = new App();
    app.post("/bla", [
      async (ctx: any)=>{
        ctx.session = {account: "a", username: "u", groups: ["1", "2", "3"]};
      },
      GroupPolicyHandler({
        groups: [["5", "1"], ["3", "4"], "5"],
        groupPolicy: "at_least_one"
      }),
      async (ctx: any)=>{
        ctx.json({
          test: 1
        });
      }
    ]);
    TestHelper(app, {
      url: `/bla`,
      method: "post"
    }, (res: any) => {
      strictEqual(res.status, 403);
      done();
    });
  });

  it("happy path handler mix tape 1 valid auth", (done) => {
    const { GroupPolicyHandler, App, TestHelper } = require("../src");
    const app = new App();
    app.post("/bla", [
      async (ctx: any)=>{
        ctx.session = {account: "a", username: "u", groups: ["1", "4", "3"]};
      },
      GroupPolicyHandler({
        groups: [["5", "1"], ["3", "4"], "5"],
        groupPolicy: "at_least_one"
      }),
      async (ctx: any)=>{
        ctx.json({
          test: 1
        });
      }
    ]);
    TestHelper(app, {
      url: `/bla`,
      method: "post"
    }, (res: any) => {
      strictEqual(res.data.test, 1);
      done();
    });
  });
});
