$("footer").load("footer.html",function(){
	//	绑定事件
	$("footer").on("click","span",function(){
		$("footer span").css("border-top","5px solid #484850");
		$(this).css("border-top","5px solid #e4366b");
		if($(this).hasClass("f1")){
			window.location.href="main4.html";
		}else if($(this).hasClass("f2")){
			window.location.href="category3.html";
		}else if($(this).hasClass("f3")){
			window.location.href="cart.html";
		}else if($(this).hasClass("f4")){
			window.location.href="myshow.html";
		}else{
			window.location.href="more.html";
		}
	})
	
})