import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class UserDetail extends Component {
	constructor(){
		super()
	}
	render() {
		return(<div>
			detail{this.props.match.params.id}			
		</div>)
	}
}