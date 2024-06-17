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

module.exports.response = function () {
  let buffer = Buffer.alloc(6);

  let date = new Date();

  buffer.writeUint8(date.getUTCFullYear() - 2000, 0);
  buffer.writeUint8(date.getUTCMonth(), 1);
  buffer.writeUint8(date.getUTCDay(), 2);
  buffer.writeUint8(date.getUTCHours(), 3);
  buffer.writeUint8(date.getUTCMinutes(), 4);
  buffer.writeUint8(date.getUTCSeconds(), 5);

  return buffer;
};
