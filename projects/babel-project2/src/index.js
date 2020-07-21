require("./other");
class Person{
  static modules = {}

  constructor(){
      this.name="bigbigStrong"
  }
  sayName(){
      console.log(`my name is ${this.name}`);
  }
  static install(){
    console.log('static')
    this.modules.push('123')
  }
}
var p = new Person();
p.sayName();
Person.install()
console.log(Person.modules)

// const data = {
//   user: {}
// };
// console.log(data.user?.address?.street);
