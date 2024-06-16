const { getFlagFromByte, parserPackageComponents } = require("./common");
module.exports.parse = function (buffer) {
  let [statusByte, voltageByte, signalByte] = parserPackageComponents(
    buffer,
    [1, 1, 1, 2]
  );

  return {
    batteryVoltage: voltageByte.readUInt8(),
    cellularSignal: signalByte.readUInt8(),
    defense: getFlagFromByte(statusByte, 0),
    acc: getFlagFromByte(statusByte, 1),
    power: getFlagFromByte(statusByte, 2),
    fixed: getFlagFromByte(statusByte, 6),
    cut: getFlagFromByte(statusByte, 7),
  };
};
