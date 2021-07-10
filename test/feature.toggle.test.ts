import { describe, it } from 'mocha';
import { strictEqual } from "assert";

describe('FeatureToggle func tests', function () {
  this.timeout(10000);

  it("happy path true", () => {
    const { isFeatureEnabled } = require("../src");
    process.env["MY_FEATURE"] = "true";
    strictEqual(isFeatureEnabled("MY_FEATURE"), true);
  });

  it("happy path FeatureToggle abstract class", () => {
    const { FeatureToggle } = require("../src");
    process.env["MY_FEATURE"] = "true";
    strictEqual(FeatureToggle.isFeatureEnabled("MY_FEATURE"), true);
  });

  it("happy path undefined enabled by default", () => {
    const { isFeatureEnabled } = require("../src");
    delete process.env["MY_FEATURE"];
    strictEqual(isFeatureEnabled("MY_FEATURE"), true);
  });

  it("happy path false", () => {
    const { isFeatureEnabled } = require("../src");
    process.env["MY_FEATURE"] = "false";
    strictEqual(isFeatureEnabled("MY_FEATURE"), false);
  });

  it("happy path any", () => {
    const { isFeatureEnabled } = require("../src");
    (process.env as any)["MY_FEATURE"] = { asd: 1 };
    strictEqual(isFeatureEnabled("MY_FEATURE"), false);
  });

  it("happy path null", () => {
    const { isFeatureEnabled } = require("../src");
    (process.env as any)["MY_FEATURE"] = null;
    strictEqual(isFeatureEnabled("MY_FEATURE"), false);
  });

  it("feature router happy path", (done) => {
    const { LoggerHandler, FeatureRouter, App, TestHelper, ParseRequest, ReadBuffer, JSONParser } = require("../src");
    const app = new App();
    app.use(FeatureRouter({
      BLA: {
        path: "/bla",
        methods: ["post"],
        handler: [
          ReadBuffer(),
          JSONParser(),
          LoggerHandler(),
          ParseRequest({
            body: {
              options: {
                name: "string"
              },
              mode: "no_extra"
            }
          }),
          async (ctx: any) => {
            ctx.json({
              text: 1
            })
          }
        ]
      }
    }));
    TestHelper(app, {
      url: `/bla`,
      method: "post",
      data: {
        name: "asd"
      }
    }, (res: any) => {
      console.log(res.status);
      console.log(res.data);
      strictEqual(res.data.text, 1);
      done();
    });
  });

  it("feature router happy path disable", (done) => {
    const { FeatureRouter, App, TestHelper } = require("../src");
    const app = new App();
    (process.env as any)["BLA"] = false;
    app.use(FeatureRouter({
      BLA: {
        path: "/bla",
        methods: ["post"],
        handler: [
          async (ctx: any) => {
            ctx.json({
              text: 1
            })
          }
        ]
      }
    }));
    TestHelper(app, {
      url: `/bla`,
      method: "post"
    }, (res: any) => {
      delete (process.env as any)["BLA"];
      strictEqual(res.status, 404);
      done();
    });
  });
});
