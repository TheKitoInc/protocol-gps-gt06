const { parse } = require("../../src/protocols/protocol-13");

describe("heartBeat", () => {
  const testData = Buffer.from([0x55, 0x04, 0x04, 0x00, 0x01]);
  test("Test heartBeat package batteryVoltage", () => {
    expect(parse(testData).batteryVoltage).toStrictEqual(4);
  });
  test("Test heartBeat package cellularSignal:", () => {
    expect(parse(testData).cellularSignal).toStrictEqual(4);
  });
});
