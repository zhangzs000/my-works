/*

https://leetcode-cn.com/problems/n-queens/

N皇后

n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
上图为 8 皇后问题的一种解法。

给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

示例:

输入: 4
输出: [
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
解释: 4 皇后问题存在两个不同的解法。
 

提示：

皇后，是国际象棋中的棋子，意味着国王的妻子。皇后只做一件事，那就是“吃子”。当她遇见可以吃的棋子时，就迅速冲上去吃掉棋子。当然，她横、竖、斜都可走一到七步，可进可退。（引用自 百度百科 - 皇后 ）
*/

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    // 棋盘
    let board = [], n1 = n, res=[];
    while(n1--){
        board[n1] = new Array(n).fill('.')
    }
    const isValid = (row, col)=>{
        // 上面行不存在其它queen
        for(let i=0; i<row; i++){
            if(board[i][col]==='Q') return false 
        }
        // 左边列不存在，这个不用下面那个循环 continue 了
        // for(let i=0; i<col; i++){
        //     if(board[row][i]==='Q') return false 
        // }
        // 左上角, 不一定初始是[0, 0]
        for(let i=row-1, j=col-1; i>=0 && j>=0; i--, j--){
            if(board[i][j]==='Q'){
                return false
            }
        }
        // 右上角
        for(let i=row-1, j=col+1; i>=0 && j<n; i--, j++){
            if(board[i][j]==='Q'){
                return false
            }
        }
        return true
    }
    const backtrace = (row)=>{
        if(row===n){
            // 这个也必须深复制
            // res.push(board)
            let r = row, r1 = [];
            while(r--){
                r1.unshift(board[r].join(''))
            }
            res.push(r1)
            return;
        }
        let len = board[row].length;
        for(let col=0; col<len; col++){
            if(isValid(row, col)){
                board[row][col] = 'Q'
                backtrace(row+1)
                board[row][col] = '.'
            } else {
                // 不符合条件排除
                continue;
            }
        }
    }
    backtrace(0)
    return res;
};