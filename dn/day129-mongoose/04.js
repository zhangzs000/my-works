//引包：mongoose
var mongoose = require("mongoose");
//创建一个数据库的连接
mongoose.connect("mongodb://localhost/testdb");

//给cats表增加评论：内容和时间

//mongodb特性：不存在则创建
var catSchema = new mongoose.Schema({
    name:String,
    age:Number,
    sex:String,
    comments:[{body:String,date:Date}]//评论是有多条的建议是数组
});
//发表评论
catSchema.methods.comment = function(obj,callback){
    this.comments.push(obj);
    this.save();
}

var Cat = mongoose.model("Cat1",catSchema);

/*
评论条件：
1、评论那一条
2、评论的内容、时间

*/
// var a1 = new Cat({name: 'a1',age: 12,sex: 'nan',comments:[{body:'aaa',date:new Date()}]})
// a1.save()
//name+findOne肯定只会操作一条数据，因为你的第二条以后的数据就没法评论了
//查询如果只有一条而且需要精准到位，必须查询具有唯一性的条件
Cat.findOne({name:"a1"},function(err,cat){
    if(err || !cat){
        console.log("操作出现问题了。。。正在保修中");
        return;
    }
    cat.comment({"body":"aaa","date":new Date()});

});











