const { parserPackageComponents } = require("./common");

module.exports.parse = function (buffer) {
  let [year, month, day, hours, minutes, seconds] = parserPackageComponents(
    buffer,
    [1, 1, 1, 1, 1, 1]
  );

  return {
    year: year.readUInt8() + 2000,
    month: month.readUInt8(),
    day: day.readUInt8(),
    hours: hours.readUInt8(),
    minutes: minutes.readUInt8(),
    seconds: seconds.readUInt8(),
  };
};
