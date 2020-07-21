import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Consumer} from './context';
import pathToReg from 'path-to-regexp';
export default class Route extends Component {
	constructor(){
		super();
		
	}
	componentDidMount(){
		
	}
	render() {
		return <Consumer>
			{(state)=>{
				// console.log('state: ',state)
				let { path, component: Component, extract = false } = this.props;
				let pathname = state.location.pathname;
				let keys = [];
				let reg = pathToReg(path, keys, {end: extract});
				keys = keys.map(item=>item.name)
				let result = pathname.match(reg);
				let [url, ...values] = result || [];
				let props = {
					location: state.location,
					history:state.history,
					match:{
						params: keys.reduce((obj, current, idx)=>{
							obj[current] = values[idx];
							return obj
						}, {})
					}
				}
				if(result) {
					return <Component {...props}></Component>
				}
				console.log('state: ',state)

			}}
		</Consumer>
	}
}