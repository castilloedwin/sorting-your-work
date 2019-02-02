import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Login extends React.Component {

	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	}

	handleLogin(e) {
		e.preventDefault();
		axios.post('http://localhost:3001/login', this.state).then(response => {
			console.log(response.data);
			window.localStorage.setItem('token', response.data.token);
		})
		.catch(err => console.log(err));
	}

	render() {
		return (
			<div id="register">
				<form id="register-form" autoComplete="off">
					<div className="field-container">
						<input type="email" id="email" className="input-form" name="email" placeholder="Correo Electrónico" onChange={this.handleChange} />
					</div>
					<div className="field-container">
						<input type="password" id="password" className="input-form" name="password" placeholder="Contraseña" onChange={this.handleChange} />
					</div>
					<div className="field-container">
						<button id="send" onClick={this.handleLogin}>Ingresar</button>
					</div>
				</form>
			</div>
		);
	}

}

export default Login;