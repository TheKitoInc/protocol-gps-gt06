module.exports.parseLogin = function (package) {
  let imei = package.subarray(0, 8);
  package = package.subarray(8);

  let type = package.subarray(0, 2);
  package = package.subarray(2);

  let tz = package.subarray(0, 2);
  package = package.subarray(2);

  return {
    imei: imei.toString("hex"),
    type: type.readUInt16BE(),
    timeZone: getTimeZone(tz),
  };
};

function getTimeZone(package) {
  package = package.toString("hex");

  let timeBytes = Buffer.from("0" + package.slice(0, 3), "hex");
  let timeInt = timeBytes.readUInt16BE();
  let timeString = timeInt.toString();
  let timeMinutes =
    parseInt(timeString.slice(0, -2)) * 60 + parseInt(timeString.slice(-2));

  let byteFlags = Buffer.from("0" + package.slice(3, 4), "hex");

  return byteFlags.readUInt8() > 7 ? -timeMinutes : timeMinutes;
}
