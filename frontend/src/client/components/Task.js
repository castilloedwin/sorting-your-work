import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Comment from './Comment';

class Task extends React.Component {

	constructor() {
		super();
		this.state = {
			body: '',
			comments: []
		}
		this.handleRemoveTask = this.handleRemoveTask.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleAddComment = this.handleAddComment.bind(this);
	}

	handleRemoveTask() {
		axios.delete(`http://localhost:3001/tasks/${this.props.task._id}`).then(response => {
			this.props.triggerGetTasks();
			this.props.triggerMessage(response.data.message);
		})
		.catch(err => console.log(err));
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	}

	handleAddComment(e) {
		e.persist(); // Si se va a usar el objeto event dentro de una promesa, es necesario usar este método al inicio de la función.
		if ( !this.state.body ) {
			return this.props.triggerMessage('Escribe un comentario...');
		}
		axios.post('http://localhost:3001/comments', { task_id: this.props.task._id, body: this.state.body }).then(response => {
			this.props.triggerMessage(response.data.message);
			this.getComments();
			this.setState({
				body: ''
			});
			e.target.parentNode.querySelector('textarea').value = '';
		});
	}

	getComments() {
		axios.get(`http://localhost:3001/comments/${this.props.task._id}`).then(response => {
			this.setState({
				comments: response.data.length ? response.data : []
			});
		});
	}

	componentDidMount() {
		this.getComments();
	}

	render() {

		let commentComponents = this.state.comments.map( comment => <Comment key={comment._id} comment={comment} triggerMessage={this.props.triggerMessage.bind(this)} triggerGetComments={this.getComments.bind(this)} /> );

		return(
			<li>
				<span>
					<p><small><b>{this.props.task.title} ({ this.props.task.users[0].name })</b></small></p>
					{this.props.task.description}
				</span>
				<i className="remove-item" onClick={this.handleRemoveTask}>x</i>
				<div className="comment-box">
					<textarea name="body" id="body" onChange={this.handleChange}></textarea>
					<button id="send-comment" onClick={this.handleAddComment}>Comentar</button>
				</div>
				<div className="comment-to-content">
					{ commentComponents }
				</div>
			</li>
		)
	}
}

export default Task;