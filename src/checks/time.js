const { tryInteger } = require("./types");

module.exports.tryHour = function (value) {
  tryInteger(value);
  if (value < 0 || value > 23) {
    throw new Error("Hour out of range: " + value);
  }
  return value;
};
module.exports.tryMinute = function (value) {
  tryInteger(value);
  if (value < 0 || value > 59) {
    throw new Error("Minute out of range: " + value);
  }
  return value;
};
module.exports.trySecond = function (value) {
  tryInteger(value);
  if (value < 0 || value > 59) {
    throw new Error("Second out of range: " + value);
  }
  return value;
};
