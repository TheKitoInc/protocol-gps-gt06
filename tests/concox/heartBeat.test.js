const { parse } = require("../../src/concox/heartBeat");

describe("heartBeat", () => {
  let testData = Buffer.from([0x55, 0x04, 0x04, 0x00, 0x01]);

  test("Test login package CUT", () => {
    expect(parse(testData).cut).toStrictEqual(false);
  });
  test("Test login package FIXED", () => {
    expect(parse(testData).fixed).toStrictEqual(true);
  });
  test("Test login package POWER", () => {
    expect(parse(testData).power).toStrictEqual(true);
  });
  test("Test login package ACC", () => {
    expect(parse(testData).acc).toStrictEqual(false);
  });
  test("Test login package DEFENSE", () => {
    expect(parse(testData).defense).toStrictEqual(true);
  });

  test("Test login package cellularSignal -", () => {
    expect(parse(testData).batteryVoltage).toStrictEqual(4);
  });
  test("Test login package cellularSignal -", () => {
    expect(parse(testData).cellularSignal).toStrictEqual(4);
  });
});
