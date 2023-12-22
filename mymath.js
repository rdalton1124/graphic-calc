
function log(base, num) {
  return log(num) / log(base);
}

export const csc = new Function("x", "return 1 / Math.sin(x);"); 
  //return function(x) {
  //  return 1 / Math.sin(x);
  //};
//}
function sec(x) {
  return 1 / Math.cos(x);
}
function cot(x) {
  return 1 / Math.tan(x);
}
function acsc(x) {
  return Math.asin(1 / x);
}
function asec(x) {
  return Math.acos(1 / x);
}
function acot(x) {
  return Math.atan(1 / x);
}

