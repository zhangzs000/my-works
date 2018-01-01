class Cal {
	add(a, b) {
		console.log('Class Cla')
		return a+b
	};
	
}

// exports.Cal = Cal
// module.exports.Cal = Cal
// 打开node.js.exe发现module.exports 是真实存在的 并且是{}
// 所以 module.exports.Cal = Cal ==》 {}.Cal = Cal => 所以对对面要用{Cal}接受，相当于解构赋值
// 而 module.exports = Cal ==> 把{}完全覆盖，所以对面用const Cal接受就ok
module.exports = Cal
let a = new Cal();
console.log(a.add(1, 2))