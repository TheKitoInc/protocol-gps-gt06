//Protocol Ask Time
"use strict";

const dateTime = require("../tables/dateTime");

module.exports.parse = function (buffer) {};

module.exports.response = function () {
  const date = new Date();

  return dateTime.response(
    date.getUTCFullYear() ,
    date.getUTCMonth(),
    date.getUTCDay(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};
