/*

组合总和

给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的数字可以无限制重复被选取。

说明：

所有数字（包括 target）都是正整数。
解集不能包含重复的组合。 
示例 1：

输入：candidates = [2,3,6,7], target = 7,
所求解集为：
[
  [7],
  [2,2,3]
]
示例 2：

输入：candidates = [2,3,5], target = 8,
所求解集为：
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
 

提示：

1 <= candidates.length <= 30
1 <= candidates[i] <= 200
candidate 中的每个元素都是独一无二的。
1 <= target <= 500

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

*/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    let r = [];
    candidates.sort((a, b)=>a-b)
    const getSum=(s)=>{
        if(s.reduce((a, b)=>a+b, 0) === target){
            // 如果不深复制，sort 会影响 s 的排序。
            let _s = JSON.parse(JSON.stringify(s))
            if(~r.map(r1=>r1.sort((a,b)=>a-b).join(',')).indexOf(_s.sort((a,b)=>a-b).join(','))) return
            r.push([...s])
            return
        }
        for(let i=0; i<candidates.length; i++){
            let ca = candidates[i]
            if(s.reduce((a, b)=>a+b, 0)+ ca> target){
                break
            }
            s.push(ca)
            getSum(s)
            // 涉及到所有组合的可能性，回朔，比如就恢复上面的选择
            s.pop()
        }
    }
    getSum([])
    return r;
};
// 1604 ms	46.1 MB 效率很差
