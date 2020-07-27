## Map.prototype.has(key)


## Map.prototype.get(key)

## Map.prototype.set(key, value)

## Map.prototype.keys()

## Map.prototype.values()

## Map.prototype.entries()
```
let myMap = new Map();
myMap.set(0, "zero");
myMap.set(1, "one");
for (let [key, value] of myMap) {
  console.log(key + " = " + value);
}
// 将会显示两个log。一个是"0 = zero"另一个是"1 = one"

for (let key of myMap.keys()) {
  console.log(key);
}
// 将会显示两个log。 一个是 "0" 另一个是 "1"

for (let value of myMap.values()) {
  console.log(value);
}
// 将会显示两个log。 一个是 "zero" 另一个是 "one"

for (let [key, value] of myMap.entries()) {
  console.log(key + " = " + value);
}
// 将会显示两个log。 一个是 "0 = zero" 另一个是 "1 = one"

for (let [key, value] of myMap) {
  console.log(key + " = " + value);
}
// 将会显示两个log。 一个是 "0 = zero" 另一个是 "1 = one"，跟上面那个一样
```
## Map.prototype.delete(key)

## Map.prototype.clear()

## Map.prototype.forEach(callbackFn[, thisArg])
#### 语法
* myMap.forEach(callback[, thisArg])
#### 参数
* callback
- 必要，每个元素所要执行的函数。
```
callback 函数有三个参数:

value - 元素的值
key - 元素的键
Map - 当前正在被遍历的对象
```
* thisArg
- 可选，callback 执行时其 this 的值
#### 返回值
* undefined

```
myMap.forEach(function(value, key) {
  console.log(key + " = " + value);
})
// 将会显示两个logs。 一个是 "0 = zero" 另一个是 "1 = one"
```

## Map.prototype[@@iterator]()
- @@iterator 属性的初始值与 entries 属性的初始值是同一个函数对象。
```
const map1 = new Map();

map1.set('0', 'foo');
map1.set(1, 'bar');

const iterator1 = map1[Symbol.iterator]();

for (let item of iterator1) {
  console.log(item);
}
// expected output: Array ["0", "foo"]
// expected output: Array [1, "bar"]
```
#### 使用 [@@iterator](), 迭代器
```
var myMap = new Map();
myMap.set('0', 'foo');
myMap.set(1, 'bar');
myMap.set({}, 'baz');

var mapIter = myMap[Symbol.iterator]();
//返回的其实是个generator
console.log(mapIter.next().value); // ["0", "foo"]
console.log(mapIter.next().value); // [1, "bar"]
console.log(mapIter.next().value); // [Object, "baz"]
```
#### 在for..of中使用[@@iterator]() 
```
var myMap = new Map();
myMap.set('0', 'foo');
myMap.set(1, 'bar');
myMap.set({}, 'baz');

for (const entry of myMap) {
  console.log(entry);
}
// ["0", "foo"]
// [1, "bar"]
// [{}, "baz"]

for (var v of myMap) {
  console.log(v);
}

// ["0", "foo"]
// [1, "bar"]
// [{…}, "baz"]
```
