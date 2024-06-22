"use strict";

const { parserPackageComponents, getFlagFromByte } = require("../common");
const courseParser = require("./course");
const extend = require("extend");

module.exports.parse = function (buffer) {
  const [satellites, latitude, longitude, speed, bufferCourse] =
    parserPackageComponents(buffer, [1, 4, 4, 1, 2]);

  const courseObject = courseParser.parse(bufferCourse);

  const object = {
    gps: {
      satellites: satellites.readUInt8(),
      latitude:
        (latitude.readUInt32BE() / 1800000) *
        (courseObject.gps.region.north ? 1 : -1),
      longitude:
        (longitude.readUInt32BE() / 1800000) *
        (courseObject.gps.region.east ? 1 : -1),
      speed: speed.readUInt8(),
    },

    raw: {
      locationTable: [...satellites, ...latitude, ...longitude, ...speed],
    },
  };

  extend(true, object, courseObject);
  return object;
};
