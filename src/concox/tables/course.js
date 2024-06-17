const { getFlagFromByte, splitBufferBytes } = require("./../common");


module.exports.parse = function (buffer) {
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
