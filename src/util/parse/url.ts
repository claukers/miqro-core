import { ParseValueArgs, ParseValueValidator } from "../parser";
import { URL } from "url";

export const parseURL: ParseValueValidator = ({
  value,
  stringMinLength,
  stringMaxLength
}: ParseValueArgs) => {
  let isType = typeof value === "string";
  const parsedValue = value;
  if (isType && stringMinLength !== undefined && parsedValue.length < stringMinLength) {
    isType = false;
  }
  if (isType && stringMaxLength !== undefined && parsedValue.length > stringMaxLength) {
    isType = false;
  }
  if (isType) {
    try {
      const url = new URL(value);
      return {
        isType,
        parsedValue: url
      }
    } catch (e) {
      return {
        isType: false,
        parsedValue: value
      }
    }
  }
  return {
    isType: false,
    parsedValue: value
  }
}
