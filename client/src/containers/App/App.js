import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import classes from "./App.module.css";

import Layout from "../../hoc/Layout/Layout";

import AuthForm from "../../components/AuthForm/AuthForm";

import Listings from "../../components/Listings/Listings";
import SimpleMap from "../../components/SimpleMap/SimpleMap";
import Settings from "../../components/Settings/Settings";
import Logout from "../../components/Auth/Logout/Logout";

function containsMap(pathname) {
	const regex = new RegExp("map");
	return regex.test(pathname);
}

const AuthRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			props.auth = auth;
			return auth.loggedIn ? (
				<Component {...props}></Component>
			) : (
				<Redirect to="/login"></Redirect>
			);
		}}
	></Route>
);

const App = props => {
	const [hasMap, setHasMap] = useState(false);

	useEffect(() => {
		setHasMap(containsMap(window.location.pathname));
	}, [props]);

	props.history.listen((location, action) => {
		setHasMap(containsMap(location.pathname));
	});

	const { auth } = props;

	let routes = (
		<Switch>
			<Route
				path="/login"
				render={props => {
					props.auth = auth;
					return auth.loggedIn ? (
						<Redirect to="/"></Redirect>
					) : (
						<AuthForm {...props}></AuthForm>
					);
				}}
			></Route>
			<AuthRoute
				exact
				auth={auth}
				path="/"
				component={Listings}
			></AuthRoute>
			<AuthRoute
				auth={auth}
				path="/map"
				component={SimpleMap}
			></AuthRoute>
			<AuthRoute
				auth={auth}
				path="/settings"
				component={Settings}
			></AuthRoute>
			<Route
				path="/logout"
				render={props => <Logout auth={auth} {...props}></Logout>}
			></Route>
			<Redirect to="/"></Redirect>
		</Switch>
	);

	return (
		<Layout hasMap={hasMap} auth={auth}>
			{routes}
		</Layout>
	);
};

export default App;
