"use strict";

const { getFlagFromByte } = require("./../common");

module.exports.parse = function (buffer) {
  let byte = buffer[0];

  return {
    defense: getFlagFromByte(byte, 0),
    acc: getFlagFromByte(byte, 1),
    power: getFlagFromByte(byte, 2),

    lowBattery: getFlagFromByte(byte, 3) && getFlagFromByte(byte, 4),
    powerLost: !getFlagFromByte(byte, 3) && getFlagFromByte(byte, 4),
    vibrating: getFlagFromByte(byte, 3) && !getFlagFromByte(byte, 4),

    sos: getFlagFromByte(byte, 5),
    stoped: getFlagFromByte(byte, 7),

    gps: {
      fixed: getFlagFromByte(byte, 6),
    },

    raw: {
      statusTable: [byte],
    },
  };
};
