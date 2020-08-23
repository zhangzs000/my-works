// 写到算法和数据结构那
// 二叉搜索树构建
class Node {
  constructor(element, parent) {
    // parent是树 中比较重要的属性
    this.element = element;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
}
class BST {
  //不能通过索引取数据
  constructor(compare) {
    this.root = null;
    this.size = 0; //包含着的节点个数
    this.compare = compare || this.compare;
  }
  compare(e1, e2) {
    return e1 - e2;
  }
  add(element) {
    if (this.root == null) {
      this.root = new Node(element, null);
      this.size++;
      return;
    } else {
      //增加的不是根节点， 第一种方式是根据递归，写循环
      let currentNode = this.root; //当前的根节点
      let compare = 0;
      let parent = null;
      while (currentNode) {
        parent = currentNode;
        compare = this.compare(element, currentNode.element);
        if (compare > 0) {
          //如果大于0就找右树，小于0找左树
          currentNode = currentNode.right;
        } else {
          currentNode = currentNode.left;
        }
      }
      let newNode = new Node(element, parent);
      if (compare > 0) {
        parent.right = newNode;
      } else {
        parent.left = newNode;
      }
    }
  }
  preOrderTraversal(visitor) {
    if (!visitor) return;
    const traversal = (node) => {
      if (!node) return;
      // console.log(node.element);
      visitor.visit(node);
      traversal(node.left);
      traversal(node.right);
    };
    traversal(this.root);
  }
  levelorderTraversal(visitor) {
    if ((this.root == null) | (visitor == null)) return; //一个节点都没有直接return即可
    let stack = [this.root]; //根节点放入到队列中
    let index = 0;
    let currentNode = null;
    while ((currentNode = stack[index++])) {
      //层序遍历优化递归可以 使用栈的方式队列的方式
      visitor.visit(currentNode);
      if (currentNode.left) {
        stack.push(currentNode.left);
      }
      if (currentNode.right) {
        stack.push(currentNode.right);
      }
    }
    stack = null;
  }
  invertTree() {
    if ((this.root == null)) return; //一个节点都没有直接return即可
    let stack = [this.root]; //根节点放入到队列中
    let index = 0;
    let currentNode = null;
    while ((currentNode = stack[index++])) {
      //层序遍历优化递归可以使用栈的方式 队列的方式

      let tmp = currentNode.left;
      currentNode.left = currentNode.right;
      currentNode.right = tmp;

      if (currentNode.left) {
        stack.push(currentNode.left);
      }
      if (currentNode.right) {
        stack.push(currentNode.right);
      }
      // console.log('stack: ', stack)
    }
    stack = null;
  }
}

// let bst = new BST();
// let arr = [10, 8, 19, 6, 15, 22];
let bst = new BST((e1, e2) => {
  //  自定义比较器，类似arr.sort
  return e1.age - e2.age;
});
let arr = [
  { age: 10, name: "zs" },
  { age: 8, name: "zs" },
  { age: 19, name: "zs" },
  { age: 6, name: "zs" },
  { age: 15, name: "zs" },
];
arr.forEach((element) => {
  bst.add(element);
});
console.dir(bst.root, { depth: 200 });
bst.levelorderTraversal({
  visit(node) {
    // 类似 ast遍历的过程中，提供一个方法，修改node
    console.log(node.element, "visit****");
  },
});
console.log('*****************')
bst.invertTree();
bst.levelorderTraversal({
  visit(node) {
    // 类似 ast遍历的过程中，提供一个方法，修改node
    console.log(node.element, "invert后****");
  },
});