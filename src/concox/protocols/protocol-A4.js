//Protocol Multi-fence Alarm

const { parserPackageComponents } = require("../common");
const dateTime = require("../dateTime");
const location = require("../tables/location");
const cell = require("../cell");
const status = require("../tables/status");

module.exports.parse = function (buffer) {
  let [dateTimeBuffer, locationBuffer, cellBufferSize, data] =
    parserPackageComponents(buffer, [6, 12, 1], true);

  cellBufferSize = cellBufferSize.readUInt8();

  let [cellBuffer, data2] = parserPackageComponents(
    data,
    [cellBufferSize - 1],
    true
  );

  let [statusByte, voltageByte, cellularSignal, alertsBytes, fence] =
    parserPackageComponents(data2, [1, 1, 1, 2, 1]);

  return {
    typeName: "Alarm",
    typeId: "A4",

    timeStamp: dateTime.parse(dateTimeBuffer),
    location: location.parse(locationBuffer),
    cell: cell.parse(cellBuffer),
    status: status.parse(statusByte),
    batteryVoltage: voltageByte.readUInt8(),
    cellularSignal: cellularSignal.readUInt8(),
  };
};
