import { after, before, describe, it } from 'mocha';
import { App, Context, request, Util } from "../src/";
import { existsSync, unlinkSync } from "fs";
import { Server } from "http";
import { strictEqual } from "assert";
import { middleware } from "@miqro/handlers";


describe('lib.Util.request func tests', function () {
  this.timeout(100000);
  let server: Server;
  let serverPort: Server;
  const SOCKET_PATH = "/tmp/socket.1111";
  const PORT = 8080;

  before((done) => {
    (async () => {
      if (existsSync(SOCKET_PATH))
        unlinkSync(SOCKET_PATH);
      const app = new App();
      const appPort = new App();
      const redirectNoHostHandler = async (ctx: Context) => {
        ctx.redirect(`/hello?format=txt&otherQ=3`, undefined, 302);
      };
      const redirectWithDifferentHostHandler = async (ctx: Context) => {
        ctx.redirect(`http://localhost:${PORT + 1}/hello?format=txt&otherQ=4`, undefined, 302);
      };
      const redirectHandler = async (ctx: Context) => {
        ctx.redirect(`http://localhost:${PORT}/hello?format=txt&otherQ=2`, undefined, 302);
      }
      app.use(middleware());
      app.catch(async (e: Error) => {
        console.error("=app=");
        console.error(e);
        console.error("==");
      });
      appPort.use(middleware());
      appPort.catch(async (e: Error) => {
        console.error("=appPort=");
        console.error(e);
        console.error("==");
      });
      const sumhandler = async (ctx: Context) => {
        strictEqual(ctx.body instanceof Array, true);
        let ret = 0;
        for (const r of ctx.body) {
          ret += r.val;
        }
        ctx.end({
          status: 200,
          headers: {},
          body: `${ret}`
        });
      };
      const helloHandler = async (ctx: Context) => {
        const format = ctx.query.format;
        const otherQ = ctx.query.otherQ;

        if (ctx.method === "POST" && format === "json") {
          strictEqual(ctx.body.bla, 1);
        } else if (ctx.method === "POST" && format === "txt") {
          strictEqual(ctx.body, "blo");
        }

        if (otherQ !== "1" && otherQ !== "2" && otherQ !== "3" && otherQ !== "4") {
          ctx.end({
            status: 503,
            headers: {},
            body: "not valid otherQ [" + ctx.query.otherQ + "]"
          });
        } else {
          switch (format) {
            case "txt":
              if (otherQ !== "1") {
                ctx.end({
                  status: 200,
                  headers: {},
                  body: "hello2"
                });
              } else {
                ctx.end({
                  status: 200,
                  headers: {},
                  body: "hello"
                });
              }
              break;
            case "json":
              ctx.json({
                ble: 2
              });
              break;
            default:
              ctx.end({
                status: 400,
                headers: {},
                body: "not valid format [" + ctx.query.format + "]"
              });
          }
        }
      };
      app.get("/hello", helloHandler);
      appPort.post("/post/hello", helloHandler);
      appPort.post("/post/sum", sumhandler);
      app.post("/post/hello", helloHandler);
      app.post("/put/hello", helloHandler);
      app.get("/redirect", redirectHandler);
      appPort.get("/hello", helloHandler);
      appPort.get("/redirectNoHostHandler", redirectNoHostHandler);
      appPort.get("/redirectWithDifferentHostHandler", redirectWithDifferentHostHandler);
      // appPort.use(require("compression")({ threshold: 0 }));
      appPort.get("/compressHello", helloHandler);
      server = app.listen(SOCKET_PATH);
      serverPort = appPort.listen(PORT);
    })().then(done).catch(done);
  });

  after((done) => {
    (async () => {
      server.close();
      serverPort.close();
    })().then(done).catch(done);
  })

  it('simple get /hello?format=txt happy path', (done) => {
    (async () => {
      const { data, status, buffer, headers } = await Util.request({
        url: "http://localhost:8080/hello?format=txt&otherQ=1",
        method: "get"
      });
      strictEqual(data, "hello");
      strictEqual(status, 200);
    })().then(done).catch(done);
  });

  it('simple get /hello?format=txt happy path not using util', (done) => {
    (async () => {
      const { data, status } = await request({
        url: "http://localhost:8080/hello?format=txt&otherQ=1",
        method: "get"
      });
      strictEqual(data, "hello");
      strictEqual(status, 200);
    })().then(done).catch(done);
  });

  it('simple get /hello?format=txt happy path not using util query from options', (done) => {
    (async () => {
      const { data, status } = await request({
        url: "http://localhost:8080/hello",
        query: {
          format: "txt",
          otherQ: 1
        },
        method: "get"
      });
      strictEqual(data, "hello");
      strictEqual(status, 200);
    })().then(done).catch(done);
  });

  it('simple get /hello?format=txt happy path not using util query from options with hash', (done) => {
    (async () => {
      const { data, status } = await request({
        url: "http://localhost:8080/hello#hash1",
        query: {
          format: "txt",
          otherQ: 1
        },
        method: "get"
      });
      strictEqual(data, "hello");
      strictEqual(status, 200);
    })().then(done).catch(done);
  });

  it('simple get /hello?format=txt happy path not using util query from options and url', (done) => {
    (async () => {
      const { data, status } = await request({
        url: "http://localhost:8080/hello?otherQ=1",
        query: {
          format: "txt"
        },
        method: "get"
      });
      strictEqual(data, "hello");
      strictEqual(status, 200);
    })().then(done).catch(done);
  });

  it('simple get /hello?format=txt happy path not using util query from options and url and hash', (done) => {
    (async () => {
      const { data, status } = await request({
        url: "http://localhost:8080/hello?otherQ=1#hashs",
        query: {
          format: "txt"
        },
        method: "get"
      });
      strictEqual(data, "hello");
      strictEqual(status, 200);
    })().then(done).catch(done);
  });

  it('cannot get with data', (done) => {
    (async () => {
      try {
        await Util.request({
          url: "anyurl",
          method: "get",
          data: 1
        });
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "cannot send data on method get");
      }
    })().then(done).catch(done);
  });

  it('simple post /hello happy path', (done) => {
    (async () => {
      const { data, status } = await Util.request({
        url: "http://localhost:8080/post/hello?format=txt&otherQ=1",
        method: "POST",
        data: "blo"
      });
      strictEqual(data, "hello");
      strictEqual(status, 200);
    })().then(done).catch(done);
  });

  it('simple post /post/sum happy path', (done) => {
    (async () => {
      const resp = await Util.request({
        url: "http://localhost:8080/post/sum",
        method: "POST",
        data: [{ val: 1 }, { val: 2 }]
      });
      strictEqual(resp.data, "3");
      strictEqual(resp.status, 200);
    })().then(done).catch(done);
  });

  it('simple post /post/sum happy path with utf-8', (done) => {
    (async () => {
      const resp = await Util.request({
        url: "http://localhost:8080/post/sum",
        method: "POST",
        data: [{ val: 1, ñ: "ññññ" }, { val: 2 }]
      });
      strictEqual(resp.data, "3");
      strictEqual(resp.status, 200);
    })().then(done).catch(done);
  });

  it('simple post /hello happy path over unix socket', (done) => {
    (async () => {
      const { data, status } = await Util.request({
        url: "/post/hello?format=txt&otherQ=1",
        method: "POST",
        data: "blo",
        socketPath: SOCKET_PATH
      });
      strictEqual(data, "hello");
      strictEqual(status, 200);
    })().then(done).catch(done);
  });


  /*it('simple get /compressHello?format=txt with gzip encoding happy path over unixsocket url act as path', (done) => {
    (async () => {
      const { data, status, headers, buffer } = await Util.request({
        url: "http://localhost:8080/compressHello?format=txt&otherQ=1",
        method: "get",
        headers: {
          ["Accept-Encoding"]: "gzip"
        }
      });
      strictEqual(data, "hello");
      strictEqual(headers["content-encoding"], "gzip");
      strictEqual(status, 200);
    })().then(done).catch(done);
  });*/

  it('simple get /hello?format=txt happy path over unixsocket url act as path', (done) => {
    (async () => {
      const { data, status } = await Util.request({
        url: "/hello?format=txt&otherQ=1",
        socketPath: SOCKET_PATH,
        method: "get"
      });
      strictEqual(data, "hello");
      strictEqual(status, 200);
    })().then(done).catch(done);
  });

  it('simple get /hello?format=json happy path', (done) => {
    (async () => {
      const { data, status } = await Util.request({
        url: "http://localhost:8080/hello?format=json&otherQ=1",
        method: "get"
      });
      strictEqual(data.ble, 2);
      strictEqual(status, 200);
    })().then(done).catch(done);
  });

  it('simple get /hello?format=json happy path over unixsocket', (done) => {
    (async () => {
      const { data, status } = await Util.request({
        url: "/hello?format=json&otherQ=1",
        socketPath: SOCKET_PATH,
        method: "get"
      });
      strictEqual(data.ble, 2);
      strictEqual(status, 200);
    })().then(done).catch(done);
  });

  it('simple get /hello?format=txt happy path over unixsocket', (done) => {
    (async () => {
      try {
        const { data, status, redirectedUrl, locations } = await Util.request({
          url: "/hello?format=txt&otherQ=1",
          socketPath: SOCKET_PATH,
          method: "get"
        });
        strictEqual(data, "hello");
        strictEqual(status, 200);
        strictEqual(redirectedUrl, null);
      } catch (e) {
        throw e;
      }
    })().then(done).catch(done);
  });

  it('simple get /hello?format=notvalid happy path 400 throws over unixsocket', (done) => {
    (async () => {
      try {
        await Util.request({
          url: "/hello?format=notvalid&otherQ=1",
          socketPath: SOCKET_PATH,
          method: "get"
        });
        strictEqual(true, false);
      } catch (e) {
        const { redirectedUrl, data, status, name } = e;
        strictEqual(name, "ResponseError");
        strictEqual(data, "not valid format [notvalid]");
        strictEqual(status, 400);
        strictEqual(redirectedUrl, null);
      }
    })().then(done).catch(done);
  });

  it('simple get follow redirect', (done) => {
    (async () => {
      const { url, redirectedUrl, status, data } = await Util.request({
        url: "/redirect",
        method: "get",
        socketPath: SOCKET_PATH,
        followRedirect: true
      });
      strictEqual(status, 200);
      strictEqual(redirectedUrl, "http://localhost:8080/hello?format=txt&otherQ=2");
      strictEqual(url, "/redirect");
      strictEqual(data, "hello2");
    })().then(done).catch(done);
  });

  it('simple get follow redirect with no host', (done) => {
    (async () => {
      const { url, redirectedUrl, status, data, locations } = await Util.request({
        url: "http://localhost:8080/redirectNoHostHandler",
        method: "get",
        followRedirect: true
      });
      strictEqual(status, 200);
      strictEqual(redirectedUrl, "http://localhost:8080/hello?format=txt&otherQ=3");
      strictEqual(locations[0], redirectedUrl);
      strictEqual(url, "http://localhost:8080/redirectNoHostHandler");
      strictEqual(data, "hello2");
    })().then(done).catch(done);
  });

  it('simple get follow redirect with different host and ECONNREFUSED', (done) => {
    (async () => {
      try {
        await Util.request({
          url: "http://localhost:8080/redirectWithDifferentHostHandler",
          method: "get",
          followRedirect: true
        });
        strictEqual(true, false);
      } catch (e) {
        const { name, code, url, redirectedUrl, status, data } = e as any;
        strictEqual(status, undefined);
        strictEqual(code, "ECONNREFUSED");
        strictEqual(name, "ResponseConnectionRefusedError");
        strictEqual(redirectedUrl, "http://localhost:8081/hello?format=txt&otherQ=4");
        strictEqual(url, "http://localhost:8080/redirectWithDifferentHostHandler");
        strictEqual(data, undefined);
      }
    })().then(done).catch(done);
  });

  it('simple get ignore redirects by default throws', (done) => {
    (async () => {
      try {
        await Util.request({
          url: "/redirect",
          method: "get",
          socketPath: SOCKET_PATH
        });
        strictEqual(true, false);
      } catch ({ url, redirectedUrl, status, name }) {
        strictEqual(status, 302);
        strictEqual(name, "ResponseError");
        strictEqual(redirectedUrl, null);
        strictEqual(url, "/redirect");
      }

    })().then(done).catch(done);
  });
});
