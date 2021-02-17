export const isFeatureEnabled = (feature: string, defaults = true): boolean => {
  const featureToggleName = `${feature.toUpperCase()}`;
  if (process.env[featureToggleName] === undefined) {
    return defaults;
  } else {
    return process.env[featureToggleName] === "true";
  }

};

export abstract class FeatureToggle {
  public static isFeatureEnabled(feature: string, defaults = true): boolean {
    return isFeatureEnabled(feature, defaults);
  }
}
