"use strict";

function hello() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce(function (accu, curr) {
    return "Hello Helo! ".concat(accu, " ").concat(curr);
  });
}