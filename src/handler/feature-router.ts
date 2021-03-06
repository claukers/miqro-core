import { getLogger, isFeatureEnabled, Logger, SimpleMap } from "../util";
import { Handler, Method } from "./common";
import { Router } from "./router";

export type FeatureHandler = Array<Handler> | Handler;

export interface FeatureRouterPathOptions {
  path: string;
  methods: Method[];
  handler: FeatureHandler;
}

export type FeatureRouterOptions<T extends FeatureRouterPathOptions = FeatureRouterPathOptions> = SimpleMap<T>;

export const FEATURE_ROUTER_METHODS = ["get", "post", "put", "delete", "patch", "options"];

export const FeatureRouter = (options: FeatureRouterOptions, logger?: Logger): Router => {
  if (!logger) {
    logger = getLogger("FeatureRouter");
  }
  const router: Router = new Router();
  const toSetup = Object.keys(options);
  const enabled: string[] = [];
  const disabled: string[] = [];
  for (const featureName of toSetup) {
    const handlerOptions = options[featureName];
    if (!handlerOptions) {
      throw new Error(`no handler options for feature [${featureName}]`);
    } else {
      const { path, handler: implementation, methods } = handlerOptions;
      if (!methods) {
        throw new Error(`no methods for feature [${featureName}]`);
      } else if (!implementation) {
        throw new Error(`no implementation for feature [${featureName}]`);
      } else if (!path) {
        throw new Error(`no path for feature [${featureName}]`);
      } else {
        if (methods.length > 0) {
          for (const method of methods) {
            if (FEATURE_ROUTER_METHODS.indexOf(method.toLowerCase()) === -1) {
              throw new Error(`feature [${featureName}] method [${method.toUpperCase()}] not defined! use only [${FEATURE_ROUTER_METHODS.join(",")}]`);
            }
          }
        } else {
          throw new Error(`feature [${featureName}] no methods defined`);
        }
        if (isFeatureEnabled(featureName)) {
          logger.trace(`feature [${featureName}] enabled`);
          enabled.push(featureName);
          for (const method of methods) {
            logger.info("%s", featureName);
            logger.info("\t%s:%s", method.toUpperCase(), path);
            if ((handlerOptions as any).apiHandlerOptions && (handlerOptions as any).apiHandlerOptions.___filePath) {
              logger.info("\t%s", (handlerOptions as any).apiHandlerOptions.___filePath);
            }
            router.use(implementation, path, method.toLocaleLowerCase() as Method);
          }
        } else {
          logger.debug("feature [%s] disabled", featureName);
          disabled.push(featureName);
        }
      }
    }
  }
  if (enabled.length > 0) {
    logger.debug("enabled features [%s]", enabled.join(","));
  }
  if (disabled.length > 0) {
    logger.warn("disabled features [%s]", disabled.join(","));
    logger.warn(`to enable them just add the env var <feature>=true`);
  } else {
    logger.debug(`no features disabled`);
  }
  return router;
};
