function diff (oldTree, newTree) {
	let patches = {};
	let index = 0;
	// 递归树
	walk(oldTree, newTree, index, patches);

	return patches;	
}

const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
let Index = 0
function diffChildren(oldChildren, newChildren, index, patches){
	// 比较老的第一个和新的第一个
	oldChildren.forEach((child, idx)=>{
		// 索引不应该是index了,
		walk(child, newChildren[idx], ++Index, patches)
	})
}
function isString(node){
	return Object.prototype.toString.call(node) === '[object String]';
}
function walk(oldNode, newNode, index, patches){
	let currentPatch = [];
	if(!newNode){
		currentPatch.push({type: REMOVE, index});
	} else if(isString(oldNode) && isString(newNode)){
		if(oldNode !== newNode) {
			currentPatch.push({type: TEXT, text:newNode})
		}
	} else if(oldNode.type === newNode.type){
		// 比较属性是否有更改
		let attrs = diffAttr(oldNode.props, newNode.props);
		if(Object.keys(attrs).length >0){
			currentPatch.push({type: ATTRS, attrs})
		}
		// 如果有儿子节点，遍历儿子
		diffChildren(oldNode.children, newNode.children, index, patches);
	} else {
		// 说明节点被替换
		currentPatch.push({type: REPLACE, newNode})
	}
	if(currentPatch.length >0) { // 当前元素确实有补丁
		// 将元素和补丁对应起来
		patches[index] = currentPatch;
		console.log('patches: ',patches)
	}
	
}

function diffAttr(oldAttrs, newAttrs) {
	let patch = {};
	// 老属性和新属性的关系
	for(let key in oldAttrs){
		if(oldAttrs[key] !== newAttrs[key]){
			patch[key] = newAttrs[key]; // 有可能是undefined
		}
	}
	for(let key in newAttrs){
		// 老节点没有新节点的属性。
		if(!oldAttrs.hasOwnProperty(key)){
			patch[key] = newAttrs[key];
		}
	}
	return patch;
}
export default diff;

/*
规则：
节点类型相同，看属性是否相同，产生一个属性补丁包 {type: 'ATTRS', attrs: {class:'list-group'}}
新的dom节点不存在的情况 {type: 'REMOVE', index: xxx}
节点类型不相同，直接采用替换模式{type:'REPLACE', newNode: newNode}
文本变化{type: 'TEXT',text: xxx}
*/