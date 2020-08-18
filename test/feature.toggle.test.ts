import {describe, it} from 'mocha';
import {strictEqual} from "assert";

describe('FeatureToggle func tests', function () {
  it("happy path true", () => {
    const {isFeatureEnabled} = require("../src");
    process.env["FEATURE_TOGGLE_MY_FEATURE"] = "true";
    strictEqual(isFeatureEnabled("MY_FEATURE"), true);
  });

  it("happy path FeatureToggle abstract class", () => {
    const {FeatureToggle} = require("../src");
    process.env["FEATURE_TOGGLE_MY_FEATURE"] = "true";
    strictEqual(FeatureToggle.isFeatureEnabled("MY_FEATURE"), true);
  });

  it("happy path undefined", () => {
    const {isFeatureEnabled} = require("../src");
    delete process.env["FEATURE_TOGGLE_MY_FEATURE"];
    strictEqual(isFeatureEnabled("MY_FEATURE"), false);
  });

  it("happy path false", () => {
    const {isFeatureEnabled} = require("../src");
    process.env["FEATURE_TOGGLE_MY_FEATURE"] = "false";
    strictEqual(isFeatureEnabled("MY_FEATURE"), false);
  });

  it("happy path any", () => {
    const {isFeatureEnabled} = require("../src");
    (process.env as any )["FEATURE_TOGGLE_MY_FEATURE"] = {asd:1};
    strictEqual(isFeatureEnabled("MY_FEATURE"), false);
  });

  it("happy path null", () => {
    const {isFeatureEnabled} = require("../src");
    (process.env as any )["FEATURE_TOGGLE_MY_FEATURE"] = null;
    strictEqual(isFeatureEnabled("MY_FEATURE"), false);
  });

});
