import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import MessengerSidebar from "./MessengerSidebar";
import MessengerPanel from "./MessengerPanel";
import Group from "./Group";

class Chat extends Component {
	state = {
		with: ""
	};
	handleWith = event => {
		let children = Array.from(event.target.parentNode.children);
		children.forEach(item => {
			if (item.classList.contains("active-user")) {
				item.classList.remove("active-user");
			}
		});
		event.target.classList.add("active-user");
		this.setState({
			with:
				event.target.textContent === "BroadCast to All"
					? ""
					: event.target.textContent
		});
	};

	render() {
		if (
			this.props.location.state === undefined ||
			!this.props.location.state.isLogin
		)
			return <Redirect to="/login" />;
		const { username } = this.props.location.state;
		return (
			<React.Fragment>
				<h1 className="pageTitle">Chat</h1>
				<div id="add-group-wrapper">
					<Group />
				</div>
				<div className="messenger">
					<MessengerSidebar onClick={this.handleWith} loggedInUser={username} />
					<MessengerPanel withUser={this.state.with} loggedInUser={username} />
				</div>
			</React.Fragment>
		);
	}
}

export default Chat;
