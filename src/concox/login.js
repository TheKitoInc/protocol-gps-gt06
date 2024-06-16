module.exports.parse = function (buffer) {
  let imei = buffer.subarray(0, 8);
  buffer = buffer.subarray(8);

  let type = buffer.subarray(0, 2);
  buffer = buffer.subarray(2);

  let tz = buffer.subarray(0, 2);
  buffer = buffer.subarray(2);

  return {
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
