var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/testdb");

var db = mongoose.connection;
// 这里用对象调用方法，必然还会有其它扩展的方法
db.once("open",function(){
    console.log("数据库成功连接上了。。。。");  
});

//定义一个schema
//schema类型：字符串(String)、日期型(Date)、数值型(Number)、布尔型(Boolean)、null、数组类型(Array)、内嵌文档

/*
Schema：他本身不具备操作能力
Model：由Schema发布生成的模型，具有抽象属性和行为的数据库操作能力
Entity：由model创建的实体，他的操作也会影响到数据库
*/

// 那顺序schema(规范)=>model(M层，抽象出来的数据库模型层)=>Entity(M层的实体，操作数据库)
//博客集合的对象
var blogSchema = new mongoose.Schema({
    title:String,
    author:String    
});
//增加了一个方法
blogSchema.methods.showInfo = function(){
    console.log(this.title);
};

//当我们拥有了model，也就相当于给mongoose一把操作数据库的钥匙，然后可以使用这个model来增删改查数据库
var Blog = mongoose.model("Blog",blogSchema);

var blog = new Blog({
    title:"我的博客",
    author:"Think"
});

// blog.save();
// blog.showInfo();
Blog.findOne({author: 'Thinka'},function(err, res){
	if(err) {
		console.log('有误')
		return
	}
	console.log('res: ',res,'typeof: ',typeof res)

	if(res) {
		res.showInfo()	
	}
})






















