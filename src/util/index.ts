import {Session} from "../service";
import {ParseOptionsError} from "./";
import {ForbiddenError} from "./error";
import {Logger} from "./logger";

export * from "./util";

export * from "./stopwatch";
export * from "./logger";
export * from "./error";
export * from "./cli";
export * from "./loader";
export * from "./featuretoggle";
export * from "./config";

export type GroupPolicyType = "at_least_one" | "all";

export type GroupPolicyGroups = string | string[];

export interface GroupPolicyOptions {
  groups: GroupPolicyGroups[];
  groupPolicy: GroupPolicyType;
}

const policyCheck = (session: Session, options: GroupPolicyOptions): boolean => {
  switch (options.groupPolicy) {
    case "at_least_one":
      for (const group of options.groups) {
        if (group instanceof Array) {
          let ret = true;
          for (const g of group) {
            if (session.groups.indexOf(g) === -1) {
              ret = false;
              break;
            }
          }
          if (ret) {
            return true;
          }
        } else {
          if (session.groups.indexOf(group) !== -1) {
            return true;
          }
        }
      }
      return false;
    case "all":
      for (const group of options.groups) {
        if (group instanceof Array) {
          for (const g of group) {
            if (session.groups.indexOf(g) === -1) {
              return false;
            }
          }
        } else {
          if (session.groups.indexOf(group) === -1) {
            return false;
          }
        }
      }
      return true;
    default:
      throw new ParseOptionsError(`policy [${options.groupPolicy}] not implemented!!`);
  }
};

export abstract class GroupPolicy {
  public static async validateSession(session: Session, options: GroupPolicyOptions, logger: Logger): Promise<boolean> {
    if (session === undefined || session.account === undefined || session.username === undefined) {
      throw new ParseOptionsError(`Invalid authentication!`);
    }
    const ret = policyCheck(session, options);
    if (!ret) {
      logger.warn(`unauthorized token[${session.token}] with groups[${session.groups.toString()}]` +
        ` not on correct groups [${options.groups.toString()}] with policy [${options.groupPolicy}]`);
      throw new ForbiddenError(`Invalid session. You are not permitted to do this!`);
    } else {
      logger.debug(`authorized token[${session.token}] with groups[${session.groups.toString()}]` +
        ` on correct groups [${options.groups.toString()}] with policy [${options.groupPolicy}]`);
      return true;
    }
  }
}
