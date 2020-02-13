import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import InputField from "./InputField";

class LoginForm extends Component {
	constructor() {
		super();
		this.state = { username: "", password: "", errors: [], isLogin: false };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit = event => {
		event.preventDefault();
		fetch("/api/users/login", {
			method: "POST",
			body: JSON.stringify(this.state),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if (!data.error) {
					this.setState({ errors: [], isLogin: true });
				} else {
					this.setState({ errors: this.handleError(data), isLogin: false });
				}
			});
	};
	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};
	handleError = response => {
		const errors = [];
		if (response.error) {
			Object.keys(response).forEach(err => {
				errors.push(response[err]);
			});
		}
		return errors;
	};

	render() {
		const { errors, username, password } = this.state;
		if (this.state.isLogin)
			return (
				<Redirect
					to={{
						pathname: "/chat",
						state: {
							isLogin: true,
							username
						}
					}}
				/>
			);
		return (
			<React.Fragment>
				<form onSubmit={this.handleSubmit}>
					<ul>
						{errors.map(err => (
							<li key={err}>{err}</li>
						))}
					</ul>
					<InputField
						label="Username"
						type="text"
						name="username"
						value={username}
						onChange={this.handleChange}
					/>
					<InputField
						label="Password"
						type="password"
						name="password"
						value={password}
						onChange={this.handleChange}
					/>
					<input type="submit" value="Login" />
				</form>
			</React.Fragment>
		);
	}
}

export default LoginForm;
