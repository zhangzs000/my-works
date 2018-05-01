/*
function proxy(selector) {

}
function $(selector) {
	return new proxy(selector);
}
// 声明提前但未赋值
$.fn = {
	addClass: function() {
		console.log(1111)
	},
	removeClass: function() {
		console.log(222)
	}
}
proxy.prototype = $.fn;
$.extend=function(target){
	for (var i = 1; i < arguments.length; i++) {
		for (key in arguments[i]) {
			target[key] = arguments[i][key]
		};
	};
	console.log('target； ',target)
}
*/

// console.log('$: ',$)
(function(root, factory, plug){
	root[plug] = factory($, plug)
})(window, function($, plug){
	let def = {
		data: ['a', 'b', 'c'],
		a:0,
		b:0
	}
	let funs = {
		// 放到插件里面的话，每次调用都会在局部新增内存空间
		_init: function() {
			let ul = $('<ul>');
			for (var i = 0; i < this.data.length; i++) {
				// ul.append($('<li>'+i+'</li>'))
				ul.append($(`<li>${this.data[i]}</li>`))
			};
			this.append(ul);
		}
	}

	$.fn[plug] = function(options) {
		
		// console.log('this: ',this)
		$.extend(this, def, options, funs)

		this._init()
	}
	return function(options, dom) {
		$.extend(this, def, options, funs)
		console.log('this: ',this)
		// this._init()	
		// let ul = $('<ul>');
		// for (var i = 0; i < this.data.length; i++) {
		// 	// ul.append($('<li>'+i+'</li>'))
		// 	ul.append($(`<li>${this.data[i]}</li>`))
		// };
		// $('#wrap1').append(ul);
		// init方法不通用，因为里面的this变了，
		// 解决方式: 1、重写一遍，稍微修改；2、加判断，或加参数判断；2、调用它已经有的方法$('#wrap1')[plug]()；就像$('#wrap1').myplug({}),想传参$('#wrap1').myplug.call($('#wrap1'), options)
		$('#wrap1')[plug](options)
	}
}, 'myplug')
