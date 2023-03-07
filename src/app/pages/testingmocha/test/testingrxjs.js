const assert = require("assert");
const expect = require("chai").expect;
const { from, reduce, delay } = require("rxjs");
const {
  notEmpty,
  average,
  ajaxRequest,
  ajaxRequestPromises,
} = require("./functionstoprove.js");

describe("Adding numbers", () => {
  it("should add numbers together", function () {
    const adder = (total, delta) => total + delta;
    from([1, 2, 3, 4, 5, 6, 7, 8, 9])
      .pipe(reduce(adder))
      .subscribe((total) => expect(total).to.equal(45));
  });
  it("should add numbers together with delay", function (done) {
    const adder = (total, delta) => total + delta;
    from([1, 2, 3, 4, 5, 6, 7, 8, 9])
      .pipe(reduce(adder), delay(1000))
      .subscribe((total) => expect(total).to.equal(45), null, done);
  });
  it("Usando observables- Fetch wikipedia", function (done) {
    const searchTerm = "reactive+programming";
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${searchTerm}`;
    const obs = {
      next: (res) => expect(res).to.have.property("title").with.length(20),
      error: null,
      complete: () => done(),
    };
    from(ajaxRequestPromises(url)).subscribe(obs);
  });
});
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
describe("Asynchronous Test", function () {
  it(
    "Should fetch wikipedia pages for search term" + '"Reactive programming"',
    function (done) {
      const searchTerm = "reactive+programming";
      const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${searchTerm}`;
      const success = function (result) {
        expect(result).to.have.property("title").with.length(20);
        done();
      };
      const error = function (err) {
        done(err);
      };
      ajaxRequest(url, success, error);
    }
  );
  it(
    "Should fetch wikipedia pages for search term" +
      '"Reactive programming" PROMISES',
    function (done) {
      const searchTerm = "reactive+programming";
      const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${searchTerm}`;

      ajaxRequestPromises(url)
        .then((resolve) => {
          expect(resolve).to.have.property("title").with.length(20);
          done();
        })
        .catch(done);
    }
  );
  it("Should fail for invalid URl", function (done) {
    const url = "https://mochajs2.org/";
    const success = (data) => {
      done(new Error("Should not have been successfull!"));
    };
    const error = (err) => {
      expect(err).to.have.property("message").to.equal("Io Error");
      done();
    };
    ajaxRequest(url, success, error);
  });
});
