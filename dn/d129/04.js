
var MongoClient = require('mongodb').MongoClient;

var express = require('express')

var app = express();

// 我感觉这句话的意思是view目录下的文件用ejs引擎解析
app.set('view engine','ejs');

// 引入第三方库
app.use(express.static("./public"));

var dbName = "mongodb://localhost:27017/zzs";

app.get('/add',function (req, res) {
	// 这个是渲染add模板吗？
	res.render('add');
})

app.get('/manage',function(req,res){
	// 请求的参数
	var name = req.query.name;
	var age = req.query.age;
	var sex = req.query.sex;
	MongoClient.connect(dbName,function(err,db){
		if(err) {
			// 从这里可以看出渲染模板用render;直接返回数据用send
			res.send('数据库链接失败')
			return
		}
		res.writeHead(200,{'Connect-type':'text/html;charset=UTF-8'});
		// 直接往页面写解析html用wirte,模板render,返回数据直接send
		res.write("<h1>恭喜，数据库链接成功</h1>")

		db.collection('users').insertOne({
			'name': name,
			'age': age,
			'sex': sex
		},function(err, result){
			if(err){
				res.send('写入失败');
				return;
			}
			res.write('<h3>插入成功</h3>');
			// 这个end感觉很疑惑，虽然很语义
			res.end();

			db.close();
		})
	})
})

app.get('/',function(req,res){
	MongoClient.connect(dbName,function(err, db){
		if(err){
			res.send('数据库链接失败')
			return
		}
		var result = [];
		var cursor = db.collection('users').find();
		cursor.each(function(err,doc){
			if(err) {
				return
			}
			if(doc !==null){ 
				result.push(doc);
			}else {
				db.close();
				res.render('index',{'result':result})
			}


		})
			})
	})
app.listen(3001)