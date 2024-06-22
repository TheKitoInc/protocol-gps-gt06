//Protocol Location
"use strict";

const { parserPackageComponents } = require("../common");
const dateTime = require("../tables/dateTime");
const location = require("../tables/location");
const cell = require("../tables/cell");
const extend = require("extend");

module.exports.parse = function (buffer) {
  const [dateTimeBuffer, locationBuffer, data] = parserPackageComponents(
    buffer,
    [6, 12],
    true
  );

  const cellObject = cell.parse(data);

  const [reupload, uploadmode, acc, mileage] = parserPackageComponents(
    cell.remove(data),
    [1, 1, 1, 4]
  );

  const object = {
    event: {
      uploadTrigger: uploadmode.readUInt8(),
    },

    power: {
      acc: acc[0] > 0,
    },

    gps: {
      realTime: reupload[0] === 0,
      mileage: mileage.readUInt32BE(),
    },

    raw: {
      locationProtocol: [...reupload, ...uploadmode, ...acc, ...mileage],
    },
  };

  extend(true, object, dateTime.parse(dateTimeBuffer));
  extend(true, object, location.parse(locationBuffer));
  extend(true, object, cellObject);

  return object;
};

module.exports.response = function () {
  return Buffer.alloc(0);
};
