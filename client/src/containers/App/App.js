import React, { useState } from "react";
import classes from "./App.module.css";

import Layout from "../../hoc/Layout/Layout";

import Listings from "../../components/Listings/Listings";
import SimpleMap from "../../components/SimpleMap/SimpleMap";
import AuthForm from "../../components/AuthForm/AuthForm";

const App = props => {
	const [viewType] = useState("list");

	const hasMap = viewType === "map";
	const view = hasMap ? (
		<SimpleMap />
	) : (
		<>
			<Listings perPage={10}></Listings>
		</>
	);

	const showBelow = props.auth.loggedIn ? (
		<Layout hasMap={hasMap}>{view}</Layout>
	) : (
		<AuthForm {...props}></AuthForm>
	);

	return (
		<div className={classes.App}>
			<header className={classes["App-header"]}>{showBelow}</header>
		</div>
	);
};

export default App;
