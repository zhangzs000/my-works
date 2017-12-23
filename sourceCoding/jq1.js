(function(root, factory){
	// 模块化,这个module是服务端的吗？一般es6导出模块时export xxx 或export default xxx;拿到module。exports才是export的一个引用？？？
	if (typeof module === 'object' && typeof module.export === 'object') {
		module.exports = factory();
	} else {
		root.ZZS = root.$ = factory() 
	}
})(this, function(){
	var ZZS = {
		type: function(obj) {
			if (obj == null) {
				return obj+'';
			}
			return typeof obj === 'object' || typeof obj === 'function' ? class2type[Object.prototype.toString.call(obj)] || 'object' : typeof obj
		},
		isFunction: function(fn) {
			return this.type(fn) === 'function';
		}
		// 下面这个写法也行，自我感觉不标准！
		// isFunction(fn) {
		// 	return this.type(fn) === 'function';
		// }

	};
	var class2type = {};
	"Boolean Undefined Null Date Array Function Object Error RegExp".split(" ").map((item, index) => {
		class2type['[object '+item+']'] = item.toLowerCase();
	})
	return ZZS;
})