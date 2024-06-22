//Protocol Login
"use strict";

const { parserPackageComponents } = require("../common");

module.exports.parse = function (buffer) {
  const [imei, type, tz] = parserPackageComponents(buffer, [8, 2, 2]);

  return {
    device: {
      imei: imei.toString("hex"),
      type: type.readUInt16BE(),
    },

    timeStamp: {
      timeZone: getTimeZone(tz),
    },

    raw: { loginProtocol: [...imei, ...type, ...tz] },
  };
};

function getTimeZone(buffer) {
  buffer = buffer.toString("hex");

  const timeBytes = Buffer.from("0" + buffer.slice(0, 3), "hex");
  const timeInt = timeBytes.readUInt16BE();
  const timeString = timeInt.toString();
  const timeMinutes =
    parseInt(timeString.slice(0, -2)) * 60 + parseInt(timeString.slice(-2));

  const byteFlags = Buffer.from("0" + buffer.slice(3, 4), "hex");

  return byteFlags.readUInt8() > 7 ? -timeMinutes : timeMinutes;
}

module.exports.response = function () {
  return Buffer.alloc(0);
};
