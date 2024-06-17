const { parse, response } = require("../../../src/concox/tables/dateTime");

describe("dateTime", () => {
  let testData = Buffer.from([0x0f, 0x0c, 0x1d, 0x02, 0x33, 0x05]);

  test("Test dateTime Table year", () => {
    expect(parse(testData).year).toStrictEqual(2015);
  });
  test("Test dateTime Table month", () => {
    expect(parse(testData).month).toStrictEqual(12);
  });
  test("Test dateTime Table day +", () => {
    expect(parse(testData).day).toStrictEqual(29);
  });
  test("Test dateTime Table hours", () => {
    expect(parse(testData).hours).toStrictEqual(2);
  });
  test("Test dateTime Table minutes", () => {
    expect(parse(testData).minutes).toStrictEqual(51);
  });
  test("Test dateTime Table seconds", () => {
    expect(parse(testData).seconds).toStrictEqual(5);
  });

  test("Test dateTime Table response", () => {
    expect(response(2015, 12, 29, 2, 51, 5)).toStrictEqual(testData);
  });
});
