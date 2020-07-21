/**
* schema年龄增加函数
*/
var mongoose = require('mongoose');

// 创建数据库连接，这个应该是多种方式。eg:db.once
mongoose.connect('mongodb://localhost/testdb');

var studentSchema = new mongoose.Schema({
	'name': String,
	'age': Number,
	'sex': String
})

// scema的实例方法，只有实例对象才能访问
studentSchema.methods.ageIncrease = function () {
	this.age++;
	this.save();
	console.log('schema this: ',this)
}
// 感觉这个schema的实体类不过是个对象而已
// {
// 	'name': String,
// 	'age': Number,
// 	'sex': String
// }
var Student = mongoose.model('student',studentSchema)

var a1 = new Student({name:'aa',age:12,sex:'nan'});

// a1.save()
Student.findOne({name:'aa'},function(err, student){
	student.ageIncrease();
})