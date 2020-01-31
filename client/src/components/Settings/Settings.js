import React from "react";
import styles from "./Settings.module.css";

import { Button, Form, Alert } from "react-bootstrap";
import useSettings from "../../hooks/useSettings";
import { updateObject } from "../../shared/updateObject";
import axiosConfig from "../../shared/axios";
import config from "../../config/index";
const { SERVER_URL } = config;

const Settings = () => {
	// TODO: add city, base_host, category as options to modify
	const [searchSettings, setSearchSettings] = useSettings();
	const [alertState, setAlertState] = React.useState({
		show: false,
		message: 'Save Successful!',
		variant: 'success'
	});

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

		axiosConfig.post(`${SERVER_URL}/search_setting/edit`, settings, { withCredentials: true })
			.then(data => {
				setAlertState({ ...alertState, show: true });
				setTimeout(() => {
					setAlertState({ ...alertState, show: false });
				}, 5000);
			});
	};

	const renderForm = () => {
		const inputs = Object.keys(searchSettings).map(key => {
			const { elementType, elementConfig, value, label } = searchSettings[key];

			if (elementType == 'select') {
				return (
					<Form.Group key={key} controlId={`setting-control-${key}`}>
						<Form.Label>{label}</Form.Label>
						<Form.Control as="select" onChange={event => inputChangedHandler(event, key)} required>
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
					<Form.Control type="number" value={value} onChange={event => inputChangedHandler(event, key)} required></Form.Control>
				</ Form.Group >
			)
		});

		const renderAlert = () => {
			const { variant, message, show } = alertState;
			const visibility = show ? 'visible' : 'hidden';
			return <Alert variant={variant} dismissable="true" style={{ visibility }}>
				{message}
			</Alert>
		}

		return (
			<Form onSubmit={onSaveHandler}>
				{renderAlert()}
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
