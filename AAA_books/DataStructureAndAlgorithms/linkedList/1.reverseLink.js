let root = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 4,
                next: null
            }
        } 
    }
}
let head;
function reverse(p) {
    if(p.next){
        reverse(p.next);
        p.next.next = p;
        p.next = null
    }else{
        head = p
    }
}
reverse(root)
console.dir(head, {depth: 100})


var reverseList = function (head) {
    // 闭包
    if (head === undefined || head === null) return null
    var originalHead = head
    var reverseHead
    var reverse = function (head) {
        if (head.next === null) {
            reverseHead = head
            return head
        } else {
            var node = reverse(head.next)
            node.next = head
            if (originalHead === head) {
                head.next = null
                return reverseHead
            } else {
                return head
            }
        }
    }
    return reverse(head)
};
console.dir(reverseList(root1), { depth: 200 })