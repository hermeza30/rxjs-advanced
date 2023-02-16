const assert = require("assert");
const expect = require("chai").expect;
const { notEmpty, average } = require("./functionstoprove.js");
describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe("Validation", function () {
  it("Should valdite that a string is not empty", () => {
    expect(notEmpty("some input")).to.be.equal(true);
    expect(notEmpty("")).to.be.equal(false);
    expect(notEmpty(null)).to.be.equal(false);
    expect(notEmpty(undefined)).to.be.equal(false);
  });
});
describe("Average numbers", function () {
  it("leak the variable total", () => {
    /**identifying exactly which variable caused a side effect.
     * Inadvertently changing total, a globally declared variable,
     * because of a subtle code bug could have caused any other tests that depended on it to fail.
     *  So as a general rule of thumb, try not to read from or mutate any global state. */
    expect(average([80, 90, 100])).to.be.equal(90);
  });
});
