import {Util} from "./util";

export const isFeatureEnabled = (feature: string): boolean => {
  const featureToggleName = `FEATURE_TOGGLE_${feature.toUpperCase()}`;
  Util.checkEnvVariables([featureToggleName]);
  return process.env[featureToggleName] === "true";
};

export abstract class FeatureToggle {
  public static isFeatureEnabled(feature: string): boolean {
    return isFeatureEnabled(feature);
  }
}
