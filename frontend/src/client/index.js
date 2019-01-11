import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Todo from './components/Todo';
import './assets/css/main.scss';

class App extends React.Component {
	render() {
		return(
			<div>
				<Header />
				<Todo />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));