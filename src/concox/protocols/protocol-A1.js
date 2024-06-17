//Protocol Multibase

const { parserPackageComponents } = require("../common");
const dateTime = require("../dateTime");
const cell = require("../cell");

module.exports.parse = function (buffer) {
  let [dateTimeBuffer, data] = parserPackageComponents(buffer, [6], true);

  let cellObject = cell.parse(data);

  let [RSSI, nextData] = parserPackageComponents(cell.remove(data), [1], true);

  let [NLAC, NCI, NRSSI] = [null, null, null];

  let cells = [];
  for (var i = 0; i < 6; i++) {
    [NLAC, NCI, NRSSI, nextData] = parserPackageComponents(
      nextData,
      [4, 8, 1],
      true
    );

    cells.push({
      LAC: NLAC.readUInt32BE(),
      CI: NCI.readBigUInt64BE(),
      RSSI: NRSSI.readUInt8(),
    });
  }

  let [timeAdvance, language] = parserPackageComponents(nextData, [1, 2]);

  return {
    typeName: "Multibase",
    typeId: "A1",

    timeStamp: dateTime.parse(dateTimeBuffer),
    cell: cellObject,
    RSSI: RSSI.readUInt8(),
    cells: cells,
    timeAdvance: timeAdvance.readUInt8(),
    language: language.readUInt16BE(),
  };
};
