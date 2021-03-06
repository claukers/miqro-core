import { ParseValueArgs, ParseValueValidator } from "../parser";

export const parseAny: ParseValueValidator = (args: ParseValueArgs) => {
  return {
    isType: true,
    parsedValue: args.value
  };
}
