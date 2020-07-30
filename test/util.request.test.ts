import {after, before, describe, it} from 'mocha';
import {Util} from "../src/";
import express, {Request, Response} from "express";
import {existsSync, unlinkSync} from "fs";
import {Server} from "http";
import {strictEqual} from "assert";

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
      const app = express();
      const appPort = express();
      const redirectNoHostHandler = (req: Request, res: Response) => {
        res.redirect(302, `/hello?format=txt&otherQ=3`);
      };
      const redirectWithDifferentHostHandler = (req: Request, res: Response) => {
        res.redirect(302, `http://localhost:${PORT + 1}/hello?format=txt&otherQ=4`);
      };
      const redirectHandler = (req: Request, res: Response) => {
        res.redirect(302, `http://localhost:${PORT}/hello?format=txt&otherQ=2`);
      }
      const helloHandler = (req: Request, res: Response) => {
        const format = req.query.format;
        const otherQ = req.query.otherQ;

        if (req.method === "POST" && format === "json") {
          strictEqual(req.body.bla, 1);
        } else if (req.method === "POST" && format === "txt") {
          strictEqual(req.body, "blo");
        }

        if (otherQ !== "1" && otherQ !== "2" && otherQ !== "3" && otherQ !== "4") {
          res.status(503);
          res.send("not valid otherQ [" + req.query.otherQ + "]");
        } else {
          switch (format) {
            case "txt":
              res.status(200);
              if (otherQ !== "1") {
                res.send("hello2");
              } else {
                res.send("hello");
              }
              break;
            case "json":
              res.status(200);
              res.json({
                ble: 2
              });
              break;
            default:
              res.status(400);
              res.send("not valid format [" + req.query.format + "]");
          }
        }
      };
      app.get("/hello", helloHandler);
      app.get("/redirect", redirectHandler);
      appPort.get("/hello", helloHandler);
      appPort.get("/redirectNoHostHandler", redirectNoHostHandler);
      appPort.get("/redirectWithDifferentHostHandler", redirectWithDifferentHostHandler);
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
      const {data, status} = await Util.request({
        url: "http://localhost:8080/hello?format=txt&otherQ=1",
        method: "get"
      });
      strictEqual(data, "hello");
      strictEqual(status, 200);
    })().then(done).catch(done);
  });

  it('simple get /hello?format=txt happy path over unixsocket url act as path', (done) => {
    (async () => {
      const {data, status} = await Util.request({
        url: "/hello?format=txt&otherQ=1",
        socketPath: SOCKET_PATH,
        method: "get"
      });
      strictEqual(data, "hello");
      strictEqual(status, 200);
    })().then(done).catch(done);
  });

  it('simple post /hello?format=json happy path', (done) => {
    (async () => {
      const {data, status} = await Util.request({
        url: "http://localhost:8080/hello?format=json&otherQ=1",
        method: "post",
        data: {
          bla: 1
        }
      });
      strictEqual(data.ble, 2);
      strictEqual(status, 200);
    })().then(done).catch(done);
  });

  it('simple post /hello?format=json happy path over unixsocket', (done) => {
    (async () => {
      const {data, status} = await Util.request({
        url: "/hello?format=json&otherQ=1",
        socketPath: SOCKET_PATH,
        method: "post",
        data: {
          bla: 1
        }
      });
      strictEqual(data.ble, 2);
      strictEqual(status, 200);
    })().then(done).catch(done);
  });

  it('simple post /hello?format=txt happy path over unixsocket', (done) => {
    (async () => {
      const {data, status, redirectedUrl} = await Util.request({
        url: "/hello?format=txt&otherQ=1",
        socketPath: SOCKET_PATH,
        method: "post",
        data: "blo"
      });
      strictEqual(data, "hello");
      strictEqual(status, 200);
      strictEqual(redirectedUrl, null);
    })().then(done).catch(done);
  });

  it('simple post /hello?format=notvalid happy path 400 throws', (done) => {
    (async () => {
      try {
        await Util.request({
          url: "/hello?format=notvalid&otherQ=1",
          socketPath: SOCKET_PATH,
          method: "post",
          data: "blo"
        });
        strictEqual(true, false);
      } catch (e) {
        const {redirectedUrl, data, status, name} = e;
        strictEqual(name, "ResponseError");
        strictEqual(data, "not valid format [notvalid]");
        strictEqual(status, 400);
        strictEqual(redirectedUrl, null);
      }
    })().then(done).catch(done);
  });

  it('simple get follow redirect', (done) => {
    (async () => {
      const {url, redirectedUrl, status, data} = await Util.request({
        url: "/redirect",
        method: "get",
        socketPath: SOCKET_PATH
      });
      strictEqual(status, 200);
      strictEqual(redirectedUrl, "http://localhost:8080/hello?format=txt&otherQ=2");
      strictEqual(url, "/redirect");
      strictEqual(data, "hello2");
    })().then(done).catch(done);
  });

  it('simple get follow redirect with no host', (done) => {
    (async () => {
      const {url, redirectedUrl, status, data} = await Util.request({
        url: "http://localhost:8080/redirectNoHostHandler",
        method: "get"
      });
      strictEqual(status, 200);
      strictEqual(redirectedUrl, "http://localhost:8080/hello?format=txt&otherQ=3");
      strictEqual(url, "http://localhost:8080/redirectNoHostHandler");
      strictEqual(data, "hello2");
    })().then(done).catch(done);
  });

  it('simple get follow redirect with different host and ECONNREFUSED', (done) => {
    (async () => {
      try {
        await Util.request({
          url: "http://localhost:8080/redirectWithDifferentHostHandler",
          method: "get"
        });
        strictEqual(true, false);
      } catch (e) {
        const {name, code, url, redirectedUrl, status, data} = e as any;
        strictEqual(status, undefined);
        strictEqual(code, "ECONNREFUSED");
        strictEqual(name, "ResponseConnectionRefusedError");
        strictEqual(redirectedUrl, "http://localhost:8081/hello?format=txt&otherQ=4");
        strictEqual(url, "http://localhost:8080/redirectWithDifferentHostHandler");
        strictEqual(data, undefined);
      }
    })().then(done).catch(done);
  });

  it('simple get ignoreRedirect:true throws', (done) => {
    (async () => {
      try {
        await Util.request({
          url: "/redirect",
          method: "get",
          socketPath: SOCKET_PATH,
          ignoreRedirect: true
        });
        strictEqual(true, false);
      } catch ({url, redirectedUrl, status, name}) {
        strictEqual(status, 302);
        strictEqual(name, "ResponseError");
        strictEqual(redirectedUrl, null);
        strictEqual(url, "/redirect");
      }

    })().then(done).catch(done);
  });

  /*it('test list', (done) => {
    (async () => {
      const testURLS = [
        "https://www.publimetro.cl/cl/entretenimiento/2020/07/29/chef-yann-yvin-se-aburrio-se-fue-francia-tras-sufrir-violenta-encerrona.html",
        "http://planet.gnome.org/atom.xml",
        "https://www.schneier.com/blog/atom.xml",
        "http://rss.slashdot.org/Slashdot/slashdot",
        "https://cooperativa.cl/noticias/site/tax/port/all/rss_3___1.xml",
        "https://cooperativa.cl/noticias/site/tax/port/all/rss_6___1.xml",
        "https://www.elmostrador.cl/destacado/feed/",
        "http://feeds.feedburner.com/soychilecl-todas",
        "https://www.elmostrador.cl/noticias/pais/feed/",
        "https://www.elmostrador.cl/opinion/feed/",
        "https://cooperativa.cl/noticias/site/tax/port/all/rss_2___1.xml",
        //"https://arstechnica.com/"
      ];
      const responses = await Promise.all(testURLS.map(url => {
        return Util.request({
          url,
          method: "get"
        });
      }));
      for (const {status} of responses) {
        strictEqual(status, 200);
      }
      strictEqual(responses.length, testURLS.length);
    })().then(done).catch(done);
});*/
});
