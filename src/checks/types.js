module.exports.tryInteger = function (value) {
  if (!Number.isInteger(value)) {
    throw new Error("Is not an integer: " + value);
  }
};
