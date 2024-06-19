"use strict";

const { getFlagFromByte } = require("./../common");

module.exports.parse = function (buffer) {
  let byte = buffer[0];

  return {
    power: {
      acc: getFlagFromByte(byte, 1),
      connected: getFlagFromByte(byte, 2),
    },

    alarm: {
      sos: getFlagFromByte(byte, 5),
      vibration: getFlagFromByte(byte, 3) && !getFlagFromByte(byte, 4),
      lowBattery: getFlagFromByte(byte, 3) && getFlagFromByte(byte, 4),
      powerLost: !getFlagFromByte(byte, 3) && getFlagFromByte(byte, 4),
    },

    status: {
      defense: getFlagFromByte(byte, 0),
      stoped: getFlagFromByte(byte, 7),
    },

    gps: {
      fixed: getFlagFromByte(byte, 6),
    },

    raw: {
      statusTable: [byte],
    },
  };
};
