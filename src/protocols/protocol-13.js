//Protocol Heartbeat
"use strict";

const { parserPackageComponents } = require("../common");
const statusParser = require("../tables/status");
const extend = require("extend");

module.exports.parse = function (buffer) {
  const [statusByte, voltageByte, signalByte, language] = parserPackageComponents(
    buffer,
    [1, 1, 1, 2]
  );

  const object = {
    batteryVoltage: voltageByte.readUInt8(),
    cellularSignal: signalByte.readUInt8(),

    raw: { heartbeatProtocol: [...voltageByte, ...signalByte, ...language] },
  };

  extend(true, object, statusParser.parse(statusByte));
  return object;
};

module.exports.response = function () {
  return Buffer.alloc(0);
};
