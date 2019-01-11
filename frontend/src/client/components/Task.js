import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Task extends React.Component {

	constructor() {
		super();
		this.handleRemoveTask = this.handleRemoveTask.bind(this);
	}

	handleRemoveTask() {
		axios.delete(`http://localhost:3001/tasks/${this.props.id}`).then(response => {
			this.props.triggerGetTasks();
			this.props.triggerMessage(response.data.message);
		})
		.catch(err => console.log(err));
	}

	render() {
		return(
			<li>
				<span>
					<p><small><b>{this.props.title}</b></small></p>
					{this.props.description}
				</span>
				<i className="remove-item" onClick={this.handleRemoveTask}>x</i>
			</li>
		)
	}
}

export default Task;