let pathToRegExp = require('path-to-regexp');

let reg = pathToRegExp('./home', [], {end: false});
console.log(reg)