import React, { Component } from "react";
import InputField from "./InputField";
class RegisterForm extends Component {
	constructor() {
		super();
		this.state = { username: "", password: "", errors: [] };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	handleSubmit = event => {
		event.preventDefault();
		fetch("/api/users/add", {
			method: "POST",
			body: JSON.stringify(this.state),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(d => {
				this.setState({ errors: this.handleError(d) });
			});
	};

	handleError = response => {
		const errors = [];
		if (response.errors) {
			Object.keys(response.errors).forEach(fieldName => {
				errors.push(`${fieldName} is a required field`);
			});
		} else if (response.name === "MongoError") {
			Object.keys(response.keyValue).forEach(fieldName => {
				errors.push(
					`${fieldName} "${response.keyValue[fieldName]}" already exists`
				);
			});
		} else {
			errors.push(`You are registered successfully!`);
		}
		return errors;
	};

	render() {
		const { errors, username, password } = this.state;
		return (
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
				<input type="submit" value="Register" />
			</form>
		);
	}
}

export default RegisterForm;
