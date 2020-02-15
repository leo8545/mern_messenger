import React, { Component } from "react";
import InputField from "./Forms/InputField";
import InputCheckbox from "./Forms/InputCheckbox";

class Group extends Component {
	constructor() {
		super();
		this.state = {
			groupName: "",
			checkedUsers: new Map(),
			users: [],
			errors: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		fetch("/api/users")
			.then(res => res.json())
			.then(data => {
				this.setState({ users: data });
			});
	}
	handleChange = event => {
		const target = event.target;
		if (target.type === "checkbox") {
			const isChecked = target.checked;
			this.setState(prevState => ({
				checkedUsers: prevState.checkedUsers.set(target.name, isChecked)
			}));
		} else {
			const { name, value } = target;
			this.setState({
				[name]: value
			});
		}
	};
	handleSubmit = event => {
		event.preventDefault();
		const { checkedUsers } = this.state;
		let members = [];
		checkedUsers.forEach((index, user) => {
			members.push(user);
		});
		const reqBody = {
			name: this.state.groupName,
			members
		};
		fetch("/api/groups/add", {
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				let errors = [];
				if (data.name === "MongoError") {
					errors.push("Group with that name already exists");
				} else if (data.errors) {
					errors.push(data._message);
				} else {
					this.setState({ groupName: "", checkedUsers: new Map(), users: [] });
					document.getElementById("add-group-wrapper").style.display = "none";
				}
				console.log(data);
				this.setState({ errors });
			});
	};
	render() {
		const { groupName, users, errors } = this.state;
		return (
			<React.Fragment>
				<h1>Add a new group</h1>
				{errors ? errors.map(err => <div key={err}>{err}</div>) : ""}
				<form onSubmit={this.handleSubmit}>
					<InputField
						label="Name of the group"
						type="text"
						name="groupName"
						value={groupName}
						onChange={this.handleChange}
					/>
					{users.map(user => (
						<div className="form-field" key={user._id}>
							<InputCheckbox
								name={user.name}
								checked={this.state.checkedUsers.get(user.name)}
								onChange={this.handleChange}
							/>
							<label htmlFor={user.name}>{user.name}</label>
						</div>
					))}
					<input type="submit" value="Add group" />
				</form>
			</React.Fragment>
		);
	}
}

export default Group;
