const { getFlagFromByte, splitBufferBytes } = require("./../common");

module.exports.parse = function (buffer) {
  let byte = buffer[0];

  return {
    defense: getFlagFromByte(byte, 0),
    acc: getFlagFromByte(byte, 1),
    power: getFlagFromByte(byte, 2),

    lbat: getFlagFromByte(byte, 3) && getFlagFromByte(byte, 4),
    powercut: !getFlagFromByte(byte, 3) && getFlagFromByte(byte, 4),
    vibrating: getFlagFromByte(byte, 3) && !getFlagFromByte(byte, 4),

    sos: getFlagFromByte(byte, 5),
    fixed: getFlagFromByte(byte, 6),
    cut: getFlagFromByte(byte, 7),
  };
};
