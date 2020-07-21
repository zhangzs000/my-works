import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Consumer} from './context';
export default class Redirect extends Component {
	constructor(){
		super()
	}
	render() {
		return <Consumer>
			{state =>{
				// 重定向，匹配不到，redirect to路径
				state.history.push(this.props.to);
				return null;
			}}
		</Consumer>
		
	}
}