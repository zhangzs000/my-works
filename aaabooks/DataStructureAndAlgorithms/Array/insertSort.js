/**
插入排序
 */
function insert(A, i, x) {
  let p=i-1;
  while(p >= 0 && A[p]>x){
    A[p+1] =A[p];
    p--;
  }
  A[p + 1] = x
}
function insertion_sort(A){
for(let i = 1; i < A.length; i++) {
  insert (A, i, A[i])
}
}
const A = [5,8,1,3,2,4,9]
insertion_sort(A)
console.log(A)
/**
复杂度分析
n就是 i < A.length 这个循环，内层循环为 i。
T(n)=1+2+3+..+N-1= (N -1)(1+N-1)/2 =  (N - 1)N / 2 = N^2/2 - N/2
内部 A[p+1] =A[p]; p--; 执行时间为 C；所以最终为 O(C* N^2)
优化，内部while循环二分查找，再整体移动。该移动几次，还带移动几次。
*/
/************************************* */
function insert1(A, x) {
  // P指向下一个需要比较的元素
  // p+1 指向空位
  let p = A.length - 1; 
  while(p>=0 && A[p]>x){
    A[p+1] = A[p]
    p--
  }
  A[p+1]=x
}
  const A1 = [2,4,7,9,13] //原数组
  const x1=8//需要插入的元素
insert1(A1, x1)
console.log(A1)