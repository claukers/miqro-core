export type callback<T = any> = (...args: any[]) => T;

export interface FakeCallback<T = any> extends callback<T> {
  callCount: number;
  callArgs: T[];
}

export const fake = (cb: callback): FakeCallback => {
  const ret = (...args: any[]) => {
    ret.callCount++;
    ret.callArgs.push(args);
    return cb(...args);
  };
  ret.callCount = 0;
  ret.callArgs = [] as any;
  return ret;
}
