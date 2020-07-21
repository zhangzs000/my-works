/*
    DAO：Data access Object
    访问数据库的一个对象

    将重心放在业务上，而非代码累积上

*/
//require("mongodb").ObjectID
var express = require("express");
var app = express();
var db = require("./modles/db.js");


app.get("/add",function(req,res){
    var arr = ["小芳","小红","小李","小啥"];
    console.log(db);
    db.insertOne("school",{"name":arr[parseInt(Math.random()*4)]},function(err,result){
        if(err){
            console.log("插入数据失败");
            return;
        }
        res.send("插入成功");
    });
});


app.get("/delete",function(req,res){
    var id = req.query.id;
    db.deleteMany("school",{"name":id},function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.send(result);
    });
});

app.get("/update",function(req,res){
    var username = req.query.name;
    var updateName = req.query.updateName;
    /*
        凡是用户传入的数据必须验证和判断，建议使用正则
        不要相信用户会按照你理想的输入方式输入
    */
    db.updateMany(
        "school",
        {
            "name":username
        },{
            $set:{name:updateName}
        },
        function (err,result){
            if(err){
                console.log(err);
                return;
            }
            res.send(result);
        }
    );    
});


app.get("/getAll",function(req,res){
    db.getAllCount("school",function(acount){
        console.log(acount);
        //res.send()不能传入数字
        res.send(acount.toString());
    })
});


app.listen(3000);





























