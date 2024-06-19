"use strict";

const { removeLayer0 } = require("./layer0");
const protocols = require("./protocols");

module.exports.parse = function (buffer) {
  return protocols.parse(removeLayer0(buffer));
};
