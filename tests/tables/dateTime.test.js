const { parse, response } = require("../../src/tables/dateTime");

describe("dateTime", () => {
  let testData = Buffer.from([0x0f, 0x0c, 0x1d, 0x02, 0x33, 0x05]);

  test("Test dateTime Table year", () => {
    expect(parse(testData).timeStamp.year).toStrictEqual(2015);
  });
  test("Test dateTime Table month", () => {
    expect(parse(testData).timeStamp.month).toStrictEqual(12);
  });
  test("Test dateTime Table day +", () => {
    expect(parse(testData).timeStamp.day).toStrictEqual(29);
  });
  test("Test dateTime Table hours", () => {
    expect(parse(testData).timeStamp.hours).toStrictEqual(2);
  });
  test("Test dateTime Table minutes", () => {
    expect(parse(testData).timeStamp.minutes).toStrictEqual(51);
  });
  test("Test dateTime Table seconds", () => {
    expect(parse(testData).timeStamp.seconds).toStrictEqual(5);
  });

  test("Test dateTime Table response", () => {
    expect(response(2015, 12, 29, 2, 51, 5)).toStrictEqual(testData);
  });
});
