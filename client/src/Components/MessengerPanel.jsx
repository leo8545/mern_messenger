import React, { Component } from "react";
import { MessageService } from "../services/MessageService";
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
		const { body } = this.state;
		const { loggedInUser, withUser } = this.props;
		MessageService.add(body, loggedInUser, withUser)
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
	componentDidMount() {
		MessageService.getAll(this.props.loggedInUser)
			.then(res => res.json())
			.then(data => {
				this.setState({ messages: data });
			});
	}
	componentDidUpdate(prevProps) {
		if (prevProps.withUser !== this.props.withUser) {
			const { loggedInUser, withUser } = this.props;
			MessageService.get(loggedInUser, withUser)
				.then(res => res.json())
				.then(data => {
					this.setState({ messages: data });
				});
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
