const { parserPackageComponents, getFlagFromByte } = require("./common");
const courseParser = require("./tables/course");

module.exports.parse = function (buffer) {
  let [satellites, latitude, longitude, speed, bufferCourse] =
    parserPackageComponents(buffer, [1, 4, 4, 1, 2]);

  let courseObject = courseParser.parse(bufferCourse);

  return {
    satellites: satellites.readUInt8(),
    latitude:
      (latitude.readUInt32BE() / 1800000) * (courseObject.north ? 1 : -1),
    longitude:
      (longitude.readUInt32BE() / 1800000) * (courseObject.east ? 1 : -1),
    speed: speed.readUInt8(),
    fixed: courseObject.fixed,
    realTime: courseObject.realTime,
    course: courseObject.course,
  };
};
