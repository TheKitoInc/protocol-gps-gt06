"use strict";

const { parserPackageComponents } = require("../common");

module.exports.parse = function (buffer) {
  const [mcc, data] = parserPackageComponents(buffer, [2], true);

  const mncSize = mcc[0] >> 7 === 1 ? 2 : 1; //check upper bit to calc mnc size
  mcc[0] = mcc[0] & 0x7f; //remove upper bit

  const [mnc, lac, id] = parserPackageComponents(data, [mncSize, 4, 8], true);

  return {
    cell: {
      mcc: mcc.readUInt16BE(),
      mnc: mnc.length === 1 ? mnc.readUInt8() : mnc.readUInt16BE(),
      lac: lac.readUInt32BE(),
      id: id.readBigUInt64BE(),
    },
  };
};

module.exports.remove = function (buffer) {
  const [mcc] = parserPackageComponents(buffer, [2], true);
  const mncSize = mcc[0] >> 7 === 1 ? 2 : 1; //check upper bit to calc mnc size

  return buffer.subarray(2 + mncSize + 4 + 8);
};
