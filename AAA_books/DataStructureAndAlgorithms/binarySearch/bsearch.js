function bsearch(A, x) {
  let l = 0,//查询范围左边界
  r = A.length - 1, //查找范围右边界
  guess; //猜测位置
  while(l <= r) {
    guess = Math. floor( (l+r)/2 )
    //循环不变式
    // guess等于1，r中间位置
    // 1:查找范围左r:查找范围右
    if (A[guess] === x) return guess
    else if (A[guess] > x) r=guess-1
    else l=guess+1
    //循环不变式
    // 1 :新查找范围左r :新查找范围右
  }
  return - 1
}
const A = [3,5,19,22,25,33,45,47,57 ,66, 71,78]
console.log( bsearch(A, 88) )
console.log( bsearch(A, 68) )
console.log( bsearch(A, 22 ) )


// l = m+1, r = m-1, 判断条件 l<=m, 中间 val>nums[m], > 和 >= 不影响结果
const binarySearch = ()=>{
	let nums = [1,2,3,4,5,6];
	let val = 4;
	let r = nums.length;
    let l = 0;
    while(l<=r){
        let m = Math.floor((l+r)/2);
        if(val>nums[m]){
            l = m+1;
        }else {
            r = m-1;
        }
    }
    // val>=nums[m]  l==4,稳定;  val>nums[m] l==3 不稳定
    nums.splice(l, 0, val);
    return nums
}
console.log('xxx: ',xxx())
