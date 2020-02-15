import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePage extends Component {
	state = {};
	render() {
		return (
			<React.Fragment>
				<h1 className="pageTitle">Homepage</h1>
				<div className="buttons">
					<Link to="/register">
						<div className="btn">Register</div>
					</Link>
					<Link to="/login">
						<div className="btn">Login</div>
					</Link>
				</div>
			</React.Fragment>
		);
	}
}

export default HomePage;
