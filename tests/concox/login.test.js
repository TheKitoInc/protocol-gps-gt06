const { parse } = require("../../src/concox/login");

describe("login", () => {
  let testData = Buffer.from([
    0x07, 0x52, 0x53, 0x36, 0x78, 0x90, 0x02, 0x42, 0x70, 0x00, 0x32, 0x01,
  ]);
  let testData2 = Buffer.from([
    0x07, 0x52, 0x53, 0x36, 0x78, 0x90, 0x02, 0x42, 0x70, 0x00, 0x4d, 0xdd,
  ]);
  test("Test login package MAC", () => {
    expect(parse(testData).imei).toStrictEqual("0752533678900242");
  });
  test("Test login package TYPE", () => {
    expect(parse(testData).type).toStrictEqual(28672);
  });
  test("Test login package TIMEZONE +", () => {
    expect(parse(testData).timeZone).toStrictEqual(480);
  });
  test("Test login package TIMEZONE -", () => {
    expect(parse(testData2).timeZone).toStrictEqual(-765);
  });
});
