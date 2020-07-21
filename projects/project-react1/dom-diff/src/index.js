import {createElement, render, renderDom} from './element';
import diff from './diff';
import patch from './patch';

let virtualDom1 = createElement('ul', {class: 'list'}, [
	createElement('li', {class: 'item'}, ['a']),
	createElement('li', {class: 'item'}, ['b']),
	createElement('li', {class: 'item'}, ['c'])
])

let virtualDom2 = createElement('ul', {class: 'list-group'}, [
	createElement('li', {class: 'item'}, ['1']),
	createElement('li', {class: 'item'}, ['b']),
	createElement('div', {class: 'item'}, ['3'])
])

let patchs = diff(virtualDom1, virtualDom2)



console.log(virtualDom1)
// 虚拟dom转真实dom
let el = render(virtualDom1);


// 给元素打补丁 重新更新视图
patch(el, patchs)


renderDom(el, window.root)
console.log(el)

// dom diff 比较2个虚拟dom的区别。

// dom diff根据2个虚拟对象创建出补丁，描述改变内容。将补丁用来更新dom

// 3中优化策略，比较时候同级别比较；同级位置变化，更新；同级不同删除，

// 先序深度优先遍历

// appendChild replaceChild具有移动性