import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from './react-router-dom';

export default class UserList extends Component {
	constructor(){
		super()
	}
	render() {
		return (
			<div>
				<Link to="/user/detail/1">用户一</Link>
				<br/>
				<Link to="/user/detail/2">用户二</Link>
				<br/>
				<Link to="/user/detail/3">用户三</Link>
			</div>
			)
	}
}