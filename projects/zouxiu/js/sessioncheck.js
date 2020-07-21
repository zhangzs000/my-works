var username = sessionStorage.getItem("name")==null?null:sessionStorage.getItem("name");
		if(username==null || username==""){
			alert("请先登录！");
			window.location.href="login.html";
		}