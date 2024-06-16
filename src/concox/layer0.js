const packageHeaderA = Buffer.from([0x78, 0x78]);
const packageHeaderB = Buffer.from([0x79, 0x79]);
const packageFooter = Buffer.from([0x0d, 0x0a]);

const { crc16 } = require("easy-crc");

const isExtendedProtocol = function (packageBuffer) {
  header = packageBuffer.subarray(0, packageHeaderB.length);
  return packageHeaderB.equals(header);
};

const extractFooter = function (packageBuffer) {
  let footer = packageBuffer.subarray(-packageFooter.length);

  if (!packageFooter.equals(footer)) {
    throw new Error("Invalid packageFooter: " + footer);
  }

  return packageBuffer.subarray(0, -packageFooter.length);
};

const extractHeader = function (packageBuffer) {
  let header = null;

  header = packageBuffer.subarray(0, packageHeaderA.length);
  if (packageHeaderA.equals(header)) {
    return packageBuffer.subarray(packageHeaderA.length);
  }

  header = packageBuffer.subarray(0, packageHeaderB.length);
  if (packageHeaderB.equals(header)) {
    return packageBuffer.subarray(packageHeaderB.length);
  }

  throw new Error("Invalid packageHeader: " + packageBuffer);
};

const extractChecksum = function (packageBuffer) {
  let checksum = packageBuffer.subarray(-2);
  packageBuffer = packageBuffer.subarray(0, -2);

  if (!calcChecksum(packageBuffer).equals(checksum)) {
    throw new Error("Invalid packageChecksum: " + checksum.toString("hex"));
  }

  return packageBuffer;
};

const calcChecksum = function (data) {
  let buffer = Buffer.alloc(2);
  buffer.writeUInt16BE(crc16("X-25", data));
  return buffer;
};

module.exports.removeLayer0 = function (packageBuffer) {
  let extendedProtocol = isExtendedProtocol(packageBuffer);
  packageBuffer = extractHeader(packageBuffer);
  packageBuffer = extractFooter(packageBuffer);
  packageBuffer = extractChecksum(packageBuffer);

  let size = null;
  if (!extendedProtocol) {
    size = packageBuffer.subarray(0, 1).readUInt8();
    packageBuffer = packageBuffer.subarray(1);
  } else {
    size = packageBuffer.subarray(0, 2).readUInt16BE();
    packageBuffer = packageBuffer.subarray(2);
  }

  size = size - 2; // -2 CRC16
  if (packageBuffer.length != size) {
    throw new Error("Invalid Size: " + size);
  }

  return packageBuffer;
};

module.exports.addLayer0 = function (packageBuffer) {
  let header = null;
  let size = null;
  let sizeInt = packageBuffer.length + 2; // +2 (CRC16)

  if (sizeInt < 256) {
    header = packageHeaderA;
    size = Buffer.alloc(1);
    size.writeUInt8(sizeInt);
  } else {
    header = packageHeaderB;
    size = Buffer.alloc(2);
    size.writeUInt16BE(sizeInt);
  }

  packageBuffer = Buffer.concat([size, packageBuffer]);
  let checksum = calcChecksum(packageBuffer);

  return Buffer.concat([header, packageBuffer, checksum, packageFooter]);
};
