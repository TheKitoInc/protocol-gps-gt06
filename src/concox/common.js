module.exports.getFlagFromByte = function (byte, index) {
  return byte[0].toString(2).padStart(8, 0)[7 - index] == 1;
};

module.exports.parserPackageComponents = function (
  buffer,
  map,
  allowNotFullUse = false
) {
  let output = [];

  map.forEach((element) => {
    let value = buffer.subarray(0, element);
    buffer = buffer.subarray(element);
    output.push(value);
  });

  if (buffer.length != 0) {
    if (allowNotFullUse) {
      output.push(buffer);
    } else {
      exports.throwError("Map Invalid", buffer);
    }
  }

  return output;
};

module.exports.throwError = function (message, buffer) {
  throw new Error(message + ": " + buffer.toString("hex"));
};

module.exports.parseStatusByte = function (byte) {
  return {
    defense: module.exports.getFlagFromByte(byte, 0),
    acc: module.exports.getFlagFromByte(byte, 1),
    power: module.exports.getFlagFromByte(byte, 2),

    lbat:
      module.exports.getFlagFromByte(byte, 3) &&
      module.exports.getFlagFromByte(byte, 4),
    powercut:
      !module.exports.getFlagFromByte(byte, 3) &&
      module.exports.getFlagFromByte(byte, 4),
    vibrating:
      module.exports.getFlagFromByte(byte, 3) &&
      !module.exports.getFlagFromByte(byte, 4),

    sos: module.exports.getFlagFromByte(byte, 5),
    fixed: module.exports.getFlagFromByte(byte, 6),
    cut: module.exports.getFlagFromByte(byte, 7),
  };
};
