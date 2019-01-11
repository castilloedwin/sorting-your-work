import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Task from './Task';
import Notification from './Notification';

class Todo extends React.Component {

	constructor() {
		super();
		this.state = {
			title: '',
			description: '',
			message: '',
			tasks: []
		}
		this.handleAddTask = this.handleAddTask.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	}

	handleAddTask(e) {
		e.preventDefault();
		const { title, description } = this.state;
		if ( !title || !description ) {
			return console.log('Es necesario especificar un titulo y una descripción');
		}
		axios.post('http://localhost:3001/tasks', { title, description }).then(response => {
			this.showAndRemoveMessage(response.data.message);
			this.setState({ title: '', description: '' });
			
			document.getElementById('title').value = '';
			document.getElementById('description').value = '';

			this.getTasks();
		})
		.catch(err => console.log(err));
	}

	getTasks() {
		axios.get('http://localhost:3001/tasks').then(response => {
			this.setState({
				tasks: response.data
			});
		})
		.catch(err => console.log(err));
	}

	showAndRemoveMessage(message) {
		this.state.message = message;
		setTimeout(() => {
			this.setState({
				message: ''
			});
		}, 3000)
	}

	componentDidMount() {
		this.getTasks();
	}

	render() {
		let taskComponents = this.state.tasks.map( task => <Task key={task._id} id={task._id} title={task.title} description={task.description} triggerGetTasks={this.getTasks.bind(this)} triggerMessage={this.showAndRemoveMessage.bind(this)} /> );
		let notification = this.state.message.length ? <Notification message={this.state.message} /> : '';
		return (
			<div id="todo">
				<div className="field-content">
					<input type="text" id="title" name="title" placeholder="Write a new title" onChange={this.handleChange} />
					<textarea id="description" name="description" placeholder="Write a new description" onChange={this.handleChange}></textarea>
					<button onClick={this.handleAddTask}>Add Task</button>
				</div>
				<div className="task-list-content">
					<ul>
						{ taskComponents }
					</ul>
				</div>
				{ notification }
			</div>
		);
	}
}

export default Todo;