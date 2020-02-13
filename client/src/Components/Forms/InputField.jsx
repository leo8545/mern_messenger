import React, { Component } from "react";

class InputField extends Component {
	state = {};
	render() {
		const { type, label, name, value, placeholder, onChange } = this.props;
		return (
			<div className="form-field">
				<label htmlFor={name}>{label}</label>
				<input
					type={type}
					id={name}
					name={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
				/>
			</div>
		);
	}
}

export default InputField;
