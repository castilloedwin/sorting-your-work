import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Comment extends React.Component {

	constructor() {
		super();
		this.handleRemoveComment = this.handleRemoveComment.bind(this);
	}

	handleRemoveComment() {
		axios.delete(`http://localhost:3001/comments/${this.props.comment._id}`).then(response => {
			this.props.triggerMessage(response.data.message);
			this.props.triggerGetComments();
		})
		.catch(err => console.log(err));
	}

	render() {
		return(
			<div className="comment">
				<i className="remove-comment" onClick={this.handleRemoveComment}>x</i>
				<small><b>{this.props.comment.user[0].name}</b> | <i>{new Date(this.props.comment.created_at).toLocaleString('es-ES')}</i></small>
				<p>{this.props.comment.body}</p>
			</div>
		);
	}
}

export default Comment;