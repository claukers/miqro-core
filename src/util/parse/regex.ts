import { ParseOptionsError } from "../error";
import { ParseValueValidator } from "../parser";

export const parseRegex: ParseValueValidator = ({
  regex,
  type,
  value
}) => {
  if (regex === undefined || typeof regex !== "string") {
    throw new ParseOptionsError(`unsupported type ${type} without regex as string`);
  }
  const regExp = new RegExp(regex);
  return {
    isType: regExp.test(value),
    parsedValue: value
  };
}
