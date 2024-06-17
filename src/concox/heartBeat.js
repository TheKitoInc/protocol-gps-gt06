const { parserPackageComponents } = require("./common");
const statusParser = require("./tables/status");

module.exports.parse = function (buffer) {
  let [statusByte, voltageByte, signalByte] = parserPackageComponents(
    buffer,
    [1, 1, 1, 2]
  );

  return {
    batteryVoltage: voltageByte.readUInt8(),
    cellularSignal: signalByte.readUInt8(),
    status: statusParser.parse(statusByte),
  };
};
