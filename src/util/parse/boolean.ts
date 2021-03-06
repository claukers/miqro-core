import { ParseValueArgs, ParseValueValidator } from "../parser";

export const parseBoolean: ParseValueValidator = ({
  value
}: ParseValueArgs) => {
  const parsedValue = value === "true" || value === true ? true : value === "false" || value === false ? false : null;
  return {
    isType: parsedValue !== null,
    parsedValue: parsedValue !== null ? parsedValue : value
  };
}


