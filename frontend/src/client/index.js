import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Todo from './components/Todo';
import './assets/css/main.scss';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class Logout extends React.Component {

	removeToken() {
		localStorage.removeItem('token');
		location = '/';
	}

	render() {
		this.removeToken();
	}
}

class App extends React.Component {

	render() {
		return(
			<Router>
				<div>
					<Header />
					<Route exact path="/" render={ () => (
						!localStorage.getItem('token') ? (<Register />) : (<Redirect to='/todo' />)
					)} />
					<Route path="/login" component={Login} />
					<Route path="/todo" component={Todo} />
					<Route path="/salir" component={Logout} />
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));