import React, { Component } from "react";
import InputField from "./Forms/InputField";

class MessengerPanel extends Component {
	constructor() {
		super();
		this.state = { body: "", messages: [] };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit = event => {
		event.preventDefault();
		const reqBody = {
			body: this.state.body,
			from: this.props.loggedInUser,
			to: this.props.withUser
		};
		fetch("/api/messages/add", {
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				let messages = this.state.messages;
				messages.push(data[0]);
				this.setState({ messages });
			});
		this.setState({ body: "" });
	};
	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};
	getMessagesToAll = () => {
		fetch("/api/messages/get/all", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				this.setState({ messages: data });
			});
	};
	getMessages = reqBody => {
		fetch("/api/messages", {
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				this.setState({ messages: data });
			});
	};
	componentDidMount() {
		console.log("mounted...");
		this.getMessagesToAll();
	}
	componentDidUpdate(prevProps) {
		if (prevProps.withUser !== this.props.withUser) {
			const reqBody = {
				from: this.props.loggedInUser,
				to: this.props.withUser
			};
			this.getMessages(reqBody);
		}
	}
	render() {
		let { withUser, loggedInUser } = this.props;
		const { body, messages } = this.state;
		return (
			<div className="panel">
				<h1>
					Chat Screen of {loggedInUser} {withUser ? `with ${withUser}` : ""}
				</h1>
				<div className="messages">
					{messages.map(msg => (
						<div
							key={msg._id}
							className={msg.from === loggedInUser ? "from" : "to"}
						>
							{withUser === "" ? (
								<div className="author">
									{msg.from === loggedInUser ? "You" : msg.from} said:
								</div>
							) : (
								""
							)}
							{msg.body}
						</div>
					))}
				</div>
				<form onSubmit={this.handleSubmit} className="chatBox">
					<InputField
						type="text"
						name="body"
						value={body}
						onChange={this.handleChange}
						placeholder="Enter message..."
					/>
					<input type="submit" value="Send" />
				</form>
			</div>
		);
	}
}

export default MessengerPanel;
