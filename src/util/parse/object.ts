import { ParseValueArgs, ParseValueValidator } from "../parser";

export const parseObject: ParseValueValidator = ({
  value
}: ParseValueArgs) => {
  return {
    isType: typeof value === 'object',
    parsedValue: value
  };
}
