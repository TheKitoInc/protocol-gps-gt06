"use strict";

const login = require("./protocol-01");
const heartbeat = require("./protocol-13");
const alarm = require("./protocol-A4");
const location = require("./protocol-A0");
const transfer = require("./protocol-94");
const multibase = require("./protocol-A1");
const askTime = require("./protocol-8A");

const protocolLogin = Buffer.from([0x01]);
const protocolHeartbeat = Buffer.from([0x13]);
const protocolAlarm = Buffer.from([0xa4]);
const protocolLocation = Buffer.from([0xa0]);
const protocolTransfer = Buffer.from([0x94]);
const protocolMultiBase = Buffer.from([0xa1]);
const protocolAskTime = Buffer.from([0x8a]);

module.exports.parse = function (buffer) {
  const protocol = buffer.subarray(0, 1);
  buffer = buffer.subarray(1);

  const sequence = buffer.subarray(-2);
  buffer = buffer.subarray(0, -2);

  let object = null;
  let response = null;

  if (protocolLogin.equals(protocol)) {
    object = login.parse(buffer);
    response = login.response();
  } else if (protocolHeartbeat.equals(protocol)) {
    object = heartbeat.parse(buffer);
    response = heartbeat.response();
  } else if (protocolAlarm.equals(protocol)) {
    object = alarm.parse(buffer);
    response = alarm.response(buffer);
  } else if (protocolLocation.equals(protocol)) {
    object = location.parse(buffer);
    response = location.response(buffer);
  } else if (protocolTransfer.equals(protocol)) {
    object = transfer.parse(buffer);
    response = transfer.response(buffer);
  } else if (protocolMultiBase.equals(protocol)) {
    object = multibase.parse(buffer);
    response = multibase.response(buffer);
  } else if (protocolAskTime.equals(protocol)) {
    object = askTime.parse(buffer);
    response = askTime.response(buffer);
  } else {
    console.warn(protocol);
  }

  return {
    protocol: protocol,
    sequence: sequence,
    object: object,
    response: response,
  };
};

module.exports.response = function (protocol, sequence, buffer = null) {
  if (!buffer) buffer = Buffer.alloc(0);

  return Buffer.concat([protocol, buffer, sequence]);
};
