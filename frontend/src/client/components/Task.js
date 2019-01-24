import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Task extends React.Component {

	constructor() {
		super();
		this.handleRemoveTask = this.handleRemoveTask.bind(this);
	}

	getComments() {
		axios.get('http://localhost:3001/comments').then(response => {
			console.log(response.data);
		});
	}

	handleRemoveTask() {
		axios.delete(`http://localhost:3001/tasks/${this.props.id}`).then(response => {
			this.props.triggerGetTasks();
			this.props.triggerMessage(response.data.message);
		})
		.catch(err => console.log(err));
	}

	componentDidMount() {
		this.getComments();
	}

	render() {
		return(
			<li>
				<span>
					<p><small><b>{this.props.title}</b></small></p>
					{this.props.description}
				</span>
				<i className="remove-item" onClick={this.handleRemoveTask}>x</i>
				<div className="content-comments">
					<div className="comment">
						<small><b>Eduardo</b> | <i>enero 22, 2019</i></small>
						<p>Esto es genial</p>
					</div>
					<div className="comment">
						<small><b>Edwin</b> | <i>enero 22, 2019</i></small>
						<p>Esto es hola</p>
					</div>
				</div>
			</li>
		)
	}
}

export default Task;