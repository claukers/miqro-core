import { ParseValueArgs, ParseValueValidator } from "../parser";

export const parseArray: ParseValueValidator = ({
  value,
  arrayType,
  name,
  attrName,
  numberMin,
  numberMax,
  allowNull,
  multipleOptions,
  stringMinLength,
  numberMaxDecimals,
  numberMinDecimals,
  stringMaxLength,
  nestedOptions,
  enumValues,
  options,
  regex,
  arrayMaxLength,
  arrayMinLength
}: ParseValueArgs, parser) => {
  const parsedList: any[] = [];
  let isType = value instanceof Array;
  if (isType) {
    if (arrayType === undefined) {
      for (const v of value) {
        parsedList.push(v);
      }
    } else {
      for (let i = 0; i < value.length; i++) {
        const v = value[i];
        const aiType = parser.parseValue({
          name: `${name}.${attrName}`,
          attrName: `[${i}]`,
          type: arrayType,
          options,
          regex,
          forceArray: false,
          value: v,
          numberMin,
          numberMax,
          numberMaxDecimals,
          numberMinDecimals,
          allowNull,
          multipleOptions,
          stringMinLength,
          stringMaxLength,
          nestedOptions,
          enumValues,
          arrayMaxLength,
          arrayMinLength,
        });
        if (!aiType.isType) {
          isType = false;
          break;
        } else {
          parsedList.push(aiType.parsedValue);
        }
      }
    }
  }
  if (isType && arrayMinLength !== undefined && parsedList.length < arrayMinLength) {
    isType = false;
  }
  if (isType && arrayMaxLength !== undefined && parsedList.length > arrayMaxLength) {
    isType = false;
  }
  return {
    isType,
    parsedValue: isType ? parsedList : value
  };
}
