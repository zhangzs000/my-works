function dfs (node) {
  const stack = [node]
  while (stack.length > 0) {
  const first = stack.shift()
  console.log('a: ',first.key) // fJEp4
  // 将子节点压栈
  first.children.slice().reverse().forEach(
    child=>stack.unshift(child)
  )}
  }
  // 因为递归是具有天然的dfs结构 
  function dfs1(node){
    console.log(node.key)
    node.children.forEach(dfs1)
  }
  function Node(key) {
  this.children = [];
   this.key = key;
  }
  const n1=new Node('1')
  const n2 = new Node ('2')
  const n3 = new Node ( '3' )
  const n4 = new Node ('4')
  const n5 = new Node('5')
  const n6 =new Node ('6')
  n1.children.push (n2)
  n1.children.push (n5)
  n2.children.push (n3)
  n2.children.push (n4)
  n5.children.push(n6)

  dfs(n1)
  console.log(/********************* */)
  dfs1(n1)