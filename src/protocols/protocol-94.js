//Protocol Transfer
"use strict";

const { parserPackageComponents } = require("../common");

module.exports.parse = function (buffer) {
  let [idTransfer, data] = parserPackageComponents(buffer, [1], true);

  return {
    transfer: {
      idTransfer: idTransfer,
      payload: data,
    },
    raw: { transferProtocol: [...idTransfer] },
  };
};

module.exports.response = function () {
  return null;
};
