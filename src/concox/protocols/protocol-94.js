//Protocol Transfer

const { parserPackageComponents } = require("../common");

module.exports.parse = function (buffer) {
  let [idTransfer, data] = parserPackageComponents(buffer, [1], true);

  return {
    typeName: "Transfer",
    typeId: "04",
    idTransfer: idTransfer,
    payload: data,
  };
};

module.exports.response = function () {
  return null;
};
