var globalPr={
	myscroll:null,
	userID:sessionStorage.getItem("name"),
	$carSum:$(".carSum")
};
;(function(){
	//getNav();

	getCar({
		userID:sessionStorage.getItem("name"),
		callback:function(data){
			if(data.length>0){
				$(".carSum").html(data.length);
			}else{
				$(".carSum").hide();
			}
			
		}
	})
})();

/*
 * 购物车更新方法，参数（{
	userID:用户ID,
	goodsID:商品ID,
	number:购买商品数量,
	sumBox:购物车总数显示的容器，JQ结果集类型,
	updataCallBack:更新成功回调函数，类型function
}）
 */
function updateCar(opt){
	var config={
		userID:"",
		goodsID:"",
		number:1,
		sumBox:null,
		updataCallBack:function(){
			
		}
	};
	$.extend(config,opt);
	$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{
		userID:config.userID,
		goodsID:config.goodsID,
		number:config.number
	},function(data){
		if(typeof config.updataCallBack =="function"){
			config.updataCallBack(data);
			if(data==1){
				getCar({
					userID:config.userID,
					callback:function(data){
						config.sumBox.html(data.length);
					}
				})
			}
		}
		
	})
	
	
}

/*查看购物车方法*/
function getCar(opt){
	var config={
		userID:"",
		callback:function(){
			
		}
	}
	$.extend(config, opt);
	$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{
		userID:config.userID
	},function(data){
		if(typeof config.callback=="function"){
			config.callback(data);
		}
	})
}
