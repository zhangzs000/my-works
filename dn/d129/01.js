/**
* 测试session会话,session是服务端操作，cookie是本地操作；但sesson仍是基于cookie实现；
禁用cookie，session也会不能使用
*/ 
var express = require('express')
var session  = require('express-session');
var app = express();

app.use(session({
	secret: 'xxx', // 应用在https
	resave: false,  // 每次请求都重新设置session
	saveUninitialied: true // 无论有没有session,每次请求都重新设置session
})) 
 app.get('/',function (req, res) {
 	// body...
 	res.send('欢迎光临'+ req.session.username);
 })
 app.get('/login',function(req,res){
 	req.session.username = "zzs";
 	res.send('登录成功')
 })
 app.listen(3001)