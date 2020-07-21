var MongoClient = require("mongodb").MongoClient;

var express = require("express");

var app = express();

app.set("view engine","ejs");

var dbName = "mongodb://localhost:27017/dnedu";

app.get("/add",function(req,res){
    res.render("add");
});


app.get("/manage",function(req,res){
    //得到请求参数
    var name = req.query.name;
    var age = req.query.age;
    var sex = req.query.sex;
    MongoClient.connect(dbName,function(err,db){
        //当进入这个function表示已经连接上数据库
        if(err){
            res.send("数据库链接失败");
            return;
        }
        res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
        res.write("<p>恭喜，数据库已经成功连接上</p>");
        //集合不存在则创建
        db.collection("users").insertOne({
            "name":name,
            "age":age,
            "sex":sex
        },function(err,result){
            if(err){
                res.send("数据库写入失败");
                return;
            }
            res.write("恭喜，数据库成功插入");
            res.end();

            db.close();

        });



    });

});

app.get("/",function(req,res){
    MongoClient.connect(dbName,function(err,db){
        //当进入这个function表示已经连接上数据库
        if(err){
            res.send("数据库链接失败");
            return;
        }
        //集合不存在则创建
        var result = [];
        var cursor = db.collection("users").find();
        cursor.each(function(err,doc){
            if(err){
                return;
            }
            if(doc != null){
                result.push(doc);
            }else{
                db.close();
                res.render("index",{"result":result});
            }
            
        });


    });



});



app.listen(3000)























