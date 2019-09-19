import React, { useState } from "react";
import styles from "./Settings.module.css";

import classes from "../Listings/Listing/Listing.module.css";
import Input from "../UI/Input/Input";

const Settings = () => {
	// TODO: add city, base_host, category as options to modify

	const [searchSettings, setSearchSettings] = useState({
		has_pic: {
			elementType: "select",
			elementConfig: {
				options: [{ value: 1, text: "Yes" }, { value: 0, text: "No" }]
			},
			value: 1,
			label: "Has Pic"
		},
		min_price: {
			elementType: "input",
			elementConfig: {
				type: "text"
			},
			value: "",
			label: "Min Price"
		},
		max_price: {
			element: "input",
			elementConfig: {
				type: "text"
			},
			value: "",
			label: "Max Price"
		},
		posted_today: {
			elementType: "select",
			elementConfig: {
				options: [{ value: 1, text: "Yes" }, { value: 0, text: "No" }]
			},
			value: 1,
			label: "Posted Today"
		}
	});

	const renderForm = () => {
		const inputs = Object.keys(searchSettings).map(key => {
			const { elementType, elementConfig, value } = searchSettings[key];
			return <Input {...searchSettings[key]} key={key}></Input>;
		});

		return <form>{inputs}</form>;
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
			<div>{renderForm()}</div>
		</article>
	);
};

export default Settings;
