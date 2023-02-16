function notEmpty(param) {
  return !!param && param.trim().length > 0;
}
function average(arr) {
  let len = arr.length;
  total = arr.reduce((a, b) => a + b);
  return Math.floor(total / len);
}
module.exports = { notEmpty, average };
