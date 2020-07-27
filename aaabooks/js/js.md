### 获取样式

* 获取非行间样式 

   * getComputedStyle(odiv, false)[attr]
   * odiv.currentStyle[attr]

* 获取内嵌样式

   * odiv.style.attr

```

window.getComputedStyle(element, pseudoElement)

element: 必需，要获取样式的元素。
pseudoElement: 可选，`伪类元素`，当不查询伪类元素的时候可以忽略或者传入 null。

<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
		#app {
			width: 100px;
			height: 100px;
			background-color: #f00;
		}
	</style>
</head>
<body>
	<div id="app"></div>
	<script type="text/javascript">
		// 获取非行间样式
		function getStyle(odiv, attr) {
			// ff
			if(getComputedStyle) {
				return getComputedStyle(odiv, false)[attr]
			} else {
				return odiv.currentStyle[attr];
			}
		}
		var odiv = document.getElementById('app');
		console.log(getStyle(odiv, 'width'))
	</script>
</body>

```

### 绑定事件

```

/**
 *  事件的兼容
 * */
var on = (function() {
    if (document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();
export function addEvent(ele, type, fn, useCapture = false) {
  if(ele.addEventListener) {
    // ff
    ele.addEventListener(type, fn, useCapture)
  } else if(ele.attachEvent) {
    // ie
    ele.attachEvent('on'+type, fn)
  } else {
    ele['on'+type] = fn;
  }
}

// 移除事件
function removeEvent(ele, type, handler, useCapture = false) {
	if(ele.removeEventListener){
	     ele.removeEventListener(type, handler, useCapture);
	 }else if(ele.detachEvent){
	     ele.detachEvent("on" + type , handler);
	 }else{
	     ele["on" + type] = handler;
	 }
}
```

### js数组的方法

* filter   // return 值true/false
* reduce
* map
* pop/unshift/push/shift
* splice
* some     // return 值true/false 
* every     // return 值true/false
* indexOf
* forEach
* slice
* join
* concat // slice和concat的浅拷贝
* reverse
* find/findIndex
* Array.isArray/Array.from/Array.of

#### 它们的返回值，以及参数，是否改变原数组

#### filter 回调中返回true或false

```

var arr = [1,2,3].filter((item)=>{
			return item>1
		})
	console.log(arr)

// 结果
[2, 3]

```
#### reduce 

   * 对象序列化

   * 获取嵌套对象的值，比如vue中模板中如何获取a.b.c的值

   * 拦截器，数组里面是好多函数的引用，通过返回promise.then依次执行这些函数
   
   * 连续函数中下一个函数拿到上一个函数的值，类似redux源码中的compose函数，webpack 中SyncWaterfallHook,先执行第一个，然后就reduce

#### 对象序列化

```
var form = {
			id: 123,
			type: 2,
			name: 'book'
		}

// 序列化
var arr = Object.keys(form);
var len = arr.length;
var str = arr.reduce((val, key, index)=>{
	const value = form[key];
	const flag = index !== len-1 ? '&' : ''
	return `${val}${key}=${value}${flag}`;
}, '')
console.log('str: ',str)

// 结果
str:  id=123&type=2&name=book

```
#### 获取嵌套对象的值，比如vue中模板中如何获取a.b.c的值

```

let vm = {
			a: {
				b: {
					c:1
				}
			}
		}
var value = 'a.b.c'.split('.').reduce((val, key)=>{
        return val[key];
      }, vm)
console.log('value: ',value)


function get (obj, props, def) {
    if((obj == null) || obj == null || typeof props !== 'string') return def;
    const temp = props.split('.');
    const fieldArr = [].concat(temp);
    temp.forEach((e, i) => {
        if(/^(\w+)\[(\w+)\]$/.test(e)) {
            const matchs = e.match(/^(\w+)\[(\w+)\]$/);
            const field1 = matchs[1];
            const field2 = matchs[2];
            const index = fieldArr.indexOf(e);
            fieldArr.splice(index, 1, field1, field2);
        }
    })
    return fieldArr.reduce((pre, cur) => {
        const target = pre[cur] || def;

        if(target instanceof Array) {
            return [].concat(target);
        }
        if(target instanceof Object) {
            return Object.assign({}, target)
        }
        return target;
    }, obj)
}
var c = {a: {b : [1,2,3] }}
get(c ,'a.b')     // [1,2,3]
get(c, 'a.b[1]')  // 2
get(c, 'a.d', 12)  // 12

/**
 * 序列化参数
 */
export const getSerializeParam = function (params) {
  let key
  let str = ''
  for (key in params) {
    str += '&' + key + '=' + params[key]
  }
  return str.substring(1)
}

附录：

将查询字符串转为对象。
Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
// { foo: "bar", baz: "qux" }

```

