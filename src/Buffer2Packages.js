module.exports.buffer2packages = function (
  connectionContext,
  packageSeparator
) {
  connectionContext.packages = connectionContext.packages || [];

  let bufferIndex = connectionContext.bufferInput.indexOf(packageSeparator);

  while (bufferIndex > -1) {
    connectionContext.packages.push(
      connectionContext.bufferInput.subarray(
        0,
        bufferIndex 
      )
    );

    connectionContext.bufferInput = connectionContext.bufferInput.subarray(
      bufferIndex + packageSeparator.length
    );
    
    bufferIndex = connectionContext.bufferInput.indexOf(packageSeparator);
  }
};
