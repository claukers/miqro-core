import { ParseValueArgs, ParseValueValidator } from "../parser";

export const parseNumber: ParseValueValidator = ({
  value,
  numberMax,
  numberMin,
  numberMaxDecimals,
  numberMinDecimals
}: ParseValueArgs) => {
  let isType = value === null ? false : !isNaN(value);
  const parsedValue = isType ? parseFloat(value) : value;
  if (isType && numberMin !== undefined && parsedValue < numberMin) {
    isType = false;
  }
  if (isType && numberMax !== undefined && parsedValue > numberMax) {
    isType = false;
  }
  if (isType && (numberMaxDecimals !== undefined || numberMinDecimals !== undefined)) {
    const decimalString = String(parsedValue).split(".")[1];
    const decimalLength: number = decimalString !== undefined ? decimalString.length : 0;
    if (numberMinDecimals !== undefined && decimalLength < numberMinDecimals) {
      isType = false;
    }
    if (isType && numberMaxDecimals !== undefined && decimalLength > numberMaxDecimals) {
      isType = false;
    }
  }
  return {
    isType,
    parsedValue
  };
}


