const { parse } = require("../../../src/concox/protocols/protocol-13");

describe("heartBeat", () => {
  let testData = Buffer.from([0x55, 0x04, 0x04, 0x00, 0x01]);
  test("Test heartBeat package batteryVoltage", () => {
    expect(parse(testData).batteryVoltage).toStrictEqual(4);
  });
  test("Test heartBeat package cellularSignal:", () => {
    expect(parse(testData).cellularSignal).toStrictEqual(4);
  });
});
