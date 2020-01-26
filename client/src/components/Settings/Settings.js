import React from "react";
import styles from "./Settings.module.css";

import { Button, Form } from "react-bootstrap";
import useSettings from "../../hooks/useSettings";
import { updateObject } from "../../shared/updateObject";
import { CONNECTION } from "../../config"

const Settings = () => {
	// TODO: add city, base_host, category as options to modify
	const [searchSettings, setSearchSettings] = useSettings();

	const inputChangedHandler = (event, inputIdentifier) => {
		const { value } = event.target;

		const el = searchSettings[inputIdentifier];
		const updatedSearchSettings = updateObject(searchSettings, {
			[inputIdentifier]: updateObject(el, {
				value: Number(value)
			})
		});

		setSearchSettings(updatedSearchSettings);
	};

	const onSaveHandler = event => {
		event.preventDefault();

		const settings = Object.keys(searchSettings).reduce(
			(obj, key) => ((obj[key] = searchSettings[key].value), obj),
			{}
		);

		fetch(`${CONNECTION}/search_setting/edit`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(settings)
		})
			.then(response => response.json())
			.then(json => {
				if (json.type === "error") {
					alert(json.msg);
				} else {
					alert("Save Successful!");
				}
			});
	};

	const renderForm = () => {
		const inputs = Object.keys(searchSettings).map(key => {
			const { elementType, elementConfig, value, label } = searchSettings[key];

			if (elementType == 'select') {
				return (
					<Form.Group key={key} controlId={`setting-control-${key}`}>
						<Form.Label>{label}</Form.Label>
						<Form.Control as="select" onChange={event => inputChangedHandler(event, key)}>
							{elementConfig.options.map(({ value, text }) => {
								return <option key={value} value={value}>{text}</option>
							})}
						</Form.Control>
					</Form.Group>
				);
			}

			return (
				<Form.Group key={key} controlId={`setting-control-${key}`}>
					<Form.Label>{label}</Form.Label>
					<Form.Control type="number" value={value} onChange={event => inputChangedHandler(event, key)}></Form.Control>
				</ Form.Group >
			)
		});

		return (
			<Form onSubmit={onSaveHandler}>
				{inputs}
				<Button style={{
					backgroundColor: '#207ea2',
					borderColor: '#187fa7'
				}} onClick={onSaveHandler}>Save</Button>
			</Form>
		);
	};

	return (
		<div className={styles.Settings}>{renderForm()}</div>
	);
};

export default Settings;
