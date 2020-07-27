/**
 
 */
//  p,q 是[p, q）左闭右开，q-p正好是的个数。eg:[0, 1）1个，[0, 2）2个。 
function merge(A, p, q, r){
  let A1 = A.slice(p, q) //存放左半边的临时空间
  let A2 = A.slice(q, r) //存放右半边的临时空间
  //追加哨兵, 这样下面的判断就不要判断是否超出边界
  A1.push(Number.MAX_SAFE_INTEGER)
  A2.push(Number.MAX_SAFE_INTEGER) 
  for(let k=p, i=0,j=0; k<r; k++) {
    //循环不变式
    // k :下一个写入位置
    //i:A1中回写位置
    // j : A2中回写位置
    A[k] = A1[i] < A2[j] ? A1[i++] : A2[j++]
  }
}
function merge_sort(A, p, r){
    if(r-p<2)return;
    const q = Math.ceil( (p + r)/ 2)
    merge_sort(A, p, q)
    merge_sort(A, q, r)
    merge (A,p,q,r)
}
const A = [38, 27, 43, 3, 9,82, 10]
merge_sort(A, 0, A.length)
console.log(A)
/*
  const A = [1,3,5,2,4,6]
  const B = [2,4,6,1,3,5]
  const C = [2,1]
  merge(A, 0, 3, 6)
  merge(B, 1, 3, 5)
  merge(C, 0, 1, 2)
  console.log(A)
  console.log(B)
  console.log(C)
*/
  /*
  复杂度分析：
  加入T(n) = n^2 => 
  T(100) => 10000
  T(50)+T(50) => 2500+ 2500 => 5000 + C(2个数组合并成一个数组)
  所以理论上拆分的效率更高些。
  用树的形式分析递归的过程，
  时间复杂度：
  拆分O(n)+ 合并O(nlgn) ~ O(nlgn)
  空间复杂度：
  拆分O(1)+ 合并O(n) ~ O(n)
  */