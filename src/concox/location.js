const { parserPackageComponents, getFlagFromByte } = require("./common");

module.exports.parse = function (buffer) {
    let [satellites, latitude, longitude, speed, course] =
      parserPackageComponents(buffer, [ 1, 4, 4, 1, 2]);
  
    return {
      satellites: satellites.readUInt8(),
      latitude:
        (latitude.readUInt32BE() / 1800000) *
        (getFlagFromByte(course, 3) ? -1 : 1),
      longitude:
        (longitude.readUInt32BE() / 1800000) *
        (getFlagFromByte(course, 2) ? 1 : -1),
      speed: speed.readUInt8(),
    };
  }