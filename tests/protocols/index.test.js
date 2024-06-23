const { test, expect } = require("@jest/globals");
const { parse } = require("../../");
const { messages } = require("../testData");

messages.forEach((message) => {
  test("Test Package", () => {
    expect(typeof parse(message).object === "object").toBe(true);
  });
});
