import React, { Component } from "react";
import RegisterForm from "./Forms/RegisterForm";

class Register extends Component {
	state = {};
	render() {
		return (
			<React.Fragment>
				<h1 className="pageTitle">Register</h1>
				<RegisterForm />
			</React.Fragment>
		);
	}
}

export default Register;
