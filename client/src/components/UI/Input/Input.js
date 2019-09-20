import React from "react";

const Input = props => {
	const { elementType, elementConfig, label, value, changed } = props;
	let inputElement = null;

	switch (elementType) {
		case "textarea":
			inputElement = (
				<textarea {...elementConfig} value={value} onChange={changed} />
			);
			break;
		case "select":
			inputElement = (
				<select value={value} onChange={changed}>
					{elementConfig.options.map(({ value, text }) => {
						return (
							<option key={value} value={value}>
								{text}
							</option>
						);
					})}
				</select>
			);
			break;
		default:
			// "input"
			inputElement = (
				<input {...elementConfig} value={value} onChange={changed} />
			);
	}
	return (
		<div>
			<label style={{ fontWeight: "bold" }}>{label}</label>
			{inputElement}
		</div>
	);
};

export default Input;
