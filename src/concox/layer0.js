const packageHeaderA = Buffer.from("\x78\x78");
const packageHeaderB = Buffer.from("\x79\x79");
const packageFooter = Buffer.from("\x0D\x0A");
const { crc16, Crc16Algorithms } = require("easy-crc");

const extractFooter = function (package) {
  let footer = package.subarray(-packageFooter.length);

  if (!packageFooter.equals(footer)) {
    throw new Error("Invalid packageFooter: " + footer);
  }

  return package.subarray(0, -packageFooter.length);
};

const extractHeader = function (package) {
  let header = null;

  header = package.subarray(0, packageHeaderA.length);
  if (packageHeaderA.equals(header)) {
    return package.subarray(packageHeaderA.length);
  }

  header = package.subarray(0, packageHeaderB.length);
  if (packageHeaderB.equals(header)) {
    return package.subarray(packageHeaderB.length);
  }

  throw new Error("Invalid packageHeader: " + package);
};

const extractChecksum = function (package) {
  let checksum = package.subarray(-2);
  package = package.subarray(0, -2);

  if (!calcChecksum(package).equals(checksum)) {
    throw new Error("Invalid packageChecksum: " + footer);
  }

  return package;
};

const calcChecksum = function (data) {
  let buffer = Buffer.alloc(2);
  buffer.writeUInt16LE(crc16("X-25", data));
  return buffer;
};

module.exports.removeLayer0 = function (package) {
  package = extractFooter(package);

  let header = package.subarray(0, 2);
  package = extractHeader(package);

  package = extractChecksum(package);
  let size = null;
  if (header.equals(packageHeaderA)) {
    size = package.subarray(0, 1).readUInt8();
    package = package.subarray(1);
  } else if (header.equals(packageHeaderB)) {
    size = package.subarray(0, 2).readUInt16LE();
    package = package.subarray(2);
  }

  size = size - 2; // -2 CRC16
  if (package.length != size) {
    throw new Error("Invalid Size: " + size);
  }

  return package;
};

module.exports.addLayer0 = function (package) {
  let header = null;
  let size = null;
  let sizeInt = package.length + 2; // +2 (CRC16)

  if (sizeInt < 256) {
    header = packageHeaderA;
    size = Buffer.alloc(1);
    size.writeUInt8(sizeInt);
  } else {
    header = packageHeaderB;
    size = Buffer.alloc(2);
    size.writeUInt16LE(sizeInt);
  }

  package = Buffer.concat([size, package]);
  let checksum = calcChecksum(package);

  return Buffer.concat([header, package, checksum, packageFooter]);
};
