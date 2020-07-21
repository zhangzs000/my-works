import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Consumer} from './context';
import pathToRegExp from 'path-to-regexp';
// switch 作用是匹配一个组建
export default class Switch extends Component {
	constructor(){
		super()
	}
	render() {
		return (<Consumer>
				{state =>{
					let pathname = state.location.pathname;
					let children = this.props.children;
					for(let i=0; i<children.length; i++){
						let child = children[i];
						let path = child.props.path || '';
						// redirect 可能没有path属性
						let reg = pathToRegExp(path, [], {end: false});
						if(reg.test(pathname)){
							return child;
						}
					}
					return null;
				}}
			</Consumer>)
	}
}