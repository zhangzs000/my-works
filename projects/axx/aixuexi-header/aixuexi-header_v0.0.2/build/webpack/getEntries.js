var path = require('path');
var fs = require('fs');
var glob = require('glob');
var config = require('../config');
var views = require('../../src/pages/views');

function getEntry(hotMiddlewareScript) {
	// var pattern = config.sourcePath + '/pages/*/index.js';
	// //glob: 路径模式匹配 是匹配到的文件的数组
	// var array = glob.sync(pattern);
	// var newObj = {};
	// console.log(array)
	// array.map(function(el){
	// 		var reg = new RegExp('pages/(.*)/index.js','g');
	// 		reg.test(el);
	// 		if (hotMiddlewareScript) {
	// 			newObj[RegExp.$1] = [el, hotMiddlewareScript];
	// 		} else {
	// 			newObj[RegExp.$1] = el;
	// 		}
	// 		console.log(newObj);
	// });
	// return newObj;

	/**
	 * 获取入口对象
	 * @param {Object} views src/pages下的路由配置对象
	 * @param {String} superKey 上一层目录key名, 如果没有默认为空字符串
	 * @return {Object} 入口信息的map集合
	 */
	function getEntrysFromViews(views, superKey) {
		// superKey没有值, 说明没有上层目录,
		superKey = superKey || '';
		var entrys = {};

		for (var key in views) {
			// 每个key标识src文件目录
			var val = views[key];
			if (val.views && val.views.constructor === Object) {
				Object.assign(entrys, getEntrysFromViews(val.views, superKey + key + '/'));
			} else {
				setKeyToEntrys(superKey + key, entrys);
			}
		}

		return entrys;
	}

	/**
	 * 将当前路由文件设置到入口集合中
	 * @param {String} curKey 当前路由文件路径
	 * @param {Object} entrys 入口集合map值
	 */
	function setKeyToEntrys (curKey, entrys) {
		var pattern = config.sourcePath + '/pages/' + curKey + '/index.js';
		// var newObj = {};

		if (hotMiddlewareScript) {
			entrys[curKey] = [pattern, hotMiddlewareScript];
		} else {
			entrys[curKey] = pattern;
		}
		// return newObj;
	}

	return getEntrysFromViews(views);	
}




module.exports = getEntry