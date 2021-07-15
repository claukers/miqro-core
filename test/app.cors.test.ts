import { describe, it } from "mocha";
import { App, Context, CORS, TestHelper } from "../src";
import { strictEqual } from "assert";

describe("app cors func tests", function () {
  it("append multiple vary headers 1", (done) => {
    const app = new App();
    app.get("/", (ctx: Context) => {
      ctx.setHeader("Vary", ["Origin", "ble"])
      ctx.html("bla");
    });
    TestHelper(app, {
      url: "/"
    }, (response) => {
      console.log(response.status);
      console.log(response.headers);
      strictEqual(response.status, 200);
      strictEqual(response.headers.vary, "Origin, ble");
      done();
    });
  });
  it("append multiple vary headers 2", (done) => {
    const app = new App();
    app.get("/", (ctx: Context) => {
      ctx.setHeader("Vary", ["bla", "ble"])
      ctx.addVaryHeader("Origin");
      ctx.addVaryHeader("Bla");
      ctx.html("bla");
    });
    TestHelper(app, {
      url: "/"
    }, (response) => {
      console.log(response.status);
      console.log(response.headers);
      strictEqual(response.status, 200);
      strictEqual(response.headers.vary, "bla, ble, Origin, Bla");
      done();
    });
  });
  it("append multiple vary headers 3", (done) => {
    const app = new App();
    app.get("/", (ctx: Context) => {
      ctx.addVaryHeader("Origin");
      ctx.addVaryHeader("Cache");
      ctx.html("bla");
    });
    TestHelper(app, {
      url: "/"
    }, (response) => {
      console.log(response.status);
      console.log(response.headers);
      strictEqual(response.status, 200);
      strictEqual(response.headers.vary, "Origin, Cache");
      done();
    });
  });
  it("append multiple vary headers 4", (done) => {
    const app = new App();
    app.get("/", (ctx: Context) => {
      ctx.addVaryHeader("Origin");
      ctx.addVaryHeader("Cache");
      ctx.setHeader("vary", "replace")
      ctx.html("bla");
    });
    TestHelper(app, {
      url: "/"
    }, (response) => {
      console.log(response.status);
      console.log(response.headers);
      strictEqual(response.status, 200);
      strictEqual(response.headers.vary, "replace");
      done();
    });
  });
  it("append multiple vary headers *", (done) => {
    const app = new App();
    app.get("/", (ctx: Context) => {
      ctx.addVaryHeader("Origin");
      ctx.addVaryHeader("*");
      ctx.html("bla");
    });
    TestHelper(app, {
      url: "/"
    }, (response) => {
      console.log(response.status);
      console.log(response.headers);
      strictEqual(response.status, 200);
      strictEqual(response.headers.vary, "*");
      done();
    });
  });
  it("happy path", (done) => {
    const app = new App();
    app.use(CORS());
    app.get("/", (ctx: Context) => {
      ctx.html("bla");
    });
    TestHelper(app, {
      url: "/",
      headers: {
        Origin: "http://bla.com:123"
      },
      method: "OPTIONS"
    }, (response) => {
      console.log(response.status);
      console.log(response.headers);
      strictEqual(response.status, 204);
      strictEqual(response.headers.vary, "Origin");
      strictEqual(response.headers["access-control-allow-origin"], "*");
      strictEqual(response.headers["access-control-allow-methods"], "GET,HEAD,PUT,PATCH,POST,DELETE");
      done();
    });
  });
  it("happy path 2", (done) => {
    const app = new App();
    app.use(CORS());
    app.get("/", (ctx: Context) => {
      ctx.html("bla");
    });
    TestHelper(app, {
      url: "/",
      headers: {
        Origin: "http://bla.com:123"
      },
      method: "GET"
    }, (response) => {
      console.log(response.status);
      console.log(response.headers);
      strictEqual(response.status, 200);
      strictEqual(response.headers.vary, "Origin");
      strictEqual(response.headers["access-control-allow-origin"], "*");
      done();
    });
  });

  it("happy path 3", (done) => {
    const app = new App();
    app.use(CORS({ origins: ["http://bla.com"] }));
    app.get("/", (ctx: Context) => {
      ctx.html("bla");
    });
    TestHelper(app, {
      url: "/",
      headers: {
        Origin: "http://bla.com"
      },
      method: "GET"
    }, (response) => {
      console.log(response.status);
      console.log(response.headers);
      strictEqual(response.status, 200);
      strictEqual(response.headers.vary, "Origin");
      strictEqual(response.headers["access-control-allow-origin"], "http://bla.com");
      done();
    });
  });

  it("happy path 4", (done) => {
    const app = new App();
    app.use(CORS({ origins: ["http://bla.com"] }));
    app.get("/", (ctx: Context) => {
      ctx.html("bla");
    });
    TestHelper(app, {
      url: "/",
      headers: {
        Origin: "http://ble.com"
      },
      method: "GET"
    }, (response) => {
      console.log(response.status);
      console.log(response.headers);
      strictEqual(response.status, 400);
      strictEqual(response.data, "bad origin");
      done();
    });
  });

  it("happy path 5", (done) => {
    const app = new App();
    app.use(CORS({ origins: ["http://bla.com"] }));
    app.get("/", (ctx: Context) => {
      ctx.html("bla");
    });
    TestHelper(app, {
      url: "/",
      headers: {
        Origin: "http://ble.com"
      },
      method: "OPTIONS"
    }, (response) => {
      console.log(response.status);
      console.log(response.headers);
      strictEqual(response.status, 400);
      strictEqual(response.data, "bad origin");
      done();
    });
  });

  it("happy path 6", (done) => {
    const app = new App();
    app.use(CORS({ origins: ["http://bla.com"] }));
    app.get("/", (ctx: Context) => {
      ctx.html("bla");
    });
    TestHelper(app, {
      url: "/",
      headers: {
      },
      method: "OPTIONS"
    }, (response) => {
      console.log(response.status);
      console.log(response.headers);
      strictEqual(response.status, 204);
      strictEqual(response.headers.vary, "Origin");
      strictEqual(response.headers["access-control-allow-origin"], "http://bla.com");
      done();
    });
  });
});
