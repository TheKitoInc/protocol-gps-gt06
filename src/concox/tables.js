const { getFlagFromByte, splitBufferBytes } = require("./common");

module.exports.parseStatus = function (buffer) {
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

module.exports.parseCourse = function (buffer) {
  let [upperByte, lowerByte] = splitBufferBytes(buffer, 6);

  upperByte = upperByte[0];
  let east_west = getFlagFromByte(upperByte, 3);
  let south_north = getFlagFromByte(upperByte, 2);

  return {
    realTime: getFlagFromByte(upperByte, 5),
    fixed: getFlagFromByte(upperByte, 4),

    south: !south_north,
    north: south_north,
    east: !east_west,
    west: east_west,

    course: lowerByte.readUInt16BE(),
  };
};
