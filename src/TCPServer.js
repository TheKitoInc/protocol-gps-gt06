const net = require("net");
module.exports.createTCPServer = function (servicePort, callback) {
  const server = net.createServer();

  server.listen(servicePort, function () {
    console.log("server listening to %j", server.address());
  });

  server.on("connection", function (connection) {
    let connectionContext = {};
    connectionContext.remoteAddress = connection.remoteAddress;
    connectionContext.remotePort = connection.remotePort;
    connectionContext.bufferInput = Buffer.alloc(0);
    connectionContext.bufferOutput = Buffer.alloc(0);

    connection.on("data", function (data) {
      connectionContext.bufferInput = Buffer.concat([
        connectionContext.bufferInput,
        data,
      ]);

      if (connectionContext.bufferOutput.length > 0) {
        connection.write(connectionContext.bufferOutput);
        connectionContext.bufferOutput = Buffer.alloc(0);
      }

      callback(connectionContext);
    });

    connection.once("close", function () {
      connectionContext = {};
    });

    connection.on("error", function (error) {
      connectionContext.error = error;
    });
  });
};
