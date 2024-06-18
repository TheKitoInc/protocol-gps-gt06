"use strict";

const { parserPackageComponents, getFlagFromByte } = require("../common");
const courseParser = require("./course");

module.exports.parse = function (buffer) {
  let [satellites, latitude, longitude, speed, bufferCourse] =
    parserPackageComponents(buffer, [1, 4, 4, 1, 2]);

  let courseObject = courseParser.parse(bufferCourse);

  console.warn(courseObject);
  return {
    ...courseObject,

    gps: {
      ...courseObject.gps,
      latitude:
        (latitude.readUInt32BE() / 1800000) *
        (courseObject.gps.region.north ? 1 : -1),
      longitude:
        (longitude.readUInt32BE() / 1800000) *
        (courseObject.gps.region.east ? 1 : -1),
      speed: speed.readUInt8(),
      satellites: satellites.readUInt8(),
    },
  };
};
