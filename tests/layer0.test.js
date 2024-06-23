const { describe, test, expect } = require("@jest/globals"); 
const { randomBytes } = require("crypto");
const { addLayer0, removeLayer0 } = require("../src/layer0");
const { messages } = require("./testData");

//65534
describe("layer0Pack", () => {
  test("Test Package", () => {
    let i = 0;
    while (i < 65534) {
      const pkg0 = randomBytes(i);

      expect(removeLayer0(addLayer0(pkg0))).toStrictEqual(pkg0);
      i = i === 0 ? 1 : i * 2;
    }
  });


  messages.forEach((message) => {
    test("Test Package", () => {
      expect(removeLayer0(addLayer0(message))).toStrictEqual(message);
    });
  });
});
