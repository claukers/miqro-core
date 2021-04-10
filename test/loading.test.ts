import {describe, it} from "mocha";
import {strictEqual} from "assert";
import {resolve} from "path";
import {
  ConfigPathResolver,
  fake,
  getLoggerFactory,
  initLoggerFactory,
  LoaderCache,
  LogContainer,
  Logger,
  LoggerTransportWriteArgs,
  setLoggerFactory,
  Util
} from "../src/util";

process.env.NODE_ENV = "test";

describe("Util loader tests", () => {

  it("getLogger without log.js and without loadConfig should work", () => {
    LogContainer.clear();
    LoaderCache.clear();
    process.env.LOG_LEVEL_bla = "trace";
    const logger = Util.getLogger("bla");
    logger.info("info");
    logger.warn("warn");
    logger.error("error");
    logger.debug("debug");
    logger.trace("trace");
    strictEqual(logger !== undefined, true);
    strictEqual(logger !== null, true);
  });

  it("getLogger with custom transport level", (done) => {
    LogContainer.clear();
    LoaderCache.clear();
    const commonWrite = fake(({out})=> {
      strictEqual(false, true, "bad state");
    });
    const customLevelWrite = fake(({out})=> {
      strictEqual(out, "bla debug blo");
    });
    process.env.LOG_LEVEL_bla = "info";
    const logger = Util.getLogger("bla", {
      transports: [{
        write: commonWrite
      }, {
        level: "debug",
        write: customLevelWrite
      }], formatter: ({level, message}): string => `bla ${level} ${message}`
    });
    strictEqual(logger !== undefined, true);
    strictEqual(logger !== null, true);
    logger.debug("blo");
    strictEqual(commonWrite.callCount, 0);
    strictEqual(customLevelWrite.callCount, 1);
    done(); 
  });

  it("getLogger with custom formatting", (done) => {
    LogContainer.clear();
    LoaderCache.clear();
    process.env.LOG_LEVEL_bla = "info";
    const logger = Util.getLogger("bla", {
      transports: [{
        write: ({out}: LoggerTransportWriteArgs) => {
          strictEqual(out, "bla info blo");
          done();
        }
      }], formatter: ({level, message}): string => `bla ${level} ${message}`
    });
    strictEqual(logger !== undefined, true);
    strictEqual(logger !== null, true);
    logger.debug("ignore this");
    logger.info("blo");
  });

  it("getLogger with custom factory and formatting", (done) => {
    LogContainer.clear();
    LoaderCache.clear();
    const old = getLoggerFactory();
    const fakeFactory = fake(({identifier, options, level}) => {
      return new Logger("ble", "debug", options);
    })
    setLoggerFactory(fakeFactory);
    const logger = Util.getLogger("bla", {
      transports: [
        {
          write: ({out}: LoggerTransportWriteArgs) => {
            strictEqual(fakeFactory.callCount, 1);
            strictEqual(out, "bla debug blo");
            setLoggerFactory(old);
            setTimeout(done, 100);
          }
        }
      ], formatter: ({level, message}): string => `bla ${level} ${message}`
    });
    strictEqual(logger !== undefined, true);
    strictEqual(logger !== null, true);
    logger.debug("blo");
  });

  it("loadConfig without .env file should work", () => {
    LogContainer.clear();
    LoaderCache.config = false;
    Util.loadConfig();
  })

  it("loadConfig with multiple env files should work", () => {
    LoaderCache.clear();
    const old = process.env.MIQRO_DIRNAME;
    process.env.MIQRO_DIRNAME = resolve(__dirname, "data2");
    Util.loadConfig();
    strictEqual(process.env.one, "1");
    strictEqual(process.env.two, "2");
    delete process.env.MIQRO_DIRNAME;
  });

  it("loadConfig with multiple env files should override", () => {
    LoaderCache.clear();
    const old = process.env.MIQRO_DIRNAME;
    process.env.MIQRO_DIRNAME = resolve(__dirname, "data3");
    Util.loadConfig();
    strictEqual(process.env.one, "0");
    strictEqual(process.env.two, "2");
    delete process.env.MIQRO_DIRNAME;
  });

  it("getConfig with multiple env files should override", () => {
    LogContainer.clear();
    LoaderCache.clear();
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
    LogContainer.clear();
    LoaderCache.clear();
    const cwd = process.cwd();
    process.chdir(resolve(__dirname, "data"));
    Util.loadConfig();
    strictEqual(ConfigPathResolver.getConfigDirname(), resolve(__dirname, "data", "blo", "test"));
    process.chdir(cwd);
  });

  it("loadConfig with .miqrorc and log.js with initLoggerFactory", (done) => {
    LogContainer.clear();
    LoaderCache.config = false;
    LoaderCache.rc = false;
    LoaderCache.loggerFactory = false;
    const cwd = process.cwd();
    process.chdir(resolve(__dirname, "data4"));
    Util.loadConfig();
    strictEqual(ConfigPathResolver.getConfigDirname(), resolve(__dirname, "data4", "blo", "test"));
    initLoggerFactory();
    const logger = Util.getLogger("bla", {
      transports: [
        {
          write: ({out}: LoggerTransportWriteArgs) => {
            strictEqual(out, "blo bll debug bli");
            LoaderCache.clear();
            setTimeout(done, 100);
          }
        }
      ],
      formatter: ({identifier, level, message}): string => `${identifier} bll ${level} ${message}`
    });
    strictEqual(logger !== undefined, true);
    strictEqual(logger !== null, true);
    logger.debug("bli");
    process.chdir(cwd);
  });
});
