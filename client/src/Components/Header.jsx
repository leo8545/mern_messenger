import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
	state = {};
	render() {
		return (
			<header>
				<Link to="/" className="logo">
					<div>AppRocket</div>
				</Link>
				<ul>
					<Link to="/register">
						<li>Register</li>
					</Link>
					<Link to="/login">
						<li>Login</li>
					</Link>
					<Link to="/chat">
						<li>Chat</li>
					</Link>
				</ul>
			</header>
		);
	}
}

export default Header;
