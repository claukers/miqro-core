export const isFeatureEnabled = (feature: string, defaults = false): boolean => {
  const featureToggleName = `FEATURE_TOGGLE_${feature.toUpperCase()}`;
  if (process.env[featureToggleName] === undefined) {
    return defaults;
  } else {
    return process.env[featureToggleName] === "true";
  }

};

export abstract class FeatureToggle {
  public static isFeatureEnabled(feature: string, defaults = false): boolean {
    return isFeatureEnabled(feature, defaults);
  }
}
