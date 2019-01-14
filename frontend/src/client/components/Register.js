import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Notification from './Notification';

class Register extends React.Component {

	constructor() {
		super();
		this.state = this.getInitialState();

		this.handleChange = this.handleChange.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}

	getInitialState() {
		return {
			username: '',
			name: '',
			last_name: '',
			email: '',
			password: '',
			message: ''
		}
	}

	resetState() {
		setTimeout(() => {
			this.setState( this.getInitialState() );
		}, 3000);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	}

	handleRegister(e) {
		e.preventDefault();
		const { username, name, last_name, email, password } = this.state;
		axios.post('http://localhost:3001/register', { username, name, last_name, email, password }).then(response => {
			this.showAndRemoveMessage(response.data.message);
			document.getElementById('register-form').reset();
			this.resetState();
		})
		.catch(err => console.log(err));
	}

	showAndRemoveMessage(message) {
		this.setState({ message });
		setTimeout(() => {
			this.setState({
				message: ''
			});
		}, 3000);
	}

	render() {
		let notification = this.state.message.length ? <Notification message={this.state.message} /> : '';
		return (
			<div id="register">
				<form id="register-form" autoComplete="off">
					<div className="field-container">
						<input type="text" id="username" className="input-form" name="username" placeholder="Nombre de Usuario" onChange={this.handleChange} />
					</div>
					<div className="field-container">
						<input type="text" id="name" className="input-form" name="name" placeholder="Nombre" onChange={this.handleChange} />
					</div>
					<div className="field-container">
						<input type="text" id="last_name" className="input-form" name="last_name" placeholder="Apellido" onChange={this.handleChange} />
					</div>
					<div className="field-container">
						<input type="email" id="email" className="input-form" name="email" placeholder="Correo Electrónico" onChange={this.handleChange} />
					</div>
					<div className="field-container">
						<input type="password" id="password" className="input-form" name="password" placeholder="Contraseña" onChange={this.handleChange} />
					</div>
					<div className="field-container">
						<button id="send" onClick={this.handleRegister}>Registrar</button>
					</div>
				</form>
				{ notification }
			</div>
		);
	}
}

export default Register;