import {Element, render} from './element';
let allPatches;
let index = 0; // 给默认那个需要打补丁

function patch (node, patches) {
	// node真实dom
	allPatches = patches;

	walk(node);
}
function walk(node){
	let currentPatch = allPatches[index++];
	let childNodes = node.childNodes;
	// 先序深度优先遍历
	childNodes.forEach(child=>walk(child));
	// 加补丁的过程是后序的
	if(currentPatch){
		doPatch(node, currentPatch)
	}
}

// 设置属性
function setAttr(node, key, value){
	switch(key){
		case 'value':
		if(node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
			node.value = value;
		} else {
			node.setAttribute(key, value);
		}
		break;
		case 'style':
		node.style.cssText = value;
		break;
		default: 
		node.setAttribute(key, value);
		break
	}
}

function doPatch(node, patches){
	patches.forEach(patch=>{
		switch(patch.type){
			case 'ATTRS':
			for(let key in patch.attrs){
				let value = patch.attrs[key];
				if(value) {
					setAttr(node, key, value)
				} else {
					node.removeAttribute(key);
				}
				
			}
			break;
			case 'TEXT':
			node.textContent = patch.text;
			break;
			case 'REPLACE':
			let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) :document.createTextNode(patch.newNode);
			node.parentNode.replaceChild(newNode, node);
			break;
			case 'REMOVE':
			node.parentNode.removeChild(node);
			break;
			default:
			break;
		}
	})
}
export default patch;