## Array.prototype.sort()
- arr.sort([compareFunction])
- 参数
compareFunction 可选
用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
firstEl
第一个用于比较的元素。
secondEl
第二个用于比较的元素。
- 返回值
排序后的数组。请注意，数组已原地排序，并且不进行复制。
- 数字排序
```
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);

也可以写成：
var numbers = [4, 2, 5, 1, 3]; 
numbers.sort((a, b) => a - b); 
console.log(numbers);
// [1, 2, 3, 4, 5]

注意1: 
内部是通过回调函数返回值是否`>0`进行位置交换，而不是通过true或false进行位置交换，所以可以通过返回1或-1进行后续操作；
注意二：
并且内部a,b的顺序不是原数组顺序。
[2,1,5,2,3].sort((a, b)=>{console.log(a, b);if(a>b){return 1} else {return -1}})
1 2
5 1
5 2
2 2

let arr = [1,2,11,22];
arr.sort() // 默认排序不是按照数字的大小排序，感觉是按字符串排序
// [1, 11, 2, 22]
```
- 字母排序
```
let arr = ['aa','ac', 'ab', 'AA', 'AC', 'AB'];
arr.sort()
//  ["AA", "AB", "AC", "aa", "ab", "ac"]
// 注意不能 arr.sort((a, b) => a - b);  因为字母减字母是 NAN，结果导致返回原数组，要比较也是比较ASCII;
arr.sort((a, b) => a - b) === arr
// true
```
