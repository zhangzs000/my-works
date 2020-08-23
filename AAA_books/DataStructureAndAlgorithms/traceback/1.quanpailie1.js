/*
给定一个 没有重复 数字的序列，返回其所有可能的全排列。

示例:

输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]

*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute (nums) {
  let res = []
  perm(nums, 0, nums.length - 1, res)
  return res
}

// p 全排列的开始位置 q 全排列的结束位置
function perm (arr, p, q, res) {
  if (p === q) {
    console.log('当前已全部排列完', arr)
    res.push([...arr])
  } else {
    for (let i = p; i <= q; i++) {
      console.log(`这是要对 ${arr[p]}(下标 ${p}) - ${arr[q]}(下标 ${q}) 进行全排列, 当前 arr ${arr}`)
      swap(arr, i, p)
      console.log(`交换了 ${arr[i]}(下标 ${i}) 和 ${arr[p]}(下标 ${p}) 的位置, 当前 arr ${arr}`)
      perm(arr, p + 1, q, res)
      console.log(`再次交换 ${arr[i]}(下标 ${i}) 和 ${arr[p]}(下标 ${p}) 的位置, 当前 arr ${arr}`)
      // 这里再次交换是为了保证 arr 的相对一致
      swap(arr, i, p)
    }
  }
}

function swap (arr, p, q) {
  let temp = arr[p]
  arr[p] = arr[q]
  arr[q] = temp
}

// console.log(permute([1, 2, 3, 4]))



