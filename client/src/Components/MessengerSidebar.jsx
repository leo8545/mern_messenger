import React, { Component } from "react";
import InputField from "./Forms/InputField";

class MessengerSidebar extends Component {
	constructor() {
		super();
		this.state = { search: "", users: [] };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit = event => {
		event.preventDefault();
	};
	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};
	componentDidMount() {
		this.fetchUsers();
	}
	fetchUsers = () => {
		fetch("/api/users")
			.then(res => res.json())
			.then(data => {
				this.setState({ users: data });
			});
	};
	componentDidUpdate(p, prevState) {
		// console.log(this.state.search);
		if (this.state.search === "") {
			this.fetchUsers();
		}
		fetch("/api/users/search", {
			method: "POST",
			body: JSON.stringify(this.state),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.length) {
					this.setState({ users: data });
				}
			});
	}
	handleAddGroupBtn = event => {
		document.getElementById("add-group-wrapper").style.display = "block";
	};
	render() {
		const { onClick } = this.props;

		const { search, users } = this.state;
		return (
			<div className="sidebar">
				<div className="search-field">
					<form onSubmit={this.handleSubmit}>
						<InputField
							type="text"
							name="search"
							value={search}
							placeholder="Search users..."
							onChange={this.handleChange}
						/>
					</form>
					<div className="create-group">
						<p onClick={this.handleAddGroupBtn}>Add a new group</p>
					</div>
				</div>
				<div className="all-users">
					<div className="user-list-item active-user" onClick={onClick}>
						BroadCast to All
					</div>
					{users.map(user => (
						<div key={user._id} className="user-list-item" onClick={onClick}>
							{user.name}
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default MessengerSidebar;
