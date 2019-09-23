import React, { useState, useEffect } from "react";
import styles from "./Settings.module.css";

import classes from "../Listings/Listing/Listing.module.css";
import Input from "../UI/Input/Input";
import { Button } from "react-bootstrap";
import useSettings from "../../hooks/useSettings";
import { updateObject } from "../../shared/updateObject";

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

		fetch(`http://localhost:9000/search_setting/edit`, {
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
			const { elementType, elementConfig, value } = searchSettings[key];
			return (
				<Input
					{...searchSettings[key]}
					key={key}
					changed={event => inputChangedHandler(event, key)}
				></Input>
			);
		});

		return (
			<form onSubmit={onSaveHandler}>
				{inputs}
				<Button onClick={onSaveHandler}>Save</Button>
			</form>
		);
	};

	return (
		<article className={classes.Listing}>
			<header
				style={{
					padding: "1rem 1rem",
					// paddingTop: "3rem",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
					textAlign: "center",
					fontWeight: "bold"
				}}
			>
				<p className={classes["Listing-title"]}>My Search Settings</p>
			</header>
			<div className={styles.Settings}>{renderForm()}</div>
		</article>
	);
};

export default Settings;
