const { randomBytes } = require("crypto");
const { addLayer0, removeLayer0 } = require("../src/concox/layer0");
//65534
describe("layer0Pack", () => {
  test("Test Package", () => {
    let i = 0;
    while (i < 65534) {
      let pkg0 = randomBytes(i);

      expect(removeLayer0(addLayer0(pkg0))).toStrictEqual(pkg0);
      i = i == 0 ? 1 : i * 2;
    }
  });
});
