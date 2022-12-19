// @ts-nocheck
import { convertMsToTime } from "./utility";

describe("convertMstoTime", () => {
  test("Test if convertMsToTime function returns the correct value.", () => {
    expect(convertMsToTime(10000000)).toEqual("02:46:40");
  });

  test("Test if convertMsToTime function returns a string", () => {
    expect(typeof convertMsToTime(10000000)).toBe("string");
  });
});