#### 多维数组转一维数组

```
方法一：
var arr = [["P","A","H","N"],["A","P","L","S","I","I","G"],["Y","I","R"]]

const flatten = arr => arr.reduce(
    (acc,val) => acc.concat(Array.isArray(val)? flatten(val):val),[]
)

console.log(flatten(arr));
//["P", "A", "H", "N", "A", "P", "L", "S", "I", "I", "G", "Y", "I", "R"]

方法二：
let str = [1, 2, [3, 4]] + ''
eval( `[${str}]` )
但是如果内部有 ' , ' 那么就会出现bug;
另一方面，它不是语言的通用操作，利用了js的语言特性

方法三：
function *flat = (arr)=>{
   for(let i=0; i<arr.length; i++){
     let item = arr[i];
     if(Array.isArray(item)){
     	yield *flat(item)
     } else {
     	yield item
     }
   }
}
console.log([...flat(arr)])
如果这样可以的话，完全可以用一个递归，全局变量数组保存结果；

附录：

数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。

[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]
```


#### 拦截器，数组里面是回调列表(中间件)，通过返回promise.then依次执行这些函数

```

function fetch() {
	let queue = [
		beforeRequest,
		isRequest,
		afterRequest
	];
	return promiseResolveReduce(login(), queue).catch((error)=>{
		console.log('error: ',error)
	})
}
function promiseResolveReduce(initialArgument, functions){
	return functions.reduce((promise, func)=>{
		return promise.then(func);
	}, Promise.resolve(initialArgument))
}
fetch().then((data)=>{
	console.log('res: ',data)
})

// 结果

res:  /oauth/login?code=1&type=wxapp=>beforeRequest=> =>isRequest=> =>afterRequest

function beforeRequest(data) {
	// console.log('beforeRequest '+data)
	return new Promise((resolve, reject)=>{
		resolve(data+'=>beforeRequest=> ')
	})
}
function isRequest(data) {
	// console.log('isRequest')
	return new Promise((resolve, reject)=>{
		resolve(data+'=>isRequest=> ')
	})

}
function afterRequest(data) {
	return new Promise((resolve, reject)=>{
		resolve(data+'=>afterRequest')
	})
	// console.log('afterRequest')
}
function promisify(original) {
  return function(opt) {
    return new Promise((resolve, reject) => {
      opt = Object.assign({
        success: resolve,
        fail: reject
      }, opt)
      original(opt)
    })
  }
}
function request(options = {}){
	if(!options.key){
		options.fail('请求失败，没有key!!!')
	}
	setTimeout(()=>{
		options.success({auth: 'admin', code: 1})
	},500)
	
}
function login() {
	 return promisify(request)({key: 'tr'}).then(({code}) => {
	    // console.log(`code: ${code}`)
	    return http.post('/oauth/login', {
	      code,
	      type: 'wxapp'
	    })
    })
}
let http = {
	post: function(url, params) {
		var arr = Object.keys(params);
		var len = arr.length;
		var str = arr.reduce((val, key, index)=>{
			const value = params[key];
			const flag = index !== len-1 ? '&' : ''
			return `${val}${key}=${value}${flag}`
		}, '')
		// console.log('post: ',url+'?'+str)
		return url+'?'+str;
	}
}

```
#### redux的compse函数
```
compose.js
funcs.reduce((a, b) => (...args) => a(b(...args)))
```
#### optional chaining ?.
```
function get (obj, props, def) {
    if((obj == null) || obj == null || typeof props !== 'string') return def;
    const temp = props.split('.');
    const fieldArr = [].concat(temp);
    temp.forEach((e, i) => {
        if(/^(\w+)\[(\w+)\]$/.test(e)) {
            const matchs = e.match(/^(\w+)\[(\w+)\]$/);
            const field1 = matchs[1];
            const field2 = matchs[2];
            const index = fieldArr.indexOf(e);
            fieldArr.splice(index, 1, field1, field2);
        }
    })
    return fieldArr.reduce((pre, cur) => {
        const target = pre[cur] || def;

        if(target instanceof Array) {
            return [].concat(target);
        }
        if(target instanceof Object) {
            return Object.assign({}, target)
        }
        return target;
    }, obj)
}
var c = {a: {b : [1,2,3] }}
get(c ,'a.b')     // [1,2,3]
get(c, 'a.b[1]')  // 2
get(c, 'a.d', 12)  // 12

https://mp.weixin.qq.com/s/cigjK2kLJzgRdRy1VwGhfQ
```

