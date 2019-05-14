import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Header extends React.Component {
	generateLinks() {
		if ( localStorage.getItem('token') ) {
			return [
				{
					uri: '/todo',
					name: 'To do'
				},
				{
					uri: '/salir',
					name: 'Salir'
				}
			];
		}

		return [
			{
				uri: '/',
				name: 'Home'
			},
			{
				uri: '/login',
				name: 'Login'
			},
			{
				uri: '/todo',
				name: 'To do'
			}
		];
	}

	render() {

		let links = this.generateLinks().map((link, index) => {
			return <li key={index}><Link to={link.uri}>{link.name}</Link></li>
		});

		return (
			<header>
				<h1>Sorting your work, never it was so easy</h1>
				<ul>
					{ links }
				</ul>
			</header>
		);
	}
}

export default Header;