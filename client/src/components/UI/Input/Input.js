import React from "react";

const Input = props => {
	const { elementType, elementConfig, label, value } = props;
	let inputElement = null;

	switch (elementType) {
		case "textarea":
			inputElement = <textarea {...elementConfig} value={value} />;
			break;
		case "select":
			inputElement = (
				<select value={value}>
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
			inputElement = <input {...elementConfig} value={value} />;
	}
	return (
		<div>
			<label style={{ fontWeight: "bold" }}>{label}</label>
			{inputElement}
		</div>
	);
};

export default Input;