#### reduce内部怎么实现的
```
Array.prototype.reduce = function(callback, prev){
	
	for(let i=0; i<this.length; i++){
		if(typeof prev === 'undefined'){
			prev = callback(this[i], this[i+1], i, this);
			i++
		} else {
			prev = callback(prev, this[i], i, this)
		}
	}
	
	return prev;
}
```

#### pop/unshift/push/shift


	* 实现数据结构栈
	* 实现数据结构队列
	* 实现数据结构链表
	* 哪些map和set又是怎么一回事
	* 是否改变原数组
	* 遍历树型结构的深度优先非递归实现，广度优先递归和非递归实现
	
##### 模仿队列和栈

```
	push/shift模仿队列先进先出；
	push/pop 模仿栈先进后出；

	unshift()从索引为0处往进插入,所以shift/unshift都是操作头部的，push/pop操作尾部的。
	难道要把egg.js源码说下嘛？
```

##### 遍历树型结构
```
	// 递归实现
var run = function(){
	let res = [];
	dfs(root, res)
	console.log('res: ',res)
}
// 深度优先递归
var dfs = function (root, res) {
	if(!root) return;
	res.push(root)
	Array.from(root.children).forEach((n)=>{
		dfs(n, res)
	})
}
// 深度优先非递归
var bfs = function(root, res){
	let stack = [];
	stack.push(root);
	while(stack.length){
		let node = stack.pop();
		res.push(node)
		let nodes = Array.from(node.children);
		for (var i = nodes.length-1; i >=0 ; i--) {
			stack.push(nodes[i]);
		};
	}
}
// 广度优先非递归
var bfs = function(root, res){
	let stack = [];
	stack.push(root);
	while(stack.length){
		let node = stack.shift();
		res.push(node);
		Array.from(node.children).forEach(n=>{
			stack.push(n);
		})
	}
}
// 广度优先的递归 
// 递归的时候把stack这个数组传过去，保证数组中的数据是按广度排列的即可
var bfs = function(root, res, stack=[root]){
	// 只要有出递归的条件就行，stack.length===0
	// if(!root) return;
	let node = stack.shift();
	res.push(node)
	Array.from(node.children).forEach((n)=>{
		stack.push(n);
	})
	while(stack.length){
		bfs(node, res, stack)
	}
	
}
run();
```

#### map

```
改变原数组，返回值是修改后的值组成的数组

```


#### some/every 回调中返回true或false

	* some在碰到return ture的时候，中止循环
	* every在碰到return false的时候，中止循环


#### splice

	* splice() 方法用于添加或删除数组中的元素。

	* 语法：array.splice(index,howmany,item1,.....,itemX)

```
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2,1,"Lemon","Kiwi");

Banana,Orange,Lemon,Kiwi,Mango

```

### js转数组的方法

* split
* eval/JSON.parse
* Object.assign()

```
Object.assign([],'123')

//结果
["1", "2", "3"]

```

### for in的作用
	
	* 验证稀疏数组，如果这个表达式都是true,就是密集数组；否则稀疏数组。
	* 循环key为空字符串的对象。其实obj[key]也行。hasOwnProperty也行。
```

var arr5 = [undefined, undefined, undefined];
var obj = {
	'': 'aaa',
	zz: 'zzz'
}

for(let key in arr5){
	console.log('true', key, arr5[key])
}

// 
for (let key in obj) {
	console.log('true', key, obj[key])	
};

```

### 什么是伪数组

.....
