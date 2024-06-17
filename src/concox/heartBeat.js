const { parserPackageComponents } = require("./common");
const { parseStatus } = require("./tables");

module.exports.parse = function (buffer) {
  let [statusByte, voltageByte, signalByte] = parserPackageComponents(
    buffer,
    [1, 1, 1, 2]
  );

  return {
    batteryVoltage: voltageByte.readUInt8(),
    cellularSignal: signalByte.readUInt8(),
    status: parseStatus(statusByte),
  };
};
