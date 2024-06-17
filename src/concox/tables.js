const { getFlagFromByte, splitBufferBytes } = require("./common");

module.exports.parseStatusByte = function (byte) {
    return {
      defense: getFlagFromByte(byte, 0),
      acc: getFlagFromByte(byte, 1),
      power: getFlagFromByte(byte, 2),
  
      lbat:
        getFlagFromByte(byte, 3) &&
        getFlagFromByte(byte, 4),
      powercut:
        !getFlagFromByte(byte, 3) &&
        getFlagFromByte(byte, 4),
      vibrating:
        getFlagFromByte(byte, 3) &&
        !getFlagFromByte(byte, 4),
  
      sos: getFlagFromByte(byte, 5),
      fixed: getFlagFromByte(byte, 6),
      cut: getFlagFromByte(byte, 7),
    };
  };

  module.exports.parseCourse = function (buffer) {
    let [upperByte, lowerByte] = splitBufferBytes(buffer, 6);
    return {
      realTime: getFlagFromByte(upperByte, 5),
      fix: getFlagFromByte(upperByte, 4),
      east: getFlagFromByte(upperByte, 3),
      north: getFlagFromByte(upperByte, 2),
      course: lowerByte.readUInt16BE(),
    };
  };