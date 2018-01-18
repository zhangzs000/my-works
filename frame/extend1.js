(function (root, factory, plug) {
	// body...
	factory(jQuery, plug);
})(this, function(jQuery, plug){
	// 配置默认参数
	var config = {
		initEvent: 'input',
		plugName: 'dr'
	};
	$.fn[plug] = function(options){
		
		if(!this.is('form')) return;

		this.$find = this.find('input');
		$.extend(this, config, options);

		// 教研引擎
		var _RELES_={
			'regexp':function(data){
				console.log('_RELES_: ',data)
				return new RegExp(data).test(this.val());
			},
			'require':function(){
				return this.val();
			}
		}
		console.log('options: ',options)
		console.log('this: ',this,' this.initEvent: ',this.initEvent)
		this.$find.on(this.initEvent,function(){
			console.log(this.value)
			console.log('$(this): ',$(this),' this: ',this)
			var _this = $(this);
			console.log('_this.data(): ',_this.data(config.plugName));
			$.each(_RELES_,function(key, fn){
				console.log(fn)
				var $fileName = _this.data(config.plugName+'-'+key);
				var $message = _this.data(config.plugName+'-'+key+'-message');
				console.log('$fileName: ',$fileName,' $message: ',$message)
				if ($fileName) {
					var result = fn.call(_this, $fileName);
					if (!result) {
						_this.after('<p>'+$message+'</p>')
					}
				}
			})
		})
	}
	// 扩展接口
	$.fn[plug].extension=function(options){

		$.extend(_RELES_, options)
		console.log(11111)
	}
},'dataResult');