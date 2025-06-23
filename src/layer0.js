"use strict";

const packageHeaderA = Buffer.from([0x78, 0x78]);
const packageHeaderB = Buffer.from([0x79, 0x79]);
const packageFooter = Buffer.from([0x0d, 0x0a]);

const { crc16 } = require("easy-crc");
const { throwError } = require("./common");

const isExtendedProtocol = function (buffer) {
  const header = buffer.subarray(0, packageHeaderB.length);
  return packageHeaderB.equals(header);
};

const extractFooter = function (buffer) {
  const footer = buffer.subarray(-packageFooter.length);

  if (!packageFooter.equals(footer)) {
    throwError("Invalid packageFooter", buffer);
  }

  return buffer.subarray(0, -packageFooter.length);
};

const extractHeader = function (buffer) {
  let header = null;

  header = buffer.subarray(0, packageHeaderA.length);
  if (packageHeaderA.equals(header)) {
    return buffer.subarray(packageHeaderA.length);
  }

  header = buffer.subarray(0, packageHeaderB.length);
  if (packageHeaderB.equals(header)) {
    return buffer.subarray(packageHeaderB.length);
  }

  throwError("Invalid packageHeader", buffer);
};

const extractChecksum = function (buffer) {
  const checksum = buffer.subarray(-2);
  buffer = buffer.subarray(0, -2);

  if (!calcChecksum(buffer).equals(checksum)) {
    throwError("Invalid packageChecksum", buffer);
  }

  return buffer;
};

const calcChecksum = function (data) {
  const buffer = Buffer.alloc(2);
  buffer.writeUInt16BE(crc16("X-25", data));
  return buffer;
};

module.exports.removeLayer0 = function (buffer) {
  const extendedProtocol = isExtendedProtocol(buffer);
  buffer = extractHeader(buffer);
  buffer = extractFooter(buffer);
  buffer = extractChecksum(buffer);

  let size = null;
  if (!extendedProtocol) {
    size = buffer.subarray(0, 1).readUInt8();
    buffer = buffer.subarray(1);
  } else {
    size = buffer.subarray(0, 2).readUInt16BE();
    buffer = buffer.subarray(2);
  }

  size = size - 2; // -2 CRC16
  if (buffer.length !== size) {
    throwError("Invalid packageSize", buffer);
  }

  return buffer;
};

module.exports.addLayer0 = function (buffer) {
  let header = null;
  let size = null;
  const sizeInt = buffer.length + 2; // +2 (CRC16)

  if (sizeInt < 256) {
    header = packageHeaderA;
    size = Buffer.alloc(1);
    size.writeUInt8(sizeInt);
  } else {
    header = packageHeaderB;
    size = Buffer.alloc(2);
    size.writeUInt16BE(sizeInt);
  }

  buffer = Buffer.concat([size, buffer]);
  const checksum = calcChecksum(buffer);

  return Buffer.concat([header, buffer, checksum, packageFooter]);
};
