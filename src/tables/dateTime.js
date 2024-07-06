"use strict";

const { tryYearShort, tryMonth, tryDay, tryYear } = require("../checks/date");
const { tryHour, tryMinute, trySecond } = require("../checks/time");
const { parserPackageComponents } = require("../common");

module.exports.parse = function (buffer) {
  const [year, month, day, hours, minutes, seconds] = parserPackageComponents(
    buffer,
    [1, 1, 1, 1, 1, 1]
  );

  return {
    timeStamp: {
      year: tryYearShort(year.readUInt8()) + 2000,
      month: tryMonth(month.readUInt8()),
      day: tryDay(day.readUInt8()),
      hours: tryHour(hours.readUInt8()),
      minutes: tryMinute(minutes.readUInt8()),
      seconds: trySecond(seconds.readUInt8()),
    },
  };
};

module.exports.response = function (year, month, day, hours, minutes, seconds) {
  const buffer = Buffer.alloc(6);

  buffer.writeUint8(tryYear(year) - 2000, 0);
  buffer.writeUint8(tryMonth(month), 1);
  buffer.writeUint8(tryDay(day), 2);
  buffer.writeUint8(tryHour(hours), 3);
  buffer.writeUint8(tryMinute(minutes), 4);
  buffer.writeUint8(trySecond(seconds), 5);

  return buffer;
};
