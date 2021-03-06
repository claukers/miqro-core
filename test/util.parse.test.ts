import { strictEqual } from "assert";
import { describe, it, utils } from 'mocha';
import { URL } from "url";
import { inspect } from "util";

describe('lib.Util.parse unit tests', function () {

  describe('lib.Util.parse unit tests decimals', function () {

    it('no_extra test', (done) => {
      const test = async () => {
        try {
          const { parse } = require("../src");
          parse("argName", {
            blaasd: "1"
          }, [
            { name: "bla", type: "number", defaultValue: 1 },
          ], "no_extra");
          strictEqual(false, true);
        } catch (e) {
          strictEqual(e.message, "argName.blaasd option not valid [blaasd]");
        }
      };
      test().then(done).catch(done);
    });

    it('minDecimal', (done) => {
      const test = async () => {
        const { parse } = require("../src");
        const ret = parse("argName", {
          bla: "1.2"
        }, [
          { name: "bla", type: "number", numberMinDecimals: 1 },
        ], "no_extra");
        strictEqual(ret.bla, 1.2);
        try {
          parse("argName", {
            bla: "1"
          }, [
            { name: "bla", type: "number", numberMinDecimals: 1 },
          ], "no_extra");
          strictEqual(false, true);
        } catch (e) {
          strictEqual(e.message, "argName.bla not number min decimals[1]");
        }
        try {
          parse("argName", {
            bla: "1.223"
          }, [
            { name: "bla", type: "number", numberMinDecimals: 4 },
          ], "no_extra");
          strictEqual(false, true);
        } catch (e) {
          strictEqual(e.message, "argName.bla not number min decimals[4]");
        }
        const ret2 = parse("argName", {
          bla: "1231231.2234"
        }, [
          { name: "bla", type: "number", numberMinDecimals: 4 },
        ], "no_extra");
        strictEqual(ret2.bla, 1231231.2234);
      };
      test().then(done).catch(done);
    });

    it('maxDecimal', (done) => {
      const test = async () => {
        const { parse } = require("../src");
        const ret = parse("argName", {
          bla: "1.2"
        }, [
          { name: "bla", type: "number", numberMaxDecimals: 1 },
        ], "no_extra");
        strictEqual(ret.bla, 1.2);
        try {
          parse("argName", {
            bla: "1.23"
          }, [
            { name: "bla", type: "number", numberMaxDecimals: 1 },
          ], "no_extra");
          strictEqual(false, true);
        } catch (e) {
          strictEqual(e.message, "argName.bla not number max decimals[1]");
        }
        try {
          parse("argName", {
            bla: "1231.223"
          }, [
            { name: "bla", type: "number", numberMaxDecimals: 2 },
          ], "no_extra");
          strictEqual(false, true);
        } catch (e) {
          strictEqual(e.message, "argName.bla not number max decimals[2]");
        }
        const ret2 = parse("argName", {
          bla: "1231231.2234"
        }, [
          { name: "bla", type: "number", numberMaxDecimals: 4 },
        ], "no_extra");
        strictEqual(ret2.bla, 1231231.2234);
      };
      test().then(done).catch(done);
    });

    it('maxDecimal && minDecimal', (done) => {
      const test = async () => {
        const { parse } = require("../src");
        const ret = parse("argName", {
          bla: "1.2"
        }, [
          { name: "bla", type: "number", numberMinDecimals: 1, numberMaxDecimals: 1 },
        ], "no_extra");
        strictEqual(ret.bla, 1.2);
        try {
          parse("argName", {
            bla: "1.23"
          }, [
            { name: "bla", type: "number", numberMinDecimals: 0, numberMaxDecimals: 1 },
          ], "no_extra");
          strictEqual(false, true);
        } catch (e) {
          strictEqual(e.message, "argName.bla not number min decimals[0] max decimals[1]");
        }
        try {
          parse("argName", {
            bla: "1231.223"
          }, [
            { name: "bla", type: "number", numberMaxDecimals: 1 },
          ], "no_extra");
          strictEqual(false, true);
        } catch (e) {
          strictEqual(e.message, "argName.bla not number max decimals[1]");
        }
        const ret2 = parse("argName", {
          bla: "1231231.2234"
        }, [
          { name: "bla", type: "number", numberMinDecimals: 0, numberMaxDecimals: 4 },
        ], "no_extra");
        strictEqual(ret2.bla, 1231231.2234);

        const ret3 = parse("argName", {
          bla: "1231231.2234"
        }, [
          { name: "bla", type: "number", numberMinDecimals: 4, numberMaxDecimals: 4 },
        ], "no_extra");
        strictEqual(ret3.bla, 1231231.2234);
      };
      test().then(done).catch(done);
    });

    it('noDecimal', (done) => {
      const test = async () => {
        const { parse } = require("../src");
        try {
          parse("argName", {
            bla: "1231.223"
          }, [
            { name: "bla", type: "number", numberMaxDecimals: 0 },
          ], "no_extra");
          strictEqual(false, true);
        } catch (e) {
          strictEqual(e.message, "argName.bla not number max decimals[0]");
        }
        const ret = parse("argName", {
          bla: "1231"
        }, [
          { name: "bla", type: "number", numberMaxDecimals: 0 },
        ], "no_extra");
        strictEqual(ret.bla, 1231);
      };
      test().then(done).catch(done);
    });
  });

  it('mail happy path no dmoain 2', (done) => {
    const test = async () => {
      const { parse } = require("../src");
      try {
        parse("argName", {
          bla: "as@d@asd"
        }, [
          { name: "bla", type: "email" }
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.bla not email");
      }

    };
    test().then(done).catch(done);
  });

  it('mail happy path no dmoain', (done) => {
    const test = async () => {
      const { parse } = require("../src");
      try {
        parse("argName", {
          bla: "asd@asd"
        }, [
          { name: "bla", type: "email" }
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.bla not email");
      }

    };
    test().then(done).catch(done);
  });

  it('email happy path', (done) => {
    const test = async () => {
      const { parse } = require("../src");
      const { bla } = parse("argName", {
        bla: "asd@asd.dds"
      }, [
        { name: "bla", type: "email" }
      ], "no_extra");
      strictEqual(typeof bla === "string", true);
    };
    test().then(done).catch(done);
  });

  it('email happy path sub dmoain', (done) => {
    const test = async () => {
      const { parse } = require("../src");
      const { bla } = parse("argName", {
        bla: "asasd-sda.d@asd.d20ds.asd.asd"
      }, [
        { name: "bla", type: "email" }
      ], "no_extra");
      strictEqual(typeof bla === "string", true);
    };
    test().then(done).catch(done);
  });

  it('url happy path no protocol', (done) => {
    const test = async () => {
      const { parse } = require("../src");
      try {
        parse("argName", {
          bla: "localhost/asd"
        }, [
          { name: "bla", type: "url" }
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.bla not url");
      }

    };
    test().then(done).catch(done);
  });

  it('url happy path', (done) => {
    const test = async () => {
      const { parse } = require("../src");
      const { bla } = parse("argName", {
        bla: "http://localhost/asd"
      }, [
        { name: "bla", type: "url" }
      ], "no_extra");
      strictEqual(bla instanceof URL, true);
    };
    test().then(done).catch(done);
  });

  it('regex parser', (done) => {
    const test = async () => {
      const { parse } = require("../src");
      const ret = parse("argName", {
        bla: "AA-BB-123"
      }, [
        { name: "bla", type: "regex", regex: "AA-BB-\\d" },
      ], "no_extra");
    };
    test().then(done).catch(done);
  });

  it('custom parser AA-BB-#', (done) => {
    const test = async () => {
      const { parse, registerParser, unRegisterParser } = require("../src");
      registerParser("AA-BB-#", ({ value }: any) => {
        return {
          isType: /AA-BB-\d/.test(value),
          parseValue: value
        }
      });
      const ret = parse("argName", {
        bla: "AA-BB-123"
      }, [
        { name: "bla", type: "AA-BB-#" },
      ], "no_extra");

      try {
        parse("argName", {
          bla: "BB-AA-123"
        }, [
          { name: "bla", type: "AA-BB-#" },
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.bla not AA-BB-#");
      }

      unRegisterParser("AA-BB-#");

      try {
        parse("argName", {
          bla: "AA-BB-123"
        }, [
          { name: "bla", type: "AA-BB-#" },
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "unsupported type AA-BB-#");
      }
    };

    test().then(done).catch(done);
  });

  it('custom parser AA-BB-# on custom instance', (done) => {
    const test = async () => {
      const { Parser, parse } = require("../src");
      const parser = new Parser();
      parser.registerParser("AA-BB-#", ({ value }: any) => {
        return {
          isType: /AA-BB-\d/.test(value),
          parseValue: value
        }
      });
      const ret = parser.parse("argName", {
        bla: "AA-BB-123"
      }, [
        { name: "bla", type: "AA-BB-#" },
      ], "no_extra");

      try {
        parse("argName", {
          bla: "AA-BB-123"
        }, [
          { name: "bla", type: "AA-BB-#" },
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "unsupported type AA-BB-#");
      }

      try {
        parser.parse("argName", {
          bla: "BB-AA-123"
        }, [
          { name: "bla", type: "AA-BB-#" },
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.bla not AA-BB-#");
      }

      parser.unRegisterParser("AA-BB-#");

      try {
        parser.parse("argName", {
          bla: "AA-BB-123"
        }, [
          { name: "bla", type: "AA-BB-#" },
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "unsupported type AA-BB-#");
      }
    };
    test().then(done).catch(done);
  });

  it('custom parser register and unregister', (done) => {
    const test = async () => {
      const { parse, registerParser, unRegisterParser } = require("../src");
      try {
        parse("argName", {
          bla: "bla"
        }, [
          { name: "bla", type: "blo" },
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "unsupported type blo");
      }

      registerParser("blo", ({
        value
      }: any) => {
        return {
          isType: true,
          parsedValue: "afhsakjf"
        }
      });

      const ret = parse("argName", {
        bla: "bla"
      }, [
        { name: "bla", type: "blo" },
      ], "no_extra");
      strictEqual(ret.bla, "afhsakjf");
      unRegisterParser("blo");

      try {
        parse("argName", {
          bla: "bla"
        }, [
          { name: "bla", type: "blo" },
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "unsupported type blo");
      }

    };
    test().then(done).catch(done);
  });

  it('custom parser register and unregister with custom instance', (done) => {
    const test = async () => {
      const { Parser } = require("../src");
      const parser = new Parser();
      try {
        parser.parse("argName", {
          bla: "bla"
        }, [
          { name: "bla", type: "blo" },
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "unsupported type blo");
      }

      parser.registerParser("blo", ({
        value
      }: any) => {
        return {
          isType: true,
          parsedValue: "afhsakjf"
        }
      });

      const ret = parser.parse("argName", {
        bla: "bla"
      }, [
        { name: "bla", type: "blo" },
      ], "no_extra");
      strictEqual(ret.bla, "afhsakjf");
      parser.unRegisterParser("blo");

      try {
        parser.parse("argName", {
          bla: "bla"
        }, [
          { name: "bla", type: "blo" },
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "unsupported type blo");
      }

    };
    test().then(done).catch(done);
  });

  it('simple invalid check minLength no_extra', (done) => {
    const test = async () => {
      try {
        const { Util } = require("../src/util/util");
        const ret = Util.parse("argName", {
          stringArray: ["", ""]
        }, [
          { name: "stringArray", type: "array", arrayType: "string", required: true, arrayMinLength: 3 },
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.stringArray not array3: of string");
      }
    };
    test().then(done).catch(done);
  });

  it('simple invalid check maxLength no_extra', (done) => {
    const test = async () => {
      try {
        const { Util } = require("../src/util/util");
        const ret = Util.parse("argName", {
          stringArray: ["", ""]
        }, [
          { name: "stringArray", type: "array", arrayType: "string", required: true, arrayMaxLength: 1 },
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.stringArray not array:1 of string");
      }
    };
    test().then(done).catch(done);
  });

  it('simple invalid check maxLength and minLength', (done) => {
    const test = async () => {
      try {
        const { Util } = require("../src/util/util");
        const ret = Util.parse("argName", {
          stringArray: ["", ""]
        }, [
          { name: "stringArray", type: "array", arrayType: "string", required: true, arrayMinLength: 0, arrayMaxLength: 1 },
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.stringArray not array0::1 of string");
      }
    };
    test().then(done).catch(done);
  });

  it('simple valid check maxLength and minLength', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        stringArray: ["", ""]
      }, [
        { name: "stringArray", type: "array", arrayType: "string", required: true, arrayMinLength: 0, arrayMaxLength: 2 },
      ], "no_extra");
    };
    test().then(done).catch(done);
  });

  it('simple valid check maxLength and minLength required false', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
      }, [
        { name: "stringArray", type: "array", arrayType: "string", required: false, arrayMinLength: 0, arrayMaxLength: 2 },
      ], "no_extra");
    };
    test().then(done).catch(done);
  });

  it('simple allowNull false default happy path', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      try {
        const ret = Util.parse("argName", {
          number: null
        }, [
          { name: "number", type: "number", required: true }
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.number not number");
        strictEqual(e.argAttr, "argName.number");
      }
    };
    test().then(done).catch(done);
  });

  it('simple allowNull false happy path', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      try {
        const ret = Util.parse("argName", {
          number: null
        }, [
          { name: "number", type: "number", required: true, allowNull: false }
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.number not number");
        strictEqual(e.argAttr, "argName.number");
      }
    };
    test().then(done).catch(done);
  });

  it('simple allowNull happy path', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const { number } = Util.parse("argName", {
        number: null
      }, [
        { name: "number", type: "number", required: true, allowNull: true }
      ], "no_extra");
      strictEqual(number, null);
    };
    test().then(done).catch(done);
  });

  it('simple invalid valid null  check no_extra', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      try {
        Util.parse("argName", null, [
          { name: "number", type: "number", required: true },
          { name: "string", type: "string", required: true },
          { name: "boolean", type: "boolean", required: true },
          { name: "object", type: "object", required: true },
          { name: "stringArray", type: "array", arrayType: "string", required: true },
          { name: "numberArray", type: "array", arrayType: "number", required: true }
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "invalid argName");
        strictEqual(e.argAttr, "argName");
      }
    };
    test().then(done).catch(done);
  });
  it('simple valid check no_extra with enum and parseJSON', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        number: 1,
        string: "string",
        boolean: false,
        object: JSON.stringify({
          bla: 1
        }),
        stringArray: ["", ""],
        numberArray: [1, 2, 3]
      }, [
        { name: "number", type: "number", required: true },
        { name: "string", type: "enum", required: true, enumValues: ["string", "number"] },
        { name: "boolean", type: "boolean", required: true },
        { name: "object", type: "nested", nestedOptions: { mode: "no_extra", options: [{ name: "bla", required: true, type: "number" }] }, required: true, parseJSON: true },
        { name: "stringArray", type: "array", arrayType: "string", required: true },
        { name: "numberArray", type: "array", arrayType: "number", required: true }
      ], "no_extra");
      strictEqual(Object.keys(ret).length, 6);
      strictEqual(ret.number, 1);
      strictEqual(ret.string, "string");
      strictEqual(ret.boolean, false);
      strictEqual(typeof ret.object, "object");
      strictEqual(ret.stringArray.length, 2);
      strictEqual(ret.numberArray.length, 3);
    };
    test().then(done).catch(done);
  });
  it('simple valid check no_extra with array and parseJSON', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        number: 1,
        string: "string",
        boolean: false,
        object: JSON.stringify({
          bla: 1
        }),
        stringArray: ["", ""],
        numberArray: JSON.stringify([1, 2, 3])
      }, [
        { name: "number", type: "number", required: true },
        { name: "string", type: "enum", required: true, enumValues: ["string", "number"] },
        { name: "boolean", type: "boolean", required: true },
        { name: "object", type: "nested", nestedOptions: { mode: "no_extra", options: [{ name: "bla", required: true, type: "number" }] }, required: true, parseJSON: true },
        { name: "stringArray", type: "array", arrayType: "string", required: true },
        { name: "numberArray", type: "array", arrayType: "number", required: true, parseJSON: true }
      ], "no_extra");
      strictEqual(Object.keys(ret).length, 6);
      strictEqual(ret.number, 1);
      strictEqual(ret.string, "string");
      strictEqual(ret.boolean, false);
      strictEqual(typeof ret.object, "object");
      strictEqual(ret.stringArray.length, 2);
      strictEqual(ret.numberArray.length, 3);
    };
    test().then(done).catch(done);
  });

  it('simple valid check no_extra with array nested and parseJSON', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        number: 1,
        string: "string",
        boolean: false,
        object: JSON.stringify({
          bla: 1
        }),
        stringArray: ["", ""],
        numberArray: JSON.stringify([{ bla: 1 }, { bla: 2 }, { bla: 3 }])
      }, [
        { name: "number", type: "number", required: true },
        { name: "string", type: "enum", required: true, enumValues: ["string", "number"] },
        { name: "boolean", type: "boolean", required: true },
        { name: "object", type: "nested", nestedOptions: { mode: "no_extra", options: [{ name: "bla", required: true, type: "number" }] }, required: true, parseJSON: true },
        { name: "stringArray", type: "array", arrayType: "string", required: true },
        { name: "numberArray", type: "array", arrayType: "nested", required: true, parseJSON: true, nestedOptions: { mode: "no_extra", options: [{ name: "bla", required: true, type: "number" }] } }
      ], "no_extra");
      strictEqual(Object.keys(ret).length, 6);
      strictEqual(ret.number, 1);
      strictEqual(ret.string, "string");
      strictEqual(ret.boolean, false);
      strictEqual(typeof ret.object, "object");
      strictEqual(ret.stringArray.length, 2);
      strictEqual(ret.numberArray.length, 3);
    };
    test().then(done).catch(done);
  });

  it('simple invalid check no_extra with enum and parseJSON', (done) => {
    const test = async () => {
      try {
        const { Util } = require("../src/util/util");
        const ret = Util.parse("argName", {
          number: 1,
          string: "string",
          boolean: false,
          object: {
            bla: 1
          },
          stringArray: ["", ""],
          numberArray: [1, 2, 3]
        }, [
          { name: "number", type: "number", required: true },
          { name: "string", type: "enum", required: true, enumValues: ["string", "number"] },
          { name: "boolean", type: "boolean", required: true },
          { name: "object", type: "nested", nestedOptions: { mode: "no_extra", options: [{ name: "bla", required: true, type: "number" }] }, required: true, parseJSON: true },
          { name: "stringArray", type: "array", arrayType: "string", required: true },
          { name: "numberArray", type: "array", arrayType: "number", required: true }
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "parseJSON not available to non string value");
      }
    };
    test().then(done).catch(done);
  });

  it('simple valid check no_extra with enum', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        number: 1,
        string: "string",
        boolean: false,
        object: {},
        stringArray: ["", ""],
        numberArray: [1, 2, 3]
      }, [
        { name: "number", type: "number", required: true },
        { name: "string", type: "enum", required: true, enumValues: ["string", "number"] },
        { name: "boolean", type: "boolean", required: true },
        { name: "object", type: "object", required: true },
        { name: "stringArray", type: "array", arrayType: "string", required: true },
        { name: "numberArray", type: "array", arrayType: "number", required: true }
      ], "no_extra");
      strictEqual(Object.keys(ret).length, 6);
      strictEqual(ret.number, 1);
      strictEqual(ret.string, "string");
      strictEqual(ret.boolean, false);
      strictEqual(typeof ret.object, "object");
      strictEqual(ret.stringArray.length, 2);
      strictEqual(ret.numberArray.length, 3);
    };
    test().then(done).catch(done);
  });

  it('simple valid check no_extra with enum and multiple', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        number: 1,
        string: "string",
        boolean: false,
        object: {},
        stringArray: ["", ""],
        numberArray: [1, 2, 3]
      }, [
        { name: "number", type: "number", required: true },
        { name: "string", type: "enum", required: true, enumValues: ["string", "number"] },
        { name: "boolean", type: "boolean", required: true },
        {
          name: "object", type: "multiple", required: true, multipleOptions: [
            { type: "string" },
            { type: "object" }
          ]
        },
        { name: "stringArray", type: "array", arrayType: "string", required: true },
        { name: "numberArray", type: "array", arrayType: "number", required: true }
      ], "no_extra");
      strictEqual(Object.keys(ret).length, 6);
      strictEqual(ret.number, 1);
      strictEqual(ret.string, "string");
      strictEqual(ret.boolean, false);
      strictEqual(typeof ret.object, "object");
      strictEqual(ret.stringArray.length, 2);
      strictEqual(ret.numberArray.length, 3);

      const ret2 = Util.parse("argName", {
        number: 1,
        string: "string",
        boolean: false,
        object: "bla",
        stringArray: ["", ""],
        numberArray: [1, 2, 3]
      }, [
        { name: "number", type: "number", required: true },
        { name: "string", type: "enum", required: true, enumValues: ["string", "number"] },
        { name: "boolean", type: "boolean", required: true },
        {
          name: "object", type: "multiple", required: true, multipleOptions: [
            { type: "string" },
            { type: "object" }
          ]
        },
        { name: "stringArray", type: "array", arrayType: "string", required: true },
        { name: "numberArray", type: "array", arrayType: "number", required: true }
      ], "no_extra");
      strictEqual(Object.keys(ret).length, 6);
      strictEqual(ret2.number, 1);
      strictEqual(ret2.string, "string");
      strictEqual(ret2.boolean, false);
      strictEqual(ret2.object, "bla");
      strictEqual(ret2.stringArray.length, 2);
      strictEqual(ret2.numberArray.length, 3);

      try {
        Util.parse("argName", {
          number: 1,
          string: "string",
          boolean: false,
          object: "bla",
          stringArray: ["", ""],
          numberArray: [1, 2, 3]
        }, [
          { name: "number", type: "number", required: true },
          { name: "string", type: "enum", required: true, enumValues: ["string", "number"] },
          { name: "boolean", type: "boolean", required: true },
          {
            name: "object", type: "multiple", required: true, multipleOptions: [
              { type: "number" },
              { type: "object" }
            ]
          },
          { name: "stringArray", type: "array", arrayType: "string", required: true },
          { name: "numberArray", type: "array", arrayType: "number", required: true }
        ], "no_extra");
        strictEqual(true, false);
      } catch (e) {
        strictEqual(e.message, "argName.object not multiple as defined.");
      }

    };
    test().then(done).catch(done);
  });

  it('simple valid check no_extra with enum in array', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        number: 1,
        string: "string",
        boolean: true,
        object: {},
        stringArray: ["object", "function"],
        numberArray: [1, 2, 3]
      }, [
        { name: "number", type: "number", required: true },
        { name: "string", type: "enum", required: true, enumValues: ["string", "number"] },
        { name: "boolean", type: "boolean", required: true },
        { name: "object", type: "object", required: true },
        { name: "stringArray", type: "array", arrayType: "enum", required: true, enumValues: ["object", "function"] },
        { name: "numberArray", type: "array", arrayType: "number", required: true }
      ], "no_extra");
      strictEqual(Object.keys(ret).length, 6);
      strictEqual(ret.number, 1);
      strictEqual(ret.string, "string");
      strictEqual(ret.boolean, true);
      strictEqual(typeof ret.object, "object");
      strictEqual(ret.stringArray.length, 2);
      strictEqual(ret.numberArray.length, 3);
    };
    test().then(done).catch(done);
  });

  it('simple valid check no_extra with enum in array with forceArray', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        number: 1,
        string: "string",
        boolean: true,
        object: {},
        stringArray: "object",
        numberArray: [1, 2, 3]
      }, [
        { name: "number", type: "number", required: true },
        { name: "string", type: "enum", required: true, enumValues: ["string", "number"] },
        { name: "boolean", type: "boolean", required: true },
        { name: "object", type: "object", required: true },
        { name: "stringArray", type: "array", arrayType: "enum", required: true, enumValues: ["object", "function"], forceArray: true },
        { name: "numberArray", type: "array", arrayType: "number", required: true }
      ], "no_extra");
      strictEqual(Object.keys(ret).length, 6);
      strictEqual(ret.number, 1);
      strictEqual(ret.string, "string");
      strictEqual(ret.boolean, true);
      strictEqual(typeof ret.object, "object");
      strictEqual(ret.stringArray.length, 1);
      strictEqual(ret.numberArray.length, 3);
    };
    test().then(done).catch(done);
  });

  it('simple invalid check no_extra with enum in array with forceArray', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      try {
        Util.parse("argName", {
          number: 1,
          string: "string",
          boolean: true,
          object: {},
          stringArray: "object",
          numberArray: 1
        }, [
          { name: "number", type: "number", required: true },
          { name: "string", type: "enum", required: true, enumValues: ["string", "number"] },
          { name: "boolean", type: "boolean", required: true },
          { name: "object", type: "object", required: true },
          { name: "stringArray", type: "array", arrayType: "enum", required: true, enumValues: ["object", "function"], forceArray: true },
          { name: "numberArray", type: "array", arrayType: "number", required: true }
        ], "no_extra");
      } catch (e) {
        strictEqual(e.message, "argName.numberArray not array of number");
      }
    };
    test().then(done).catch(done);
  });

  it('simple invalid check no_extra with enum in array', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      try {
        const ret = Util.parse("argName", {
          number: 1,
          string: "string",
          boolean: true,
          object: {},
          stringArray: ["object", "not valid"],
          numberArray: [1, 2, 3]
        }, [
          { name: "number", type: "number", required: true },
          { name: "string", type: "enum", required: true, enumValues: ["string", "number"] },
          { name: "boolean", type: "boolean", required: true },
          { name: "object", type: "object", required: true },
          { name: "stringArray", type: "array", arrayType: "enum", required: true, enumValues: ["object", "function"] },
          { name: "numberArray", type: "array", arrayType: "number", required: true }
        ], "no_extra");
        strictEqual(true, false);
      } catch (e) {
        strictEqual(e.message, "argName.stringArray not array of enum as defined. valid values [object,function]");
        strictEqual(e.argAttr, "argName.stringArray");
      }
    };
    test().then(done).catch(done);
  });
  it('simple invalid check no_extra with enum in nested', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      try {
        const ret = Util.parse("argName", {
          number: 1,
          string: "string",
          boolean: true,
          object: {},
          nested: {
            stringArray: ["object", "not valid"]
          },
          numberArray: [1, 2, 3]
        }, [
          { name: "number", type: "number", required: true },
          { name: "string", type: "enum", required: true, enumValues: ["string", "number"] },
          { name: "boolean", type: "boolean", required: true },
          { name: "object", type: "object", required: true },
          {
            name: "nested", type: "nested", required: true, nestedOptions: {
              options: [
                {
                  name: "stringArray",
                  type: "array",
                  arrayType: "enum",
                  required: true,
                  enumValues: ["object", "function"]
                }
              ],
              mode: "no_extra"
            }
          },
          { name: "numberArray", type: "array", arrayType: "number", required: true }
        ], "no_extra");
        strictEqual(true, false);
      } catch (e) {
        strictEqual(e.message, "argName.nested.stringArray not array of enum as defined. valid values [object,function]");
        strictEqual(e.argAttr, "argName.nested.stringArray");
      }
    };
    test().then(done).catch(done);
  });
  it('simple invalid check no_extra with enum in nested not array', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      try {
        const ret = Util.parse("argName", {
          number: 1,
          string: "string",
          boolean: true,
          object: {},
          nested: {
            string: "not valid"
          },
          numberArray: [1, 2, 3]
        }, [
          { name: "number", type: "number", required: true },
          { name: "string", type: "enum", required: true, enumValues: ["string", "number"] },
          { name: "boolean", type: "boolean", required: true },
          { name: "object", type: "object", required: true },
          {
            name: "nested", type: "nested", required: true, nestedOptions: {
              options: [
                {
                  name: "string",
                  type: "enum",
                  required: true,
                  enumValues: ["object", "function"]
                }
              ],
              mode: "no_extra"
            }
          },
          { name: "numberArray", type: "array", arrayType: "number", required: true }
        ], "no_extra");
        strictEqual(true, false);
      } catch (e) {
        strictEqual(e.message, "argName.nested.string not enum as defined. valid values [object,function]");
        strictEqual(e.argAttr, "argName.nested.string");
      }
    };
    test().then(done).catch(done);
  });
  it('simple invalid check no_extra with enum', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      try {
        const ret = Util.parse("argName", {
          number: 1,
          string: "not valid",
          boolean: true,
          object: {}
        }, [
          { name: "number", type: "number", required: true },
          { name: "string", type: "enum", required: true, enumValues: ["string", "number"] },
          { name: "boolean", type: "boolean", required: true },
          { name: "object", type: "object", required: true },
          { name: "string", type: "enum", required: true, enumValues: ["object", "function"] }
        ], "no_extra");
        strictEqual(true, false);
      } catch (e) {
        strictEqual(e.message, "argName.string not enum as defined. valid values [string,number]");
        strictEqual(e.argAttr, "argName.string");
      }
    };
    test().then(done).catch(done);
  });
  it('simple valid check no_extra with enum in nested and simplemap as options', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        number: 1,
        string: "string",
        boolean: true,
        object: {},
        stringArray: ["object", "function"],
        numberArray: [1, 2, 3],
        nested: {
          stringArray2: ["object", "function"],
        }
      }, {
        number: {
          type: "number",
          required: true,
        },
        string: {
          type: "enum",
          required: true,
          enumValues: ["string", "number"]
        },
        boolean: {
          type: "boolean",
          required: true
        },
        object: {
          type: "object",
          required: true
        },
        stringArray: {
          type: "array",
          arrayType: "enum",
          required: true,
          enumValues: ["object", "function"]
        },
        numberArray: {
          type: "array",
          arrayType: "number",
          required: true
        },
        nested: {
          type: "nested", required: true, nestedOptions: {
            options: {
              stringArray2: {
                type: "array",
                arrayType: "enum",
                required: true,
                enumValues: ["object", "function"]
              }
            },
            mode: "no_extra"
          }
        }
      }, "no_extra");
      strictEqual(Object.keys(ret).length, 7);
      strictEqual(ret.number, 1);
      strictEqual(ret.string, "string");
      strictEqual(ret.boolean, true);
      strictEqual(typeof ret.object, "object");
      strictEqual(ret.stringArray.length, 2);
      strictEqual(ret.numberArray.length, 3);
    };
    test().then(done).catch(done);
  });
  it('simple valid check no_extra with enum in nested', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        number: 1,
        string: "string",
        boolean: true,
        object: {},
        stringArray: ["object", "function"],
        numberArray: [1, 2, 3],
        nested: {
          stringArray2: ["object", "function"],
        }
      }, [
        { name: "number", type: "number", required: true },
        { name: "string", type: "enum", required: true, enumValues: ["string", "number"] },
        { name: "boolean", type: "boolean", required: true },
        { name: "object", type: "object", required: true },
        { name: "stringArray", type: "array", arrayType: "enum", required: true, enumValues: ["object", "function"] },
        { name: "numberArray", type: "array", arrayType: "number", required: true },
        {
          name: "nested", type: "nested", required: true, nestedOptions: {
            options: [
              {
                name: "stringArray2",
                type: "array",
                arrayType: "enum",
                required: true,
                enumValues: ["object", "function"]
              },
            ],
            mode: "no_extra"
          }
        },
      ], "no_extra");
      strictEqual(Object.keys(ret).length, 7);
      strictEqual(ret.number, 1);
      strictEqual(ret.string, "string");
      strictEqual(ret.boolean, true);
      strictEqual(typeof ret.object, "object");
      strictEqual(ret.stringArray.length, 2);
      strictEqual(ret.numberArray.length, 3);
    };
    test().then(done).catch(done);
  });
  it('simple valid check no_extra', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        number: 1,
        string: "string",
        boolean: true,
        object: {},
        stringArray: ["", ""],
        numberArray: [1, 2, 3]
      }, [
        { name: "number", type: "number", required: true },
        { name: "string", type: "string", required: true },
        { name: "boolean", type: "boolean", required: true },
        { name: "object", type: "object", required: true },
        { name: "stringArray", type: "array", arrayType: "string", required: true },
        { name: "numberArray", type: "array", arrayType: "number", required: true }
      ], "no_extra");
      strictEqual(Object.keys(ret).length, 6);
      strictEqual(ret.number, 1);
      strictEqual(ret.string, "string");
      strictEqual(ret.boolean, true);
      strictEqual(typeof ret.object, "object");
      strictEqual(ret.stringArray.length, 2);
      strictEqual(ret.numberArray.length, 3);
    };
    test().then(done).catch(done);
  });
  it('simple valid check with nested array and no_extra', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        number: 1,
        string: "string",
        boolean: true,
        object: {},
        stringArray: ["", ""],
        numberArray: [1, 2, 3],
        nestedArray: [
          { bla: "blo" }
        ]
      }, [
        { name: "number", type: "number", required: true },
        { name: "string", type: "string", required: true },
        { name: "boolean", type: "boolean", required: true },
        { name: "object", type: "object", required: true },
        { name: "stringArray", type: "array", arrayType: "string", required: true },
        {
          name: "nestedArray", type: "array", arrayType: "nested", required: true, nestedOptions: {
            mode: "no_extra",
            options: [
              { name: "bla", type: "string", required: true }
            ]
          }
        },
        { name: "numberArray", type: "array", arrayType: "number", required: true }
      ], "no_extra");
      strictEqual(Object.keys(ret).length, 7);
      strictEqual(ret.number, 1);
      strictEqual(ret.string, "string");
      strictEqual(ret.boolean, true);
      strictEqual(typeof ret.object, "object");
      strictEqual(ret.stringArray.length, 2);
      strictEqual(ret.numberArray.length, 3);
      strictEqual(ret.nestedArray.length, 1);
      strictEqual(ret.nestedArray[0].bla, "blo");
    };
    test().then(done).catch(done);
  });
  it('simple valid check nested no_extra', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        number: 1,
        string: "string",
        boolean: true,
        nested: {
          string: "string"
        },
        stringArray: ["", ""],
        numberArray: [1, 2, 3]
      }, [
        { name: "number", type: "number", required: true },
        { name: "string", type: "string", required: true },
        { name: "boolean", type: "boolean", required: true },
        {
          name: "nested", type: "nested", required: true, nestedOptions: {
            options: [
              { name: "string", type: "string", required: true },
              { name: "boolean", type: "boolean", required: false }
            ]
          }
        },
        { name: "stringArray", type: "array", arrayType: "string", required: true },
        { name: "numberArray", type: "array", arrayType: "number", required: true }
      ], "no_extra");
      strictEqual(Object.keys(ret).length, 6);
      strictEqual(ret.number, 1);
      strictEqual(ret.string, "string");
      strictEqual(ret.boolean, true);
      strictEqual(typeof ret.nested, "object");
      strictEqual(typeof ret.nested.string, "string");
      strictEqual(ret.stringArray.length, 2);
      strictEqual(ret.numberArray.length, 3);
    };
    test().then(done).catch(done);
  });
  it('simple valid check nested add_extra and no_extra', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        number: 1,
        string: "string",
        boolean: true,
        nested: {
          string: "string",
          extra: "ble"
        },
        stringArray: ["", ""],
        numberArray: [1, 2, 3]
      }, [
        { name: "number", type: "number", required: true },
        { name: "string", type: "string", required: true },
        { name: "boolean", type: "boolean", required: true },
        {
          name: "nested", type: "nested", required: true, nestedOptions: {
            options: [
              { name: "string", type: "string", required: true },
              { name: "boolean", type: "boolean", required: false }
            ],
            mode: "add_extra"
          }
        },
        { name: "stringArray", type: "array", arrayType: "string", required: true },
        { name: "numberArray", type: "array", arrayType: "number", required: true }
      ], "no_extra");
      strictEqual(Object.keys(ret).length, 6);
      strictEqual(ret.number, 1);
      strictEqual(ret.string, "string");
      strictEqual(ret.boolean, true);
      strictEqual(typeof ret.nested, "object");
      strictEqual(typeof ret.nested.string, "string");
      strictEqual(ret.nested.extra, "ble");
      strictEqual(ret.stringArray.length, 2);
      strictEqual(ret.numberArray.length, 3);
    };
    test().then(done).catch(done);
  });
  it('simple invalid check nested no_extra', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      try {
        const ret = Util.parse("argName", {
          number: 1,
          string: "string",
          boolean: true,
          nested: {
            string: "string"
          },
          stringArray: ["", ""],
          numberArray: [1, 2, 3]
        }, [
          { name: "number", type: "number", required: true },
          { name: "string", type: "string", required: true },
          { name: "boolean", type: "boolean", required: true },
          {
            name: "nested", type: "nested", required: true, nestedOptions: {
              options: [
                { name: "string", type: "string", required: true },
                { name: "boolean", type: "boolean", required: true }
              ]
            }
          },
          { name: "stringArray", type: "array", arrayType: "string", required: true },
          { name: "numberArray", type: "array", arrayType: "number", required: true }
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.nested.boolean not defined");
        strictEqual(e.argAttr, "argName.nested.boolean");
      }
    };
    test().then(done).catch(done);
  });
  it('simple invalid number check no_extra', (done) => {
    const test = async () => {
      try {
        const { Util } = require("../src/util/util");
        Util.parse("argName", {
          number: "number",
          string: "string",
          boolean: true,
          object: {},
          stringArray: ["", ""],
          numberArray: [1, 2, 3]
        }, [
          { name: "number", type: "number", required: true },
          { name: "string", type: "string", required: true },
          { name: "boolean", type: "boolean", required: true },
          { name: "object", type: "object", required: true },
          { name: "stringArray", type: "array", arrayType: "string", required: true },
          { name: "numberArray", type: "array", arrayType: "number", required: true }
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.number not number");
        strictEqual(e.argAttr, "argName.number");
      }
    };
    test().then(done).catch(done);
  });

  it('simple invalid extra key check no_extra', (done) => {
    const test = async () => {
      try {
        const { Util } = require("../src/util/util");
        Util.parse("argName", {
          number: 1,
          extraKey: "bla",
          string: "string",
          boolean: true,
          object: {},
          stringArray: ["", ""],
          numberArray: [1, 2, 3]
        }, [
          { name: "number", type: "number", required: true },
          { name: "string", type: "string", required: true },
          { name: "boolean", type: "boolean", required: true },
          { name: "object", type: "object", required: true },
          { name: "stringArray", type: "array", arrayType: "string", required: true },
          { name: "numberArray", type: "array", arrayType: "number", required: true }
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.extraKey option not valid [extraKey]");
        strictEqual(e.argAttr, "argName.extraKey");
      }
    };
    test().then(done).catch(done);
  });

  it('simple valid extra key check add_extra', (done) => {
    const test = async () => {

      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        number: 1,
        extraKey: "bla",
        string: "string",
        boolean: true,
        object: {},
        stringArray: ["", ""],
        numberArray: [1, 2, 3]
      }, [
        { name: "number", type: "number", required: true },
        { name: "string", type: "string", required: true },
        { name: "boolean", type: "boolean", required: true },
        { name: "object", type: "object", required: true },
        { name: "stringArray", type: "array", arrayType: "string", required: true },
        { name: "numberArray", type: "array", arrayType: "number", required: true }
      ], "add_extra");
      strictEqual(Object.keys(ret).length, 7);
      strictEqual(ret.number, 1);
      strictEqual(ret.string, "string");
      strictEqual(ret.extraKey, "bla");
      strictEqual(ret.boolean, true);
      strictEqual(typeof ret.object, "object");
      strictEqual(ret.stringArray.length, 2);
      strictEqual(ret.numberArray.length, 3);
    };
    test().then(done).catch(done);
  });

  it('simple valid extra key check remove_extra', (done) => {
    const test = async () => {

      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        number: 1,
        extraKey: "bla",
        string: "string",
        boolean: true,
        object: {},
        stringArray: ["", ""],
        numberArray: [1, 2, 3]
      }, [
        { name: "number", type: "number", required: true },
        { name: "string", type: "string", required: true },
        { name: "boolean", type: "boolean", required: true },
        { name: "object", type: "object", required: true },
        { name: "stringArray", type: "array", arrayType: "string", required: true },
        { name: "numberArray", type: "array", arrayType: "number", required: true }
      ], "remove_extra");
      strictEqual(Object.keys(ret).length, 6);
      strictEqual(ret.number, 1);
      strictEqual(ret.string, "string");
      strictEqual(ret.extraKey, undefined);
      strictEqual(ret.hasOwnProperty("extraKey"), false);
      strictEqual(ret.boolean, true);
      strictEqual(typeof ret.object, "object");
      strictEqual(ret.stringArray.length, 2);
      strictEqual(ret.numberArray.length, 3);
    };
    test().then(done).catch(done);
  });


  it('simple {} no_extra', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      Util.parse("argName", {}, [
        { name: "number", type: "number", required: false },
        { name: "string", type: "string", required: false },
        { name: "boolean", type: "boolean", required: false },
        { name: "object", type: "object", required: false },
        { name: "stringArray", type: "array", arrayType: "string", required: false },
        { name: "numberArray", type: "array", arrayType: "number", required: false }
      ], "no_extra");
    };
    test().then(done).catch(done);
  });

  it('simple {number: undefined} no_extra', (done) => {

    const test = async () => {
      const { Util } = require("../src/util/util");
      try {
        Util.parse("argName", {
          number: undefined
        }, [
          { name: "number", type: "number", required: false },
          { name: "string", type: "string", required: false },
          { name: "boolean", type: "boolean", required: false },
          { name: "object", type: "object", required: false },
          { name: "stringArray", type: "array", arrayType: "string", required: false },
          { name: "numberArray", type: "array", arrayType: "number", required: false }
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.number not number");
        strictEqual(e.argAttr, "argName.number");
      }
    };
    test().then(done).catch(done);
  });

  it('simple {number: undefined} no_extra defautlValue', (done) => {

    const test = async () => {
      const { Util } = require("../src/util/util");

      const { number } = Util.parse("argName", {
        number: undefined
      }, [
        { name: "number", type: "number", required: false, defaultValue: 33 },
        { name: "string", type: "string", required: false },
        { name: "boolean", type: "boolean", required: false },
        { name: "object", type: "object", required: false },
        { name: "stringArray", type: "array", arrayType: "string", required: false },
        { name: "numberArray", type: "array", arrayType: "number", required: false }
      ], "no_extra");
      strictEqual(number, 33);
    };
    test().then(done).catch(done);
  });

  it('simple {} no_extra defautlValue', (done) => {

    const test = async () => {
      const { Util } = require("../src/util/util");

      const { number } = Util.parse("argName", {
      }, [
        { name: "number", type: "number", required: false, defaultValue: 33 },
        { name: "string", type: "string", required: false },
        { name: "boolean", type: "boolean", required: false },
        { name: "object", type: "object", required: false },
        { name: "stringArray", type: "array", arrayType: "string", required: false },
        { name: "numberArray", type: "array", arrayType: "number", required: false }
      ], "no_extra");
      strictEqual(number, 33);
    };
    test().then(done).catch(done);
  });

  it('simple {number} no_extra numberMax', (done) => {

    const test = async () => {
      const { Util } = require("../src/util/util");
      try {
        const { number } = Util.parse("argName", {
          number: 33
        }, [
          { name: "number", type: "number", required: false, numberMax: 32 },
          { name: "string", type: "string", required: false },
          { name: "boolean", type: "boolean", required: false },
          { name: "object", type: "object", required: false },
          { name: "stringArray", type: "array", arrayType: "string", required: false },
          { name: "numberArray", type: "array", arrayType: "number", required: false }
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.number not number:32");
      }
    };
    test().then(done).catch(done);
  });

  it('simple {number} no_extra numberMax happy path', (done) => {

    const test = async () => {
      const { Util } = require("../src/util/util");
      const { number } = Util.parse("argName", {
        number: 33
      }, [
        { name: "number", type: "number", required: false, numberMax: 33 },
        { name: "string", type: "string", required: false },
        { name: "boolean", type: "boolean", required: false },
        { name: "object", type: "object", required: false },
        { name: "stringArray", type: "array", arrayType: "string", required: false },
        { name: "numberArray", type: "array", arrayType: "number", required: false }
      ], "no_extra");
      strictEqual(number, 33);

    };
    test().then(done).catch(done);
  });

  it('simple {number} no_extra numberMin', (done) => {

    const test = async () => {
      const { Util } = require("../src/util/util");
      try {
        const { number } = Util.parse("argName", {
          number: 33
        }, [
          { name: "number", type: "number", required: false, numberMin: 34 }
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.number not number34:");
      }
    };
    test().then(done).catch(done);
  });
  it('simple {number} no_extra numberMin 0 and defaultValue 0 happy path', (done) => {

    const test = async () => {
      const { Util } = require("../src/util/util");
      const { number } = Util.parse("argName", {
        number: 0
      }, [
        { name: "number", type: "number", required: false, numberMin: 0, defaultValue: 0 }
      ], "no_extra");
      strictEqual(number, 0);
    };
    test().then(done).catch(done);
  });

  it('simple {string} no_extra stringMinLength', (done) => {

    const test = async () => {
      const { Util } = require("../src/util/util");
      try {
        const { string } = Util.parse("argName", {
          string: "1"
        }, [
          { name: "string", type: "string", required: false, stringMinLength: 2 }
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.string not string2:");
      }
    };
    test().then(done).catch(done);
  });

  it('simple {string} no_extra stringMaxLength', (done) => {

    const test = async () => {
      const { Util } = require("../src/util/util");
      try {
        const { string } = Util.parse("argName", {
          string: "12"
        }, [
          { name: "string", type: "string", required: false, stringMaxLength: 1 },
        ], "no_extra");
        strictEqual(true, false);
      } catch (e) {
        strictEqual(e.message, "argName.string not string:1");
      }
    };
    test().then(done).catch(done);
  });

  it('simple {string} no_extra stringMaxLength happy path', (done) => {

    const test = async () => {
      const { Util } = require("../src/util/util");
      const { string } = Util.parse("argName", {
        string: "1"
      }, [
        { name: "string", type: "string", required: false, stringMaxLength: 1 },
      ], "no_extra");
      strictEqual(string, "1");

    };
    test().then(done).catch(done);
  });

  it('simple {number: undefined} no_extra with ignore undefined', (done) => {

    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parse("argName", {
        number: undefined
      }, [
        { name: "number", type: "number", required: false },
        { name: "string", type: "string", required: false },
        { name: "boolean", type: "boolean", required: false },
        { name: "object", type: "object", required: false },
        { name: "stringArray", type: "array", arrayType: "string", required: false },
        { name: "numberArray", type: "array", arrayType: "number", required: false }
      ], "no_extra", true);
      strictEqual(Object.keys(ret).length, 0);
    };
    test().then(done).catch(done);
  });
});
