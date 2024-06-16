module.exports.parse = function (buffer) {
  let protocol = buffer.subarray(0, 1);
  buffer = buffer.subarray(1);

  let sequence = buffer.subarray(-2);
  buffer = buffer.subarray(0, -2);

  return {
    protocol: protocol,
    sequence: sequence,
    buffer: buffer,
  };
};
