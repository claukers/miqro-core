import { ParseOptionsError } from "../error";
import { ParseValueArgs, ParseValueValidator } from "../parser";

export const parseEnum: ParseValueValidator = ({
  value,
  attrName,
  name,
  enumValues
}: ParseValueArgs, parser) => {
  const enumCheck = parser.parseValue({
    name: `${name}.${attrName}`,
    attrName: `enumList`,
    forceArray: false,
    type: "array",
    value: enumValues,
    arrayType: "string"
  });
  if (enumCheck.isType && enumValues && enumValues.length > 0) {
    enumCheck.isType = enumValues.indexOf(value) !== -1;
  } else {
    throw new ParseOptionsError(`options.enumValues not a string array`);
  }
  return {
    isType: enumCheck.isType,
    parsedValue: value
  };
}


