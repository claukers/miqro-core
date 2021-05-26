import { describe, it } from "mocha";
import path from "path";
import { strictEqual } from "assert";
import { App, Router, BadRequestError, Util, TestHelper as FuncTestHelper } from "../src";
import { inspect } from "util";

process.env.LOG_LEVEL = "debug";

describe("router functional tests", function () {
  this.timeout(10000);

  it("router2 token path", (done) => {
    const app = new App();
    const router = new Router();
    app.use(router, "/api");
    router.get("/user/:name/:bla/asd", async (ctx) => {
      ctx.json({
        params: ctx.params
      });
    });
    FuncTestHelper(app, {
      url: `/api/user/bla/ble/asd`,
      method: "get"
    }, (res) => {
      let { status, data, headers } = res;
      console.log(inspect({ status, data, headers }));
      strictEqual(status, 200);
      strictEqual(data.params.name, "bla");
      strictEqual(data.params.bla, "ble");
      done();
    });
  });

  it("nested simple happy path", (done) => {
    const app = new App();
    const router = new Router();
    router.get("/ble", async (ctx) => {
      throw new BadRequestError(`bla`);
    });
    app.use(router, "/api");
    router.get("/bla", async (ctx) => {
      ctx.json({
        status: "OK"
      });
    });
    app.get("/api/blo", async () => {
      throw new BadRequestError(`blo`);
    });
    const router2 = new Router();
    router.use(router2, "/bli/blu");

    router2.get("/blubli", [async (ctx) => {
      return "OK2";
    }, async (ctx) => {
      ctx.json({
        status: ctx.results[0]
      });
    }]);

    FuncTestHelper(app, {
      url: `/api/bla`,
      method: "get"
    }, (res) => {
      let { status, data, headers } = res;
      console.log(inspect({ status, data, headers }));

      strictEqual(headers['content-type'], "application/json; charset=utf-8");
      strictEqual(headers['content-length'], "15");
      strictEqual(status, 200);
      strictEqual(data.status, "OK");

      FuncTestHelper(app, {
        url: `/api/ble`,
        method: "get"
      }, (res) => {
        let { status, data, headers } = res;
        console.log(inspect({ status, data, headers }));

        strictEqual(headers['content-type'], "plain/text; charset=utf-8");
        strictEqual(headers['content-length'], "3");
        strictEqual(status, 400);

        strictEqual(data, "bla");

        FuncTestHelper(app, {
          url: `/api/blo`,
          method: "get"
        }, (res) => {
          let { status, data, headers } = res;
          console.log(inspect({ status, data, headers }));

          strictEqual(headers['content-type'], "plain/text; charset=utf-8");
          strictEqual(headers['content-length'], "3");
          strictEqual(status, 400);

          strictEqual(data, "blo");

          FuncTestHelper(app, {
            url: `/api/bli/blu/blubli`,
            method: "get"
          }, (res) => {
            let { status, data, headers } = res;
            console.log(inspect({ status, data, headers }));

            strictEqual(headers['content-type'], "application/json; charset=utf-8");
            strictEqual(headers['content-length'], "16");
            strictEqual(status, 200);
            strictEqual(data.status, "OK2");

            done();
          });
        });
      });
    });
  });
});
