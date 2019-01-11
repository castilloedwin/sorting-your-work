import React from 'react';
import ReactDOM from 'react-dom';

class Notification extends React.Component {
	render() {
		return (
			<div className="notification">
				<p>¡{ this.props.message }!</p>
			</div>
		)
	}
}

export default Notification;