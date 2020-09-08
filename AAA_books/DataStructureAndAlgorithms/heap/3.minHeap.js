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
/*
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
*/

// 用 map 数据结构
/*
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
*/
// 84 ms	37.8 MB

// 说明 map 的性能比 obj 高，
// 如果用 weakMap 应该会更好? 结果会报错，因为
// WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。


// 这个最大堆也行啊，所有元素整成堆，然后取 k 次顶部，只不过比最小堆多操作了 k 次变成堆。
// 但是如果是最小堆，每次取顶部数据，还是会重新排列成堆，只不过堆内元素会少很多。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// (1) 代表最大堆和最小堆的差别， 其实就是比较索引对应的值
class MinHeap {
    constructor({size, cb}){
        this.size = size;
        // 根据数组索引放置对应元素, 从 0 开始
        this.arr = [];
        this._getPriority = typeof cb === 'function' ? cb : null;
    }
    parent(i){
        return Math.floor((i-1)/2)
    }
    left(i){
        return 2*i+1
    }
    right(i){
        return 2*i+2
    }
    swap(i, j){
        if(i === j) return
        // es6 交换值，有坑
        [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]]
    }
    getVal(obj){
        if(this._getPriority){
            return this._getPriority(obj)
        } else if(typeof obj === 'object'){
            return obj.value
        }else {
            return undefined
        }
    }
    // 下沉坐标 i 对应的元素, left(i) && right(i) 索引不能超边界，
    sink(i){
        let len = this.arr.length;
        // 或运算时短路求值
        while(this.left(i)<len || this.right(i)<len){
            let min = this.getVal(this.arr[i]), 
                m = i,  
                l = this.left(i), 
                r = this.right(i);
            let lv = this.getVal(this.arr[l]);
            // (1)
            if(lv<min) {
                min = lv
                m = l
            }
            let rv = this.getVal(this.arr[r]);
            // (1)
            if(rv<min) {
                min = rv
                m = r
            }
            // i===m 说明顺序对，不必下沉，避免死循环
            if(i===m) break
            this.swap(i, m)
            i = m;
        }
    }
    // 上浮坐标 i 对应的元素, 索引i 对应的值始终要大于 parent(i)对应 的值， 否则一直向上浮动
    swim(i){
        let p;
        // (1)
        while(i>0 && this.getVal(this.arr[p = this.parent(i)])>this.getVal(this.arr[i])){
         this.swap(i, p)
         i=p;
        }
    }
    delMin(){
        let min = this.arr[0];
        this.swap(0, this.arr.length-1);
        this.arr.pop()
        // 删完要重新下沉 索引0 的元素
        this.sink(0)
        return min;
    }
    insert(obj){
        if(this.arr[0] && this.getVal(obj) < this.getVal(this.arr[0]) && this.arr.length === this.size) return;
        this.arr.push(obj)
        this.swim(this.arr.length-1)
        // 堆中元素最多为 size 个
        if(this.arr.length > this.size) {
            this.delMin()
        } 
    }
}

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
    let nums1 = Object.keys(o).map(m=>{
        let obj = {}
        // return {[m]: o[m]}
        return {value: o[m], key: m}
    })
    let heap = new MinHeap({size: k})
    nums1.forEach(n=>heap.insert(n))
    let r = [];
    while(k--){
        r.push(heap.delMin().key)
    }
    return r;
}

// 112 ms	42.7 MB 效率并不高