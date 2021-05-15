import { ForbiddenError, ParseOptionsError } from "./error";
import { Logger } from "./logger";
import { Util } from "./util";
import { Session } from "./index";

export type GroupPolicyType = "at_least_one" | "all";

export type GroupPolicyGroups = string | string[];

export interface GroupPolicy {
  groups: GroupPolicyGroups[];
  groupPolicy: GroupPolicyType;
}

export const groupPolicyCheck = (session: Session, options: GroupPolicy): boolean => {
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

export abstract class GroupPolicyValidator {
  public static async validate(session: Session, options: GroupPolicy, logger?: Logger): Promise<boolean> {
    if (!logger) {
      logger = Util.getLogger("GroupPolicy");
    }
    if (session === undefined || session.account === undefined || session.username === undefined) {
      throw new ParseOptionsError(`Invalid authentication!`);
    }
    const ret = groupPolicyCheck(session, options);
    if (!ret) {
      (logger as Logger).warn(`groups[${session.groups.toString()}]` +
        ` not on correct groups [${options.groups.toString()}] with policy [${options.groupPolicy}]`);
      throw new ForbiddenError(`Invalid session. You are not permitted to do this!`);
    } else {
      (logger as Logger).trace("on correct groups");
      return true;
    }
  }
}
