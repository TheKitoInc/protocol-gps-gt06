const packageHeaderA = Buffer.from("\x78\x78");
const packageHeaderB = Buffer.from("\x79\x79");
const { crc16, Crc16Algorithms } = require("easy-crc");
const calcChecksum = function (data) {
  let buffer = Buffer.alloc(2);
  buffer.writeUInt16LE(crc16("X-25", data));
  return buffer;
};

module.exports.removeLayer0 = function (package) {
  let header = package.subarray(0, 2);
  package = package.subarray(2);

  let size = null;
  if (header.equals(packageHeaderA)) {
    size = package.subarray(0, 1).readUInt8();
    package = package.subarray(1);
  } else if (header.equals(packageHeaderB)) {
    size = package.subarray(0, 2).readUInt16LE();
    package = package.subarray(2);
  } else {
    throw new Error("Invalid Header: " + header);
  }

  if (package.length != size) {
    throw new Error("Invalid Size: " + size);
  }

  return package;
};

module.exports.addLayer0 = function (package) {
  let header = null;
  let size = null;
  if (package.length < 256) {
    header = packageHeaderA;
    size = Buffer.alloc(1);
    size.writeUInt8(package.length);
  } else {
    header = packageHeaderB;
    size = Buffer.alloc(2);
    size.writeUInt16LE(package.length);
  }

  return Buffer.concat([header, size, package]);
};
