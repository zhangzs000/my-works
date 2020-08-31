/*
方法： 双向链表 + map
因为双向链表, 删除节点和插入节点都是 O(1) 操作，所以才采用双向链表
*/
class DulLinkNode {
  constructor(key, value){
      this.key = key
      this.value = value
      this.next = null
      this.pre = null
  }
}
/**
* @param {number} capacity
*/
var LRUCache = function(capacity) {
  this.map = new Map();
  this.capacity = capacity;
  this.size = 0;
  this.head = new DulLinkNode()
  this.tail = new DulLinkNode()
  // 双向链表的初始态
  this.head.next = this.tail
  this.tail.pre = this.head;
  // console.log('LRUCache: ', this.head)
  
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function(key) {
  let node = this.map.get(key)
  if(node){
      this.removeToHead(node);
      return node.value
  } 
  return -1
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function(key, value) {
  let oldNode = this.map.get(key)
  if(oldNode){
      oldNode.value = value
      this.removeToHead(oldNode)
  } else {
      let node = new DulLinkNode(key, value)
      this.map.set(key, node)
      this.addToHead(node)
      this.size++
      if(this.size>this.capacity) {
          let tail = this.removeTail()
          // 删除map中对应节点
          this.map.delete(tail.key)
          this.size--
      }
          
  }
};

LRUCache.prototype.removeNode = function(node){
  node.pre.next = node.next
  node.next.pre = node.pre
  node.next = null
  node.pre = null
}
LRUCache.prototype.addToHead = function(node){
  // console.log('addToHead: ',node)
  // console.log('this.head: ',this)// 箭头函数 this 就变成 {}
  node.next = this.head.next
  node.pre = this.head
  this.head.next.pre = node
  this.head.next = node
}
LRUCache.prototype.removeToHead =function(node){
  this.removeNode(node)
  this.addToHead(node)
}
LRUCache.prototype.removeTail = function(){
  let node = this.tail.pre
  this.removeNode(node)
  return node
}
/**
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/