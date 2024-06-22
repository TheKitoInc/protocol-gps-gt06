//Protocol Multibase
"use strict";

const { parserPackageComponents } = require("../common");
const dateTime = require("../tables/dateTime");
const cell = require("../tables/cell");
const extend = require("extend");

module.exports.parse = function (buffer) {
  let [dateTimeBuffer, RSSI] = [null, null];

  [dateTimeBuffer, buffer] = parserPackageComponents(buffer, [6], true);

  const cellObject = cell.parse(buffer);

  [RSSI, buffer] = parserPackageComponents(cell.remove(buffer), [1], true);

  let [NLAC, NCI, NRSSI] = [null, null, null];

  const cells = [];
  for (let i = 0; i < 6; i++) {
    [NLAC, NCI, NRSSI, buffer] = parserPackageComponents(
      buffer,
      [4, 8, 1],
      true
    );

    cells.push({
      LAC: NLAC.readUInt32BE(),
      CI: NCI.readBigUInt64BE(),
      RSSI: NRSSI.readUInt8(),
    });
  }

  const [timeAdvance, language] = parserPackageComponents(buffer, [1, 2]);

  const object = {
    cell: { rssi: RSSI.readUInt8() },

    cells: cells,
    timeAdvance: timeAdvance.readUInt8(),

    device: {
      language: language.readUInt16BE(),
    },
  };
  extend(true, object, dateTime.parse(dateTimeBuffer));
  extend(true, object, cellObject);

  return object;
};

module.exports.response = function () {
  return null;
};
