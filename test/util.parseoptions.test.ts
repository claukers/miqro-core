import {describe, it} from 'mocha';
import {strictEqual} from "assert";

describe('lib.Util.parseOptions unit tests', function () {
  it('simple valid check no_extra', (done) => {
    const test = async () => {
      const {Util} = require("../src/util/util");
      const ret = Util.parseOptions("argName", {
        number: 1,
        string: "string",
        boolean: true,
        object: {},
        stringArray: ["", ""],
        numberArray: [1, 2, 3]
      }, [
        {name: "number", type: "number", required: true},
        {name: "string", type: "string", required: true},
        {name: "boolean", type: "boolean", required: true},
        {name: "object", type: "object", required: true},
        {name: "stringArray", type: "array", arrayType: "string", required: true},
        {name: "numberArray", type: "array", arrayType: "number", required: true}
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
  it('simple invalid number check no_extra', (done) => {
    const test = async () => {
      try {
        const {Util} = require("../src/util/util");
        Util.parseOptions("argName", {
          number: "number",
          string: "string",
          boolean: true,
          object: {},
          stringArray: ["", ""],
          numberArray: [1, 2, 3]
        }, [
          {name: "number", type: "number", required: true},
          {name: "string", type: "string", required: true},
          {name: "boolean", type: "boolean", required: true},
          {name: "object", type: "object", required: true},
          {name: "stringArray", type: "array", arrayType: "string", required: true},
          {name: "numberArray", type: "array", arrayType: "number", required: true}
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.number not number");
      }
    };
    test().then(done).catch(done);
  });
});
