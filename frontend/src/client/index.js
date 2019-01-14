import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Register from './components/Register';
import Todo from './components/Todo';
import './assets/css/main.scss';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends React.Component {
	render() {
		return(
			<Router>
				<div>
					<Header />
					<Route exact path="/" component={Register} />
					<Route path="/todo" component={Todo} />
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));