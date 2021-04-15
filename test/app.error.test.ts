import { describe, it } from "mocha";
import { App, Context, TestHelper } from "../src";
import { strictEqual } from "assert";

describe("app error func tests", function () {
  for (const c of [{
    type: "Error",
    message: "bla",
    impl: async (ctx: Context) => {
      throw new Error(`bla`);
    }
  }, {
    type: "string",
    message: "ble",
    impl: async (ctx: Context) => {
      throw "ble"
    }
  }, {
    type: "boolean",
    message: "true",
    impl: async (ctx: Context) => {
      throw true
    }
  }, {
    type: "undefined",
    message: "undefined",
    impl: async (ctx: Context) => {
      throw undefined
    }
  }, {
    type: "null",
    message: "null",
    impl: async (ctx: Context) => {
      throw null
    }
  }]) {
    it(`catch unkown ${c.type} with 503 on TEST and show stack`, (done) => {
      const app = new App();
      app.get("/hello", c.impl);
      TestHelper(app, {
        url: `/hello`
      }, (response) => {
        console.log(require("util").inspect({
          status: response.status,
          headers: response.headers,
          data: response.data
        }));
        strictEqual(response.status, 503);
        strictEqual(response.data.message.indexOf(c.message), 0);
        done();
      });
    });
    it(`catch unkown ${c.type} with 503 on DEVELOPMENT and show stack`, (done) => {
      const oldEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";
      const app = new App();
      app.get("/hello", c.impl);
      TestHelper(app, {
        url: `/hello`
      }, (response) => {
        process.env.NODE_ENV = oldEnv;
        console.log(require("util").inspect({
          status: response.status,
          headers: response.headers,
          data: response.data
        }));
        strictEqual(response.status, 503);
        strictEqual(response.data.message.indexOf(c.message), 0);
        done();
      });
    });
    it(`catch unkown ${c.type} with 503 on ASDLJ and hide stack and error message`, (done) => {
      const oldEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "ASDLJ";
      const app = new App();
      app.get("/hello", c.impl);
      TestHelper(app, {
        url: `/hello`
      }, (response) => {
        process.env.NODE_ENV = oldEnv;
        console.log(require("util").inspect({
          status: response.status,
          headers: response.headers,
          data: response.data
        }));
        strictEqual(response.status, 503);
        strictEqual(response.data.message, "SERVER ERROR");
        done();
      });
    });
  }
});
