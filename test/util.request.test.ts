import {after, before, describe, it} from 'mocha';
import {expect} from 'chai';
import {Util} from "../src/";
import Express, {Request, Response} from "express";
import {existsSync, unlinkSync} from "fs";
import {Server} from "http";

describe('lib.Util.request func tests', function () {
  let server: Server;
  let serverPort: Server;
  const SOCKET_PATH = "/tmp/socket.1111";
  const PORT = 8080;

  before((done) => {
    (async () => {
      if (existsSync(SOCKET_PATH))
        unlinkSync(SOCKET_PATH);
      const app = Express();
      const appPort = Express();
      const redirectHandler = (req: Request, res: Response) => {
        res.redirect(302, `http://localhost:${PORT}/hello?format=txt&otherQ=2`);
      }
      const helloHandler = (req: Request, res: Response) => {
        const format = req.query.format;
        const otherQ = req.query.otherQ;

        if (req.method === "POST" && format === "json") {
          expect(req.body.bla).to.be.equals(1);
        } else if (req.method === "POST" && format === "txt") {
          expect(req.body).to.be.equals("blo");
        }

        if (otherQ !== "1" && otherQ !== "2") {
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
      expect(data).to.be.equals("hello");
      expect(status).to.be.equals(200);
    })().then(done).catch(done);
  });

  it('simple get /hello?format=txt happy path over unixsocket url act as path', (done) => {
    (async () => {
      const {data, status} = await Util.request({
        url: "/hello?format=txt&otherQ=1",
        socketPath: SOCKET_PATH,
        method: "get"
      });
      expect(data).to.be.equals("hello");
      expect(status).to.be.equals(200);
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
      expect(data.ble).to.be.equals(2);
      expect(status).to.be.equals(200);
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
      expect(data.ble).to.be.equals(2);
      expect(status).to.be.equals(200);
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
      expect(data).to.be.equals("hello");
      expect(status).to.be.equals(200);
      expect(redirectedUrl).to.be.equals(null);
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
        expect(true).to.be.equals(false);
      } catch (e) {
        const {redirectedUrl, data, status} = e;
        expect(data).to.be.equals("not valid format [notvalid]");
        expect(status).to.be.equals(400);
        expect(redirectedUrl).to.be.equals(null);
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
      expect(status).to.be.equals(200);
      expect(redirectedUrl).to.be.equals("http://localhost:8080/hello?format=txt&otherQ=2");
      expect(url).to.be.equals("/redirect");
      expect(data).to.be.equals("hello2");
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
        expect(true).to.be.equals(false);
      } catch ({url, redirectedUrl, status}) {
        expect(status).to.be.equals(302);
        expect(redirectedUrl).to.be.equals(null);
        expect(url).to.be.equals("/redirect");
      }

    })().then(done).catch(done);
  });

  /*it('test list', (done) => {
    (async () => {
      const testURLS = [
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
        "https://arstechnica.com/"
      ];
      const responses = await Promise.all(testURLS.map(url => {
        return Util.request({
          url,
          method: "get"
        });
      }));
      for (const {status} of responses) {
        expect(status).to.be.equals(200);
      }
      expect(responses.length).to.be.equals(testURLS.length);
    })().then(done).catch(done);
  });*/
});
