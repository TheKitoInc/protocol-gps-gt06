"use strict";

const { getFlagFromByte } = require("./../common");

module.exports.parse = function (buffer) {
  let upperByte = buffer[0];
  let lowerByte = buffer[1];

  let course = Buffer.from([upperByte & 0x03, lowerByte]);

  let east_west = getFlagFromByte(upperByte, 3);
  let south_north = getFlagFromByte(upperByte, 2);

  return {
    gps: {
      realTime: getFlagFromByte(upperByte, 5),
      fixed: getFlagFromByte(upperByte, 4),
      course: course.readUInt16BE(),
      region: {
        west: east_west,
        east: !east_west,
        north: south_north,
        south: !south_north,
      },
    },
    raw: { courseTable: [upperByte, lowerByte] },
  };
};
