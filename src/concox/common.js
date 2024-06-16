module.exports.getFlagFromByte = function (byte, index) {
  return byte[0].toString(2).padStart(8, 0)[7 - index] == 1;
};

module.exports.parserPackageComponents = function (buffer, map) {
  let output = [];

  map.forEach((element) => {
    let value = buffer.subarray(0, element);
    buffer = buffer.subarray(element);
    output.push(value);
  });

  return output;
};
