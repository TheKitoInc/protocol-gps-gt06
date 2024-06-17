const { parserPackageComponents, getFlagFromByte } = require("./common");
const { parseCourse } = require("./tables");

module.exports.parse = function (buffer) {
  let [satellites, latitude, longitude, speed, bufferCourse] =
    parserPackageComponents(buffer, [1, 4, 4, 1, 2]);

  let { course, east, fixed, north, realTime } = parseCourse(bufferCourse);
  console.log(parseCourse(bufferCourse))
  return {
    satellites: satellites.readUInt8(),
    latitude: (latitude.readUInt32BE() / 1800000) * (north ? 1 : -1),
    longitude: (longitude.readUInt32BE() / 1800000) * (east ? 1 : -1),
    course: course,
    speed: speed.readUInt8(),
  };
};
