const login = require("./protocol-01");
const heartbeat = require("./protocol-13");
const alarm = require("./protocol-A4");
const location = require("./protocol-A0");
const transfer = require("./protocol-94");
const multibase = require("./protocol-A1");

const protocolLogin = Buffer.from([0x01]);
const protocolHeartbeat = Buffer.from([0x13]);
const protocolAlarm = Buffer.from([0xa4]);
const protocolLocation = Buffer.from([0xa0]);
const protocolTransfer = Buffer.from([0x94]);
const protocolMultiBase = Buffer.from([0xa1]);

module.exports.parse = function (buffer) {
  let protocol = buffer.subarray(0, 1);
  buffer = buffer.subarray(1);

  let sequence = buffer.subarray(-2);
  buffer = buffer.subarray(0, -2);

  let object = null;
  if (protocolLogin.equals(protocol)) object = login.parse(package.buffer);
  else if (protocolHeartbeat.equals(protocol)) object = heartbeat.parse(buffer);
  else if (protocolAlarm.equals(protocol)) object = alarm.parse(buffer);
  else if (protocolLocation.equals(protocol)) object = location.parse(buffer);
  else if (protocolTransfer.equals(protocol)) object = transfer.parse(buffer);
  else if (protocolMultiBase.equals(protocol)) object = multibase.parse(buffer);
  else {
    console.warn(protocol);
  }

  return {
    protocol: protocol,
    sequence: sequence,
    object: object,
  };
};
