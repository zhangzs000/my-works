/*

前 K 个高频元素
给定一个非空的整数数组，返回其中出现频率前 k 高的元素。

示例 1:

输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]
示例 2:

输入: nums = [1], k = 1
输出: [1]
 

提示：

你可以假设给定的 k 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
你的算法的时间复杂度必须优于 O(n log n) , n 是数组的大小。
题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的。
你可以按任意顺序返回答案。


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/top-k-frequent-elements
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

*/

// 用 plainObj 的数据结构
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    let o = nums.reduce((a, b)=>{
        if(a[b]){
            a[b]++
            return a
        }else{
            a[b] = 1
            return a
        }
    }, {})
    let ans = []
    while(k--){
        let max = 0, mr = 0;
        for(let [k1, v1] of  Object.entries(o)){
           if(v1>max){
               max = v1
               mr = k1
           }
        } 
        ans.push(mr)
         delete o[mr]
    }
   return ans
};
// 588 ms	45.4 MB


// 用 map 数据结构
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    let map = new Map();
    nums.forEach(n=>{
        if(map.has(n)){
            map.set(n, map.get(n)+1);
        } else {
            map.set(n, 1);
        }
    })
    let arr = [];
    for(let [k, v] of map){
        arr.push({k, v})
    }
    // 排序
    arr.sort((a, b)=>b.v - a.v)
    
    return arr.slice(0, k).map(m =>m['k'])
};

// 84 ms	37.8 MB

// 说明 map 的性能比 obj 高，
// 如果用 weakMap 应该会更好? 结果会报错，因为
// WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。