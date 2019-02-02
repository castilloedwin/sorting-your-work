import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Comment extends React.Component {
	render() {
		return(
			<div className="comment">
				<small><b>{this.props.comment.user[0].name}</b> | <i>{this.props.comment.created_at}</i></small>
				<p>{this.props.comment.body}</p>
			</div>
		);
	}
}

export default Comment;