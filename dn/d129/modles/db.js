/**
* 这个模块封装所有对数据库的操作，这个应该和java中M层是一个意思
*/
var MongoClient = require('mongodb').MongoClient;
var setting = require('../setting.js') 

// 数据库连接
function _connectDB (callback) {
	var url = setting.dbUrl;
	MongoClient.connect(url,function(err, db){
		if(err) {
			callback(err, null);
			return;
		}
		callback(err, db);
	})
} 

// 插入数据
exports.insertOne = function(collectionName, json, callback){
	_connectDB(function(err, db){
		db.collection(collectionName).insertOne(json, function(err, result){
			callback(err, result)
			db.close();
		})
	})
}
// 获取所有数据
exports.getAllCount = function(collectionName,callback){
	_connectDB(function(err, db){
		db.collection(collectionName).count({}).then(function(count){
			callback(count);
			db.close()
		})
	})
}

// 查询
// args接受所有的参数
exports.find = function(collectionName, args, callback){
	var page = args.page || 1;
	var pageamount = args.pageamount || 5;
	var skipNum = pageamount* (args.page-1) || 0;
	var sort = args.sort || {};
	_connectDB(function(err, db){
		var results = [];
		var cursor = db.collection(collectionName).find().skip(skipNum).limit(pageamount).sort(sort);
		cursor.each(function(err, doc){
			if(err){
				callback(err, null);
				db.close()
				return;
			}
			if(doc != null) {
				results.push(doc)
			}else {
				callback(null,results);
				db.close();
			}
		})
	})
}