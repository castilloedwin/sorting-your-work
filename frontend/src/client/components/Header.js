import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Header extends React.Component {
	render() {
		return (
			<header>
				<h1>Tasks list</h1>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/login">Login</Link></li>
					<li><Link to="/todo">To do</Link></li>
				</ul>
			</header>
		);
	}
}

export default Header;