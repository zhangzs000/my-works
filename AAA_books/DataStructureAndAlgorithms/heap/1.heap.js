// 最大堆实现 https://github.com/datastructures-js
class HeapNode {
  constructor(key, value) {
    this._key = key;
    this._value = value;
  }
  getKey() {
    return this._key;
  }
  getValue() {
    return this._value;
  }
}
class Heap {
  constructor(nodes) {
    this._nodes = Array.isArray(nodes) ? nodes : [];
    this._leaf = null;
  }
  size() {
    return this._nodes.length;
  }
  _swap(i, j) {
    const temp = this._nodes[i];
    this._nodes[i] = this._nodes[j];
    this._nodes[j] = temp;
  }
  root() {
    if (this.isEmpty()) return null;
    return this._nodes[0];
  }
  insert(key, value) {
    const newNode = new HeapNode(key, value);
    this._nodes.push(newNode);
    this._heapifyUp();
    return newNode;
  }
  _getLeftChildIndex(parentIndex) {
    return (parentIndex * 2) + 1;
  }
  _getRightChildIndex(parentIndex) {
    return (parentIndex * 2) + 2;
  }
  _compareChildrenOf(parentIndex) {
    const leftChildIndex = this._getLeftChildIndex(parentIndex);
    const rightChildIndex = this._getRightChildIndex(parentIndex);
    const size = this.size();
    if (leftChildIndex >= size && rightChildIndex >= size) return -1;
    if (leftChildIndex >= size) return rightChildIndex;
    if (rightChildIndex >= size) return leftChildIndex;
    return this._compareChildren(leftChildIndex, rightChildIndex);
  }
  _heapifyUp() {
    let childIndex = this._getLastIndex();
    let parentIndex = this._getParentIndex(childIndex);
    while (this._shouldSwap(childIndex, parentIndex)) {
      this._swap(childIndex, parentIndex);
      childIndex = parentIndex;
      parentIndex = this._getParentIndex(childIndex);
    }
  }
  _getLastIndex() {
    return this._nodes.length - 1;
  }
  _getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }
  _heapifyDown() {
    let parentIndex = 0;
    let childIndex = this._compareChildrenOf(parentIndex);
    while (this._shouldSwap(childIndex, parentIndex)) {
      this._swap(childIndex, parentIndex);
      parentIndex = childIndex;
      childIndex = this._compareChildrenOf(parentIndex);
    }
  }
  isEmpty() {
    return this.size() === 0;
  }
  extractRoot() {
    if (this.isEmpty()) return null;
    const root = this.root();
    this._nodes[0] = this._nodes[this._getLastIndex()];
    this._nodes.pop();
    this._heapifyDown();
    if (root === this._leaf) {
      if (this.isEmpty()) {
        this._leaf = null;
      } else {
        this._leaf = this.root();
      }
    }
    return root;
  }
}
class MaxHeap extends Heap {
  _getMaxChildIndex(leftChildIndex, rightChildIndex) {
    const leftChild = this._nodes[leftChildIndex];
    const rightChild = this._nodes[rightChildIndex];
    if (leftChild.getKey() > rightChild.getKey()) {
      return leftChildIndex;
    }
    return rightChildIndex;
  }
  _compareChildren(leftChildIndex, rightChildIndex) {
    return this._getMaxChildIndex(leftChildIndex, rightChildIndex);
  }
  _shouldSwap(childIndex, parentIndex) {
    if (childIndex < 0 || childIndex >= this.size()) return false;
    if (parentIndex < 0 || parentIndex >= this.size()) return false;
    const child = this._nodes[childIndex];
    const parent = this._nodes[parentIndex];
    return child.getKey() > parent.getKey();
  }
}
class PriorityQueue {
  constructor(options = {}) {
    const { priority } = options;
    if (priority !== undefined && typeof priority !== 'function') {
      throw new Error('invalid priority callback');
    }
    this._getPriority = typeof priority === 'function' ? priority : null;
  }
  size() {
    return this._heap.size();
  }
  isEmpty() {
    return this._heap.isEmpty();
  }
  enqueue(element, priority) {
    if (priority && (Number.isNaN(+priority))) {
      throw new Error('invalid priority number');
    }
    if (!priority && this._getPriority === null) {
      throw new Error('missing priority number or constructor callback');
    }
    this._heap.insert(priority || this._getPriority(element), element);
  }
  dequeue() {
    if (this.isEmpty()) return null;
    const first = this._heap.extractRoot();
    return {
      priority: first.getKey(),
      element: first.getValue()
    };
  }
}
class MaxPriorityQueue extends PriorityQueue {
  constructor(options) {
    super(options);
    this._heap = new MaxHeap();
  }
}
// 最小堆
class MinHeap extends Heap {
  insert(key, value) {
    const newNode = super.insert(key, value);
    if (this._leaf === null || key > this._leaf.getKey()) {
      this._leaf = newNode;
    }
    return newNode;
  }
  _getMinChildIndex(leftChildIndex, rightChildIndex) {
    const leftChild = this._nodes[leftChildIndex];
    const rightChild = this._nodes[rightChildIndex];
    if (leftChild.getKey() < rightChild.getKey()) {
      return leftChildIndex;
    }
    return rightChildIndex;
  }
  _compareChildren(leftChildIndex, rightChildIndex) {
    return this._getMinChildIndex(leftChildIndex, rightChildIndex);
  }
  _shouldSwap(childIndex, parentIndex) {
    if (childIndex < 0 || childIndex >= this.size()) return false;
    if (parentIndex < 0 || parentIndex >= this.size()) return false;
    const child = this._nodes[childIndex];
    const parent = this._nodes[parentIndex];
    return child.getKey() < parent.getKey();
  }
}
class MinPriorityQueue extends PriorityQueue {
  constructor(options) {
    super(options);
    this._heap = new MinHeap();
  }
}
let patientsQueue = new MinPriorityQueue();