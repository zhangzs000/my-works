;(function(){
	Gaosi.header = function (option) {
		this.config={
			
		};
		// Object.assign(this.config,option);
	   this.header = null;
	};
	Gaosi.header.prototype = {
		// 初始化
		_init: function() {

			let headerWrap = document.createElement("div");
			let styleWrap = document.createElement('style');
			
			styleWrap.setAttribute('rel','stylesheet');
			styleWrap.setAttribute('type','text/css');

			headerWrap.innerHTML = new Gaosi.util.GSTempParse().build(Gaosi.config.LINK);
			styleWrap.innerHTML += Gaosi.Css.reset;
			styleWrap.innerHTML += Gaosi.Css.header;

			document.getElementsByTagName('body')[0].insertBefore(headerWrap,document.body.firstChild);
			document.getElementsByTagName('head')[0].appendChild(styleWrap);

			this.header = headerWrap;

			return this;
		}
	};
})();