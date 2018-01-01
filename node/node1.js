/*
1、exports 相当于module.exports的别名，令模块开发者少写代码！
2、exports 属性更加安全；exports.add = function(){}
3、require() 并不会反回exports;只会返回module.exports;

exports -->{} <---module.exports
Both of then are references the same (empty)object at the beggining.(But only module.exports will be returned)
*/
var obj = {val: 1};
// obj 和o 开始共享一个地址，后来断掉了
function foo(o) {
	o = {val: 2};
	console.log(o.val);
}
foo(obj)
console.log(obj.val)

var a = {n:1};
a.x = a = {n:2};
console.log('a.x: ',a.x,' a: ',a)

const cal = require('./cal.js');
console.log('add: ',cal.add(1, 1))
console.log('multiply: ',cal.multiply(1, 1))
console.log('divide: ',cal.divide(1, 1))