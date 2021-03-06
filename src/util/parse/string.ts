import { ParseValueArgs, ParseValueValidator } from "../parser";

export const parseString: ParseValueValidator = ({
  value,
  stringMinLength,
  type,
  stringMaxLength
}: ParseValueArgs) => {
  let isType = typeof value === type;
  const parsedValue = value;
  if (isType && stringMinLength !== undefined && parsedValue.length < stringMinLength) {
    isType = false;
  }
  if (isType && stringMaxLength !== undefined && parsedValue.length > stringMaxLength) {
    isType = false;
  }
  return {
    isType,
    parsedValue
  };
}


