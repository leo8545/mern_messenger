import React from "react";

const InputCheckbox = ({
	type = "checkbox",
	name,
	checked = false,
	onChange
}) => (
	<input
		type={type}
		name={name}
		id={name}
		checked={checked}
		onChange={onChange}
	/>
);

export default InputCheckbox;
