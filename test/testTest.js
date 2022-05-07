const assert = require("assert");

describe("Testing tests", () => {
  it("Tests if 0 is equal to 0", () => {
    assert.equal(0, 0);
  });

  it("Test should fail", () => {
    assert.equal("Amar", "Ado");
  });
});
