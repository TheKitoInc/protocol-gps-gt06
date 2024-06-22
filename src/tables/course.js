"use strict";

const { getFlagFromByte } = require("./../common");

module.exports.parse = function (buffer) {
  const upperByte = buffer[0];
  const lowerByte = buffer[1];

  const course = Buffer.from([upperByte & 0x03, lowerByte]);

  const east_west = getFlagFromByte(upperByte, 3);
  const south_north = getFlagFromByte(upperByte, 2);

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
