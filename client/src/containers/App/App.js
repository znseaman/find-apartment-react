import React from "react";
import classes from "./App.module.css";

import Layout from "../../hoc/Layout/Layout";

import AuthForm from "../../components/AuthForm/AuthForm";

const App = props => {
	const showBelow = props.auth.loggedIn ? (
		<Layout {...props} hasMap={props.hasMap}></Layout>
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
