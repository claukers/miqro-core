import { Handler, JSONParser, LoggerHandler, ReadBuffer, TagResponse, TextParser, URLEncodedParser } from "../src";

export const middleware = (): Handler[] => {
  return [
    LoggerHandler(),
    TagResponse(),
    ReadBuffer(),
    JSONParser(),
    URLEncodedParser(),
    TextParser()
  ];
}
