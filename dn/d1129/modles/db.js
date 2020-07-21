/*
    这个模块封装所有对数据库的常用操作
*/

var MongoClient = require("mongodb").MongoClient;
var setting = require("../setting.js");

function _connectDB(callback){
    var url = setting.dbUrl;
    MongoClient.connect(url,function(err,db){//异步操作
        if(err){
            //错误的时候是没有db的
            callback(err,null);
            return;
        }
        callback(err,db);
    });
}


//插入数据
exports.insertOne = function(collectionName,json,callback){
    _connectDB(function(err,db){//进入这个方法就已经连接上了数据库
        db.collection(collectionName).insertOne(json,function(err,result){
            callback(err,result);
            db.close();
        });
    })
}
//删除
exports.deleteMany = function(collectionName,json,callback){
    _connectDB(function(err,db){
        db.collection(collectionName).deleteMany(
            json,function(err,result){
                callback(err,result);
                db.close();
            }
        )
    });
}
//修改
exports.updateMany = function(collectionName,updateName,json,callback){
    _connectDB(function(err,db){
        db.collection(collectionName).updateMany(
            updateName,json,function(err,result){
                callback(err,result);
                db.close();
            }
        )
    });

}


exports.getAllCount = function(collectionName,callback){
    _connectDB(function(err,db){
        db.collection(collectionName).count({}).then(function(count){
            callback(count);
            db.close();
        });
        
        /*db.collection(collectionName).count({}).then(function(count){
            callback(count);
            db.close();
        })*/
    });
}

























