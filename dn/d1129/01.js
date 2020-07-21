var MongoClient = require("mongodb").MongoClient;

var express = require("express");

var app = express();


//URL + 端口号 + 数据库名字

//27017是mongodb默认端口
var dbName = "mongodb://localhost:27017/dnedu";
//当数据库不存在时，mongodb会自动帮我们创建
//var shujukumingzi/sjkmz

/*
    不管是什么数据库都会有一个：
    连接/启动 - 查询 - 关闭的过程
*/

app.get("/",function(req,res){
    MongoClient.connect(dbName,function(err,db){
        //当进入这个function表示已经连接上数据库
        if(err){
            res.send("数据库链接失败");
            return;
        }
        res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
        res.write("<p>恭喜，数据库已经成功连接上</p>");
        //集合不存在则创建
        db.collection("bbs").insertOne({"name":"dongnaoedu.com"},function(err,result){
            if(err){
                res.send("数据库写入失败");
                return;
            }
            res.write("恭喜，数据库成功插入");
            res.end();//结束输出

            db.close();

        });
    });



});



app.listen(3000)























