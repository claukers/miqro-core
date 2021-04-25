import { ParseOptionsError } from "../error";
import { ParseValueArgs, ParseValueValidator } from "../parser";

export const parseMultiple: ParseValueValidator = ({
  multipleOptions,
  name,
  attrName,
  forceArray,
  type,
  value
}: ParseValueArgs, parser) => {
  if (!multipleOptions) {
    throw new ParseOptionsError(`unsupported type ${type} without multipleOptions`);
  }
  for (let i = 0; i < multipleOptions.length; i++) {
    const basicOption = multipleOptions[i];
    try {
      const aiType = parser.parseValue({
        ...basicOption,
        forceArray,
        name,
        attrName,
        value
      });
      if (aiType.isType) {
        return aiType;
      }
    } catch (e) {
      continue;
    }
  }
  return {
    isType: false,
    parsedValue: value
  };
}
