
var MongoClient = require('mongodb').MongoClient;
var express  = require('express');
var app = express();

// 27017是mongodb的默认端口
// 链接形如： url+端口+数据库名字
var dbName = "mongodb://localhost:27017/zzs"
// 数据库不存在，mongodb自动帮我们创建
app.get('/',function (req, res) {
	// MongoClient是不是类似以前oracle的Manager，它是跨平台的关键？
	MongoClient.connect(dbName, function(err, db){
		if(err) {
			res.send('连接失败')
			return;
		}
		res.writeHead(200,{'Content-type':"text/html;charset=UTF-8"});
		res.write('<h1>	链接成功！</h1>')
		// 集合/表不存在就创建
		db.collection('zzsBBS').insertOne({'name':'zzzzzz'},function(err,result){
			if(err){
				res.send('数据库写入失败')
				return;
			}
			res.write('恭喜，数据库插入成功');
			res.end();
			db.close();

		})
	})
})
app.listen(3001)