import { ParseValueArgs, ParseValueValidator } from "../parser";

export const parseNumber: ParseValueValidator = ({
  value,
  numberMax,
  numberMin
}: ParseValueArgs) => {
  let isType = value === null ? false : !isNaN(value);
  const parsedValue = isType ? parseInt(value, 10) : value;
  if (isType && numberMin !== undefined && parsedValue < numberMin) {
    isType = false;
  }
  if (isType && numberMax !== undefined && parsedValue > numberMax) {
    isType = false;
  }
  return {
    isType,
    parsedValue
  };
}


