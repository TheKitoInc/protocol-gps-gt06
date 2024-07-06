const { tryInteger } = require("./types");
module.exports.tryDay = function (value) {
  tryInteger(value);
  if (value < 1 || value > 31) {
    throw new Error("Day out of range: " + value);
  }
  return value;
};

module.exports.tryMonth = function (value) {
  tryInteger(value);
  if (value < 1 || value > 12) {
    throw new Error("Month out of range: " + value);
  }
  return value;
};

module.exports.tryYear = function (value) {
  tryInteger(value);
  if (value < 2000 || value > 2099) {
    throw new Error("Year out of range: " + value);
  }
  return value;
};

module.exports.tryYearShort = function (value) {
  tryInteger(value);
  if (value < 0 || value > 99) {
    throw new Error("Year (short) out of range: " + value);
  }
  return value;
};
