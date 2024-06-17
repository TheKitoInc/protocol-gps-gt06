const { parserPackageComponents } = require("../common");

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

module.exports.response = function (year, month, day, hours, minutes, seconds) {
  let buffer = Buffer.alloc(6);

  buffer.writeUint8(year - 2000, 0);
  buffer.writeUint8(month, 1);
  buffer.writeUint8(day, 2);
  buffer.writeUint8(hours, 3);
  buffer.writeUint8(minutes, 4);
  buffer.writeUint8(seconds, 5);

  return buffer;
};
