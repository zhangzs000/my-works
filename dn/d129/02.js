
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var util = require('util');

// 使用cookie必须使用cookie-parser
app.use(cookieParser());
app.get('/',function (req, res) {
	// body...
	res.send('欢迎光临'+req.cookies.username);
});
app.get('/login',function(req, res){
	var username = req.query.username;
	// maxAge最大过期时间；httpOnly防止xss攻击？只能web server访问
	// maxAge:999设置成999毫秒竟然登录不进去，我说为什么看不见cookie
	res.cookie('username',username,{maxAge:99911,httpOnly:true});
	console.log('username: ',username,'为什么是请求req: ',req.cookies.username)
	res.send('登录成功');
})
app.listen(3001);