import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Header extends React.Component {
	render() {
		return (
			<header>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/todo">To do</Link></li>
				</ul>
				<h1>Tasks list</h1>
			</header>
		);
	}
}

export default Header;