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
  it('simple valid check with nested array and no_extra', (done) => {
    const test = async () => {
      const {Util} = require("../src/util/util");
      const ret = Util.parseOptions("argName", {
        number: 1,
        string: "string",
        boolean: true,
        object: {},
        stringArray: ["", ""],
        numberArray: [1, 2, 3],
        nestedArray: [
          {bla: "blo"}
        ]
      }, [
        {name: "number", type: "number", required: true},
        {name: "string", type: "string", required: true},
        {name: "boolean", type: "boolean", required: true},
        {name: "object", type: "object", required: true},
        {name: "stringArray", type: "array", arrayType: "string", required: true},
        {
          name: "nestedArray", type: "array", arrayType: "nested", required: true, nestedOptions: {
            mode: "no_extra",
            options: [
              {name: "bla", type: "string", required: true}
            ]
          }
        },
        {name: "numberArray", type: "array", arrayType: "number", required: true}
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
      const {Util} = require("../src/util/util");
      const ret = Util.parseOptions("argName", {
        number: 1,
        string: "string",
        boolean: true,
        nested: {
          string: "string"
        },
        stringArray: ["", ""],
        numberArray: [1, 2, 3]
      }, [
        {name: "number", type: "number", required: true},
        {name: "string", type: "string", required: true},
        {name: "boolean", type: "boolean", required: true},
        {
          name: "nested", type: "nested", required: true, nestedOptions: {
            options: [
              {name: "string", type: "string", required: true},
              {name: "boolean", type: "boolean", required: false}
            ]
          }
        },
        {name: "stringArray", type: "array", arrayType: "string", required: true},
        {name: "numberArray", type: "array", arrayType: "number", required: true}
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
      const {Util} = require("../src/util/util");
      const ret = Util.parseOptions("argName", {
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
        {name: "number", type: "number", required: true},
        {name: "string", type: "string", required: true},
        {name: "boolean", type: "boolean", required: true},
        {
          name: "nested", type: "nested", required: true, nestedOptions: {
            options: [
              {name: "string", type: "string", required: true},
              {name: "boolean", type: "boolean", required: false}
            ],
            mode: "add_extra"
          }
        },
        {name: "stringArray", type: "array", arrayType: "string", required: true},
        {name: "numberArray", type: "array", arrayType: "number", required: true}
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
      const {Util} = require("../src/util/util");
      try {
        const ret = Util.parseOptions("argName", {
          number: 1,
          string: "string",
          boolean: true,
          nested: {
            string: "string"
          },
          stringArray: ["", ""],
          numberArray: [1, 2, 3]
        }, [
          {name: "number", type: "number", required: true},
          {name: "string", type: "string", required: true},
          {name: "boolean", type: "boolean", required: true},
          {
            name: "nested", type: "nested", required: true, nestedOptions: {
              options: [
                {name: "string", type: "string", required: true},
                {name: "boolean", type: "boolean", required: true}
              ]
            }
          },
          {name: "stringArray", type: "array", arrayType: "string", required: true},
          {name: "numberArray", type: "array", arrayType: "number", required: true}
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.nested.boolean not defined");
      }
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

  it('simple invalid extra key check no_extra', (done) => {
    const test = async () => {
      try {
        const {Util} = require("../src/util/util");
        Util.parseOptions("argName", {
          number: 1,
          extraKey: "bla",
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
        strictEqual(e.message, "argName option not valid [extraKey]");
      }
    };
    test().then(done).catch(done);
  });

  it('simple valid extra key check add_extra', (done) => {
    const test = async () => {

      const {Util} = require("../src/util/util");
      const ret = Util.parseOptions("argName", {
        number: 1,
        extraKey: "bla",
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

      const {Util} = require("../src/util/util");
      const ret = Util.parseOptions("argName", {
        number: 1,
        extraKey: "bla",
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
      const {Util} = require("../src/util/util");
      Util.parseOptions("argName", {}, [
        {name: "number", type: "number", required: false},
        {name: "string", type: "string", required: false},
        {name: "boolean", type: "boolean", required: false},
        {name: "object", type: "object", required: false},
        {name: "stringArray", type: "array", arrayType: "string", required: false},
        {name: "numberArray", type: "array", arrayType: "number", required: false}
      ], "no_extra");
    };
    test().then(done).catch(done);
  });

  it('simple {number: undefined} no_extra', (done) => {

    const test = async () => {
      const {Util} = require("../src/util/util");
      try {
        Util.parseOptions("argName", {
          number: undefined
        }, [
          {name: "number", type: "number", required: false},
          {name: "string", type: "string", required: false},
          {name: "boolean", type: "boolean", required: false},
          {name: "object", type: "object", required: false},
          {name: "stringArray", type: "array", arrayType: "string", required: false},
          {name: "numberArray", type: "array", arrayType: "number", required: false}
        ], "no_extra");
        strictEqual(false, true);
      } catch (e) {
        strictEqual(e.message, "argName.number not number");
      }
    };
    test().then(done).catch(done);
  });
});
