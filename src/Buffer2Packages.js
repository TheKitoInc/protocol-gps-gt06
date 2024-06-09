module.exports.buffer2packages = function (buffer, packageSeparator, callback) {
  let bufferIndex = buffer.indexOf(packageSeparator);

  while (bufferIndex > -1) {
    callback(buffer.subarray(0, bufferIndex));

    buffer = buffer.subarray(bufferIndex + packageSeparator.length);

    bufferIndex = buffer.indexOf(packageSeparator);
  }
};
