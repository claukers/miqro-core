import { ParseOptionsError } from "../error";
import { ParseValueArgs, ParseValueValidator } from "../parser";

export const parseNested: ParseValueValidator = ({
  nestedOptions,
  name,
  attrName,
  type,
  value
}: ParseValueArgs, parser) => {
  if (!nestedOptions) {
    throw new ParseOptionsError(`unsupported type ${type} without nestedOptions`);
  }
  const pValue = parser.parse(`${name}.${attrName}`, value, nestedOptions.options, nestedOptions.mode);
  return {
    isType: pValue !== null,
    parsedValue: pValue === null ? value : pValue
  };
}
