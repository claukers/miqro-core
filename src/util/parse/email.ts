import { ParseValueArgs, ParseValueValidator } from "../parser";

const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const parseEMail: ParseValueValidator = ({
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
    isType = regex.test(String(value).toLowerCase())
  }
  return {
    isType,
    parsedValue: value
  }
}
