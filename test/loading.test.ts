import {describe, it} from "mocha";
import {strictEqual} from "assert";
import {resolve} from "path";
import {
  ConfigPathResolver,
  fake,
  getLoggerFactory,
  LogContainer,
  Logger,
  LoggerEvents,
  LoggerWriteEventArgs,
  setLoggerFactory,
  Util
} from "../src/util";

process.env.NODE_ENV = "test";

describe("Util loader tests", () => {

  it("getLogger without log.js and without loadConfig should work", () => {
    LogContainer.clear();
    (Util as any).configLoaded = false;
    const logger = Util.getLogger("bla");
    strictEqual(logger !== undefined, true);
    strictEqual(logger !== null, true);
  });

  it("getLogger with custom formatting", (done) => {
    LogContainer.clear();
    (Util as any).configLoaded = false;
    const logger = Util.getLogger("bla", ({level, message}): string => `bla ${level} ${message}`);
    strictEqual(logger !== undefined, true);
    strictEqual(logger !== null, true);
    logger.on(LoggerEvents.write, ({out}: LoggerWriteEventArgs) => {
      strictEqual(out, "bla info blo");
      done();
    });
    logger.debug("ignore this");
    logger.info("blo");

  });

  it("getLogger with custom factory and formatting", (done) => {
    LogContainer.clear();
    (Util as any).configLoaded = false;
    const old = getLoggerFactory();
    const fakeFactory = fake(({identifier, level, formatter}) => {
      return new Logger("ble", "debug", formatter);
    })
    setLoggerFactory(fakeFactory);
    const logger = Util.getLogger("bla", ({level, message}): string => `bla ${level} ${message}`);
    strictEqual(logger !== undefined, true);
    strictEqual(logger !== null, true);
    logger.on(LoggerEvents.write, ({out}: LoggerWriteEventArgs) => {
      strictEqual(fakeFactory.callCount, 1);
      strictEqual(out, "bla debug blo");
      setLoggerFactory(old);
      done();
    });
    logger.debug("blo");
  });

  it("loadConfig without .env file should work", () => {
    LogContainer.clear();
    (Util as any).configLoaded = false;
    Util.loadConfig();
  })

  it("loadConfig with multiple env files should work", () => {
    (Util as any).configLoaded = false;
    const old = process.env.MIQRO_DIRNAME;
    process.env.MIQRO_DIRNAME = resolve(__dirname, "data2");
    Util.loadConfig();
    strictEqual(process.env.one, "1");
    strictEqual(process.env.two, "2");
    delete process.env.MIQRO_DIRNAME;
  });

  it("loadConfig with multiple env files should override", () => {
    (Util as any).configLoaded = false;
    const old = process.env.MIQRO_DIRNAME;
    process.env.MIQRO_DIRNAME = resolve(__dirname, "data3");
    Util.loadConfig();
    strictEqual(process.env.one, "0");
    strictEqual(process.env.two, "2");
    delete process.env.MIQRO_DIRNAME;
  });

  it("getConfig with multiple env files should override", () => {
    (Util as any).configLoaded = false;
    const old = process.env.MIQRO_DIRNAME;
    process.env.MIQRO_DIRNAME = resolve(__dirname, "data3");
    const list = Util.getConfig();
    strictEqual(process.env.one, "0");
    strictEqual(process.env.two, "2");
    strictEqual(list.outputs.length, 2);
    strictEqual(list.combined.one, "0");
    strictEqual(list.combined.two, "2");
    strictEqual(list.outputs[0].one, "1");
    strictEqual(list.outputs[1].one, "0");
    delete process.env.MIQRO_DIRNAME;
  });

  it("loadConfig with .miqrorc file should change defaults con ConfigPathLoader", () => {
    (Util as any).configLoaded = false;
    const cwd = process.cwd();
    process.chdir(resolve(__dirname, "data"));
    Util.loadConfig();
    strictEqual(ConfigPathResolver.getConfigDirname(), resolve(__dirname, "data", "blo", "test"));
    process.chdir(cwd);
  });
});
