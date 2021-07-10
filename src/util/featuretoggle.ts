export const isFeatureEnabled = (feature: string, defaults = true): boolean => {
  const featureToggleName = `${feature.toUpperCase()}`;
  return process.env[featureToggleName] === undefined ? defaults : process.env[featureToggleName] === "true";
};

export abstract class FeatureToggle {
  public static isFeatureEnabled(feature: string, defaults = true): boolean {
    return isFeatureEnabled(feature, defaults);
  }
}
