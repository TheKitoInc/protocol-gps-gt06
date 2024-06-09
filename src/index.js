const { createTCPServer } = require("./TCPServer");

const argv = require("minimist")(process.argv.slice(2));

createTCPServer(argv.servicePort || 9000, readPackages);
