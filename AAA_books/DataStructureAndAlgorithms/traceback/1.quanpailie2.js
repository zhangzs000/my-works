/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  let res = []
 const backtrack = (track)=>{
     if(track.length === nums.length){
       // 这个一定要深复制，否则最后都是 []
         res.push(JSON.parse(JSON.stringify(track)))
         return
     }
     for(let i=0; i<nums.length; i++){
         // 排除重复
         if(~track.indexOf(nums[i])){
             continue
         }
         track.push(nums[i])
         backtrack(track)
         // 回溯，返回到上层决策树
         track.pop()
     }
 }
 backtrack([])
  return res
};