import test from 'ava';

const valid = {
  user: {
    address: {
      street: 'main street',
    },
  },
};

// function getAddress(data) {
//   return data?.user?.address?.street;
// }

// test('Optional Chaining returns real values', (t) => {
//   const result = getAddress(valid);
//   t.is(result, 'main street');
// });

// test('Optional chaining returns undefined for nullish properties.', (t) => {
//   t.is(getAddress(), undefined);
//   t.is(getAddress(null), undefined);
//   t.is(getAddress({}), undefined);
// });
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
