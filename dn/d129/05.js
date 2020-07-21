/**
* 模块分层
DAO,记得以前一般是和数据库挨的最近那个实体类，与数据库一一对应

*/
var express = require('express')

var app = express();

var db = require('./modles/db.js')

app.set('view engine','ejs');

app.use(express.static('./public'));

app.get('/add',function (req,res) {
	var arr = ['zzs1','zzs2','zzs3','zzs4'];
	console.log('db: ',db);
	db.insertOne('school',{'name':arr[parseInt(Math.random()*4)]},function(err, result){
		if(err){
			console.log('插入数据失败')
		}
		res.send('插入成功')
	})
})

app.get('/',function(req,res){
	var page = parseInt(req.query.page);
	// 简单的分页查询
	db.find('school',{'page':page,'sort':{'name':-1}},function(err, results){
		if(err) {
			console.log(err)
			return;
		}
		console.log('results: ',results)
		db.getAllCount('school',function(acount){
			console.log(acount);
			res.render('index',{'result':results,'acount':acount/5})
		})
	})
})
app.listen(3001);
