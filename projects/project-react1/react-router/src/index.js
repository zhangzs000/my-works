import React, {Component} from 'react';
import {render} from 'react-dom';
import { HashRouter as Router, Route, Link, Redirect, Switch} from './react-router-dom';
import Home from './Home';
import Profile from './Profile';
import User from './User';
import 'bootstrap/dist/css/bootstrap.css'

export default class App extends Component {
	constructor(){
		super()
	}
	render() {
		return (<Router>
			<div>
				<div className="navbar navbar-inverse">
					<div className="container-fluid">
						<div className="navbar-heading">
							<div className="navbar-brand"></div>
						</div>
						<div className="nav navbar-nav">
							<li><Link to='/home'>home</Link></li>
							<li><Link to='/profile'>profile</Link></li>
							<li><Link to='/user'>user</Link></li>
						</div>
					</div>
				</div>
				<div className="container">
					{/* extract 表示严格匹配；switch匹配到就不再匹配*/}
					<Switch>
						<Route path='/home' component={Home} exact={true}></Route>
						<Route path='/profile' component={Profile}></Route>
						<Route path='/user' component={User}></Route>
						<Redirect to='/home'></Redirect>
					</Switch>
				</div>
			</div>
			</Router>)
	}
}
render(<App></App>, window.root);