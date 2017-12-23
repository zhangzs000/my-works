(function (global, factory) {
	// commonJs规范，node环境下
	if(typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = factory();
	} else {
		global.ZZS = global.$ = factory()
	}
	
})(typeof window !== 'undefined'? window : this, function(){
	var ZZS = {
		myApply : function(func, context, arr) {

			context = context || window;
			context.fn = func;
			let result;
			if (!arr) {
				// 什么都没传 undefined
				result = context.fn()	
			} else {
				// 数组为空或有值
				result = context.fn(...arr)
			}
			
			delete context.fn
			// 函数一般有返回值？
			return result
		}
	}

	return ZZS;
})