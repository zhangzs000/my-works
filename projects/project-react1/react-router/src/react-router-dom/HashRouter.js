import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './context';
export default class HashRouter extends Component {
	constructor(){
		super()
		this.state = {
			location: {
				pathname: window.location.hash.slice(1) || '/home' 
			}
		}
	}
	componentDidMount(){
		window.location.hash = window.location.hash || '/home';
		window.addEventListener('hashchange', ()=>{
			// 只更改pathname的写法？？？？？？？？？？？？？？
			this.setState({
				location: {
					...this.state.location,
					pathname: window.location.hash.slice(1) || '/'
				}
			})
		});
	}
	render() {
		let value = {
			location: this.state.location,
			history: {
				push(to) {
					window.location.hash = to;
				}
			}
		}
		return(
			<Provider value = {value}>
			{this.props.children}
			</Provider>
		)
	}
}