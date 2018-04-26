/*
写几个这样写的优点：
1、插件化，可以单独提取，如果仅仅是切换路由，可以提出一个工具方法；
2、必须是a标签（或浏览器的前进后退，或history.pushState()/replaceState）
3、真正的业务函数会和架构分离，我觉得这是关键（也是和我以前写的的差别）

*/
function Routers () {
	this.routes = {};
	this.currentUrl = "";
}
Routers.prototype = {
	route: function(path, callback) {
		this.routes[path] = callback || function(){};

	},
	update: function() {
		console.log('update: ',this);
		this.currentUrl = location.hash.slice(1) || '/home';
		this.routes[this.currentUrl]();
	},
	bindEvent: function() {
		var all = document.querySelectorAll('a[data-href]');
		for (let i = 0; i < all.length; i++) {
			all[i].addEventListener('click',function(){
				var url = this.getAttribute('data-href')
			    history.pushState(null, null, url);
			    update(url)
			},false)
		};
	}
	init: function() {
		window.addEventListener('load', this.update.bind(this), false)
		window.addEventListener('hashchange', this.update.bind(this), false)
	}
};