//Protocol Login
"use strict";

const { parserPackageComponents, getFlagFromByte } = require("../common");

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
  const flagGMT = getFlagFromByte(buffer[1], 3);
  
  const timeInt = Buffer.from([buffer[0], buffer[1] & 0b11110000]).readUInt16BE()>>4
  const timeString = timeInt.toString();
  const timeMinutes = parseInt(timeString.slice(0, -2),10) * 60 + parseInt(timeString.slice(-2),10);
 
  return flagGMT ? -timeMinutes : timeMinutes;
}

module.exports.response = function () {
  return Buffer.alloc(0);
};
