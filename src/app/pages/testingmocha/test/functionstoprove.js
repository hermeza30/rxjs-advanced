const XMLHttpRequest = require("xhr2");
const { from, reduce, delay, take, filter, map } = require("rxjs");

function notEmpty(param) {
  return !!param && param.trim().length > 0;
}
function average(arr) {
  let len = arr.length;
  total = arr.reduce((a, b) => a + b);
  return Math.floor(total / len);
}
function ajaxRequest(url, success, error) {
  let req = new XMLHttpRequest();
  req.responseType = "json";
  req.open("GET", url);

  req.onload = function () {
    if (req.status === 200) {
      let data = req.response.query.search[0];
      success(data);
    } else {
      req.onerror();
    }
  };
  req.onerror = function () {
    if (error) {
      error(new Error("Io Error"));
    }
  };
  req.send();
}
function ajaxRequestPromises(url, success, error) {
  const promises = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.responseType = "json";
    req.open("GET", url);
    req.onload = function () {
      if (req.status === 200) {
        let data = req.response.query.search[0];
        resolve(data);
      } else {
        reject(new Error("Io Error"));
      }
    };
    req.onerror = function () {
      reject(new Error("Io Error"));
    };
    req.send();
  });
  return promises;
}

function isEven(num) {
  return num % 2 === 0;
}
function square(num) {
  return num * num;
}
function add(a, b) {
  return a + b;
}
function runInterval(source$) {
  /**
* Separate:
• Producer
• Pipeline
• Subscriber
*/

  return source$.pipe(take(10), filter(isEven), map(square), reduce(add));
}
module.exports = {
  notEmpty,
  average,
  ajaxRequest,
  ajaxRequestPromises,
  runInterval,
};
