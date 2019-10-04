export { Util, ISimpleMap } from "./util";
import { ISession } from "../service/common";
import { ParseOptionsError, Util } from "./";
import { ForbidenError } from "./error";

export * from "./stopwatch";
export * from "./error";
export * from "./loader";
export * from "./featuretoggle";

export type IGroupPolicy = "at_leats_one" | "all";

export type IGroupPolicyItem = string | string[];

export interface IGroupPolicyOptions {
  groups: IGroupPolicyItem[];
  groupPolicy: IGroupPolicy;
}

const policyCheck = (session: ISession, options: IGroupPolicyOptions): boolean => {
  switch (options.groupPolicy) {
    case "at_leats_one":
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
  public static async validateSession(session: ISession, options: IGroupPolicyOptions, logger): Promise<boolean> {
    if (!session || !session.account || !session.username) {
      throw new ParseOptionsError(`Invalid authentication!`);
    }
    const ret = policyCheck(session, options);
    if (!ret) {
      logger.warn(`unauthorized token[${session.token}] with groups[${session.groups.toString()}]` +
        ` not on correct groups [${options.groups.toString()}] with policy [${options.groupPolicy}]`);
      throw new ForbidenError(`Invalid session. You are not permitted to do this!`);
    } else {
      logger.debug(`authorized token[${session.token}] with groups[${session.groups.toString()}]` +
        ` on correct groups [${options.groups.toString()}] with policy [${options.groupPolicy}]`);
      return true;
    }
  }
}
