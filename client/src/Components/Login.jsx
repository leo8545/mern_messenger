import React, { Component } from "react";
import LoginForm from "./Forms/LoginForm";

class Login extends Component {
	state = {};
	render() {
		return (
			<React.Fragment>
				<h1 className="pageTitle">Login</h1>
				<LoginForm />
			</React.Fragment>
		);
	}
}

export default Login;
