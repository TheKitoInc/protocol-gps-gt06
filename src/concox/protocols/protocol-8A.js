//Protocol Ask Time

const dateTime = require("../tables/dateTime");

module.exports.parse = function (buffer) {};

module.exports.response = function () {
  let date = new Date();

  return dateTime.response(
    date.getUTCFullYear() - 2000,
    date.getUTCMonth(),
    date.getUTCDay(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};
