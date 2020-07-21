//弹出框
window.alert=function(text){
	dialog(text);
}

function dialog(text){
	var screen = document.createElement("div");
	var dialogBox=document.createElement("div");
	var title=document.createElement("div");
	var closeBtn=document.createElement("div");
	var textBox=document.createElement("div");
	var titleTips = document.createElement("div");

	//内容
	textBox.innerHTML=text;
	closeBtn.innerHTML="X";
	titleTips.innerHTML="提示";

	//样式
	screen.style.position="absolute";
	screen.style.left="0px";
	screen.style.top="0px";
	screen.style.zIndex=100;
	screen.style.width="100%";
	screen.style.height="100%";
	screen.style.backgroundColor="rgba(256,256,256,0.7)";
	

	dialogBox.style.position="absolute";
	dialogBox.style.left="50%";
	dialogBox.style.top="50%";
	dialogBox.style.width="200px";
	dialogBox.style.height="80px";
	dialogBox.style.marginLeft="-100px";
	dialogBox.style.marginTop="-60px";
	dialogBox.style.background="#fff";



	title.style.position="absolute";
	title.style.left="0px";
	title.style.top="-30px";
	title.style.width="100%";
	title.style.height="36px";
	title.style.background="#e4366b";
	title.style.color="#fff";
	title.style.borderTopLeftRadius="10px";
	title.style.borderTopRightRadius="10px";

	titleTips.style.position="absolute";
	titleTips.style.left="0px";
	titleTips.style.top="0px";
	titleTips.style.width="70px";
	titleTips.style.height="100%";
	titleTips.style.lineHeight="180%";
	titleTips.style.textAlign="center";
	titleTips.style.fontSize="20px";
	//titleTips.style.borderRadius="20px";

	closeBtn.style.position="absolute";
	closeBtn.style.right="0px";
	closeBtn.style.top="0px";
	closeBtn.style.width="40px";
	closeBtn.style.height="100%";
	closeBtn.style.lineHeight="180%";
	closeBtn.style.textAlign="center";
	closeBtn.style.fontSize="20px";
	//closeBtn.style.borderRadius="20px";


	textBox.style.position="absolute";
	textBox.style.left="0px";
	textBox.style.bottom="-25px";
	textBox.style.width="90%";
	textBox.style.height="90%";
	textBox.style.fontSize="20px";
	textBox.style.color="#000";
	textBox.style.padding="10px";
	textBox.style.overflow="hidden";
	textBox.style.fontSize="16px";
	textBox.style.fontWeight="bold";
	

	
	title.appendChild(closeBtn);
	title.appendChild(titleTips);

	dialogBox.appendChild(title);
	dialogBox.appendChild(textBox);
	screen.appendChild(dialogBox);
	document.getElementsByTagName("body")[0].appendChild(screen);
	closeBtn.onclick=function(){
		document.getElementsByTagName("body")[0].removeChild(screen);
	}
}