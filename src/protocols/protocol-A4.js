//Protocol Multi-fence Alarm
"use strict";

const { parserPackageComponents } = require("../common");
const dateTime = require("../tables/dateTime");
const location = require("../tables/location");
const cell = require("../tables/cell");
const status = require("../tables/status");
const extend = require("extend");

module.exports.parse = function (buffer) {
  let [dateTimeBuffer, locationBuffer, cellBufferSize, data] =
    parserPackageComponents(buffer, [6, 12, 1], true);

  let cellObject = cell.parse(data);

  let [statusByte, voltageByte, cellularSignal, alertType, language, fence] =
    parserPackageComponents(cell.remove(data), [1, 1, 1, 1, 1, 1]);

  let object = {
    power: {
      voltages: {
        battery: voltageByte.readUInt8(),
      },
    },

    cellular: {
      signal: cellularSignal.readUInt8(),
    },
    raw: {
      MFAlarmPortocol: [
        ...cellBufferSize,
        ...voltageByte,
        ...cellularSignal,
        ...alertType,
        ...language,
        ...fence,
      ],
    },
  };

  extend(true, object, dateTime.parse(dateTimeBuffer));
  extend(true, object, location.parse(locationBuffer));
  extend(true, object, cellObject);
  extend(true, object, status.parse(statusByte));

  return object;
};

module.exports.response = function () {
  return Buffer.alloc(0);
};
