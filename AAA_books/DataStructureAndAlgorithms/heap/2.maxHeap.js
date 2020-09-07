/**
 
https://leetcode-cn.com/problems/kth-largest-element-in-an-array/

数组中的第K个最大元素

在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
示例 1:

输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
示例 2:

输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
说明:

你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。
 */

 /**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
class MaxHeap {
    // 数组索引决定堆的排列，所以只是交换索引对应的值
    arr = [];
    left(i){
        return i*2+1
    }
    right(i){
        return i*2+2
    }
    parent(i){
        return Math.floor((i-1)/2)
    }
    swap(i, j){
    	if(i===j) return;
        let tmp = this.arr[i];
        this.arr[i] = this.arr[j];
        this.arr[j] = tmp
    }
    // 保证坐标i要不断下沉
    sink(i){
        let len = this.arr.length;
        // 或运算时短路求值
        while(this.left(i)<len || this.right(i)<len){
            let max = this.arr[i], m = i,  l = this.left(i), r = this.right(i);
            if(this.arr[l]>=max) {
                max = this.arr[l]
                m = l
            }
            if(this.arr[r]>=max) {
                max = this.arr[r]
                m = r
            }
            // i===m 说明顺序对，不必下沉，避免死循环
            if(i===m) break
            this.swap(i, m)
            i = m;
        }
    }
    // 保证i能持续上浮，i的兄弟不管
    swim(i){
        let p;
        while(i>0 && (this.arr[p = this.parent(i)]<=this.arr[i])){
         this.swap(i, p)
         i=p;
        }
    }
    // 放入末尾，然后上浮
    insert(v){
        this.arr.push(v)
        this.swim(this.arr.length-1)
    }
    delMax(){
        let max = this.arr[0];
        this.swap(0, this.arr.length-1);
        this.arr.pop()
        this.sink(0)
        return max;
    }
}
var findKthLargest = function(nums, k) {
    let maxheap = new MaxHeap();
    nums.forEach(n=>maxheap.insert(n))
    let r;
    while(k--){
        r = maxheap.delMax()
    }
    return r
};

// 为什么不用最小堆呢？堆的大小是 k , 堆顶是最小，那最终整个堆前 k 个最大元素，堆顶便是结果