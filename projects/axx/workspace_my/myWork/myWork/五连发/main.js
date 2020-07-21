//topNav
var zp_navmore = document.getElementById("zp_navmore");
var gj_navmore = document.getElementById("gj_navmore");
var gd_navmore = document.getElementById("gd_navmore");
var topSearch = document.getElementById("topSearch");

var zp_navmorecon = document.getElementById("zp_navmorecon");
var gj_ul = document.getElementById("gj_ul");
var gd_ul = document.getElementById("gd_ul");
var sear_table = document.getElementById("sear_table");


zp_navmore.onmouseover=function () {
	zp_navmorecon.style.display="block";
}
zp_navmore.onmouseout=function () {
	zp_navmorecon.style.display="none";
}
gj_navmore.onmouseover=function () {
	gj_ul.style.display="block";
}
gj_navmore.onmouseout=function () {
	gj_ul.style.display="none";
}
gd_navmore.onmouseover=function () {
	gd_ul.style.display="block";
}
gd_navmore.onmouseout=function () {
	gd_ul.style.display="none";
}
topSearch.onmouseover=function () {
	sear_table.style.display="block";
}
topSearch.onmouseout=function () {
	sear_table.style.display="none";
}

//返回顶部
function appdownremove(){
	var appDown = document.getElementById("appDown");
	appDown.style.display="none";
}
var goTop = document.getElementById("goTop");

goTop.style.display="none";
window.onscroll = function(){
var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
	if(scrollT>0){
		goTop.style.display="block";
	}else{
		goTop.style.display="none";	
	}
}
goTop.onclick=function(){
	document.documentElement.scrollTop= document.body.scrollTop=0;
}

//轮播图
var btn_l=document.getElementById("lun_l");	
var btn_r=document.getElementById("lun_r");	
var con_lun=document.getElementById("con_lunbo");
var ul_lunbo = document.getElementById("box_lunbo").children;
var oImg = con_lun.getElementsByTagName('img');
var index=0;
var zIndex=2;
var r = 0;
var flag=true;
setInterval(function(){
	r=parseInt(Math.random()*3);
},500)
btn_r.onclick=function () {
	if(flag){
		if(index==oImg.length-1){
		index=0;
		}else{
			index++;
		}
		change(r);	
	}
	
}
btn_l.onclick=function () {
	if(flag){
		if(index==0){
		index=3;
		}else{
			index--;
		}
		change(r);
	}
}
function change(r){
	flag = !flag;
	switch (r){
		case 0:
			change0();
			break;
		case 1:
			change1();
			break;
		default :
			change2();
			
	}

}
function change0(){
	
	oImg[index].style.zIndex=zIndex++;
	oImg[index].style.width=0;	
	move(oImg[index],"width",1083);
}
function change1(){
	
	oImg[index].style.zIndex=zIndex++;
	oImg[index].style.height=0;	
	move(oImg[index],"height",350);

}
function change2(){
	
	oImg[index].style.zIndex=zIndex++;
	oImg[index].style.opacity=0;	
	move(oImg[index],"opacity",100);

}
setInterval(btn_r.onclick,3000);
//底部
var ftchooselist_ul = document.getElementById("ftchooselist_ul");
var footerSearch_ser =document.getElementById("footerSearch_ser");
footerSearch_ser.onmouseover = function(){
	ftchooselist_ul.style.display="block";
}
footerSearch_ser.onmouseout=function(){
	ftchooselist_ul.style.display="none";	
}
//库
var $={
	//设置cookie
	 setCookie:function(key,value,t){
		var t = new Date();
		t.setDate(t.getDate()+t);
		document.cookie=key+"="+value+"; expires="+t;

	},
	//得到cookie
	 getCookie:function(key){
		var oCookie = document.cookie.split("; ");
		for(var i=0;i<oCookie.length;i++){
			var co = oCookie[i].split("=");
			if(co[0]==key){
				return co[1];
			}
		}
		return null;
	},
	getCookies:function(keys){
		alert(typeof keys);
	},
	//移除cookie
	 removeCookie:function(key){
		$.setCookie(key,'',-1);
	},
	getByClass:function(obj,nClass){
		var oTag = obj.getElementsByTagName('*');
		var result=[];
		for (var i = 0; i < oTag.length; i++) {
			if(oTag[i].className==nClass){
				result.push(oTag[i]);
			}
		}
		return result;
	},
	ajax:function (url,funSucc,fnFail){//如果没有的话，就是调用，那底下的函数名和要调用的就要一样，那callback不就函数是引用吗？
				var xml = null;
			if(window.XMLHttpRequest){
				xml = new XMLHttpRequest();
			}else{
				xml = new ActiveXObject("MSXML2.XMLHttp");
			}
			//xml.open("GET",url+"&t="+new Date().getTime(),true);
			xml.open("GET",url+"?t="+new Date().getTime(),true);
			xml.send();
			xml.onreadystatechange=function(){
				if(xml.readyState == 4){//if(xml.readyState == 2){
					if(xml.status==200){
						
						//var mtlist = eval(xml.reponseText());
						//var mtlist = eval(xml.responseText);
						funSucc(xml.responseText);

					}else{
						fnFail(xml);
					}
				}
			}	
		}
}
//轮播
	/*
function getStyle(DOM,name){
		if(DOM.currentStyle){
			return DOM.currentStyle[name];
		}else{
			return getComputedStyle(DOM,false)[name];
		}
	}

function move(DOM,attr,target){
	clearInterval(DOM.timer)
	DOM.timer=setInterval(function(){
		if(attr=='opacity'){

			var cur=Math.round(parseFloat(getStyle(DOM,attr))*100);

		}else{

			var cur=parseInt(getStyle(DOM,attr));

		}
		var speed=(target-cur)/10;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);

		if(cur==target){
			clearInterval(DOM.timer);
		}else{
			if(attr=='opacity'){

				DOM.style.filter='alpha(opacity:'+(cur+speed)+')';
				DOM.style.opacity=(cur+speed)/100;
			}else{

				DOM.style[attr]=cur+speed+'px';

			}
		}

	},30)
}
*/
//ajax
loadPage(1);
function loadPage(num){
var oUl=document.getElementById("ajax_con_ul");
$.ajax("../data/data"+num+".txt?t="+new Date().getTime(),loadData,loadFail);	
function loadData(str){
			var mtlist = eval(str);
			for(var i=0;i<mtlist.length;i++){
				var oLi = document.createElement("li");
				oLi.innerHTML = '<a href="#"><img width=250px height=188px src="'+mtlist[i]['work_img']+'"></a><div class="camLiCon"><div class="camLiTitleC hot"><p><a href="#" >'+mtlist[i]['label']+'</a></p></div><div class="camLiDes"><b><a href="#" style="color:#ff0084;">'+mtlist[i]['work']+'</a></b>-<a href="#">'+mtlist[i]['type_big']+'</a>-<a href="#" >'+mtlist[i]['type_small']+'</a><br>'+mtlist[i]['time']+'<br><span class="cf30">'+mtlist[i]['view_sum']+'</span>  人气 <span>/</span> <span class="cf30">'+mtlist[i]['comment']+'</span> 评论 <span>/</span><span class="cf30">'+mtlist[i]['support']+'</span> 推荐 </div><div class="ajax_bottom"><span class="word">'+mtlist[i]['blogger_name']+'</span><a href="#"><img src="'+mtlist[i]['blogger_head']+'" width="30px" height="30px"></a></div></div>';
				oUl.appendChild(oLi);       
				
			}
		}
function loadFail(xml){
	console.log(xml.status);
}	
}

