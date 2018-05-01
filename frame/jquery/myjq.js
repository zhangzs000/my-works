(function (root, factory) {
	root.$=factory()
})(this,function(){
	// 这样写并没用体现出代理的思想，但是体现出了架构思想
	// 比如：方法放到一块，自动添加到原型上
	var $ = function(selector){
		return _proxy(selector)
	}
	var _proxy = function(selector) {
		return document.querySelectorAll(selector)
	}
	var _proto_ = {
		addClass: function(clazz){
			console.log('addClass')
			this.each(function(i, obj){
				obj.className = clazz;
			})
			return this;
		},
		removeClass: function(){
			console.log('removeClass');
			return this;
		},
		each: function(callback){
			for (var i = 0; i < this.length; i++) {
				// callback && callback(i, this[i])
				callback && callback.call(this[i], i, this[i])
			};
		}
	}
	$.extend = function(target) {
		// 一层深复制
		for (var i = 1; i < arguments.length; i++) {
			for (key in arguments[i]) {
				target[key] = arguments[i][key]
			};
		};
		// $.fn 也变成target
		return target
	}
	$.fn = $.extend(NodeList.prototype, _proto_)
	// window.$ = $
	return $
})