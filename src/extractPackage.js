module.exports.extractPackage = function (
  connectionContext,
  packageSeparator,
  callback
) {
  let bufferIndex = connectionContext.bufferInput.indexOf(packageSeparator);

  while (bufferIndex > -1) {
    callback(
      Buffer.concat([
        connectionContext.bufferInput.subarray(0, bufferIndex),
        packageSeparator,
      ])
    );

    connectionContext.bufferInput = connectionContext.bufferInput.subarray(
      bufferIndex + packageSeparator.length
    );
    bufferIndex = connectionContext.bufferInput.indexOf(packageSeparator);
  }
};
