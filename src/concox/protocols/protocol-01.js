//Protocol Login

const { parserPackageComponents } = require("../common");

module.exports.parse = function (buffer) {
  let [imei, type, tz] = parserPackageComponents(buffer, [8, 2, 2]);

  return {
    typeName: "Login",
    typeId: "01",

    imei: imei.toString("hex"),
    type: type.readUInt16BE(),
    timeZone: getTimeZone(tz),
  };
};

function getTimeZone(buffer) {
  buffer = buffer.toString("hex");

  let timeBytes = Buffer.from("0" + buffer.slice(0, 3), "hex");
  let timeInt = timeBytes.readUInt16BE();
  let timeString = timeInt.toString();
  let timeMinutes =
    parseInt(timeString.slice(0, -2)) * 60 + parseInt(timeString.slice(-2));

  let byteFlags = Buffer.from("0" + buffer.slice(3, 4), "hex");

  return byteFlags.readUInt8() > 7 ? -timeMinutes : timeMinutes;
}

module.exports.response = function () {
  return Buffer.alloc(0);
};
