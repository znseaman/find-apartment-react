import React from "react";
import ReactDOM from "react-dom";
import history from "./utils/history";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Auth from "./components/Auth/Auth";
import App from "./containers/App/App";
import Layout from "./hoc/Layout/Layout";
import Listings from "./components/Listings/Listings";
import Settings from "./components/Settings/Settings";
import SimpleMap from "./components/SimpleMap/SimpleMap";

const auth = new Auth();

const callbackComponent = () => {
	if (auth.loggedIn) {
		setTimeout(() => history.replace("/listings"), 1500);
		return <h4>Loading...</h4>;
	} else {
		return <Redirect to={{ pathname: "/login" }}></Redirect>;
	}
};

const AuthRoute = props => {
	const { Component, path } = props;
	return (
		<Route
			path={path}
			render={() => {
				return auth.loggedIn ? (
					<Component></Component>
				) : (
					<Redirect to={{ pathname: "/login" }}></Redirect>
				);
			}}
		></Route>
	);
};

function containsMap(pathname) {
	const regex = new RegExp("map");
	return regex.test(pathname);
}

auth.checkAuthentication().then(() => {
	const perPage = 10;

	ReactDOM.render(
		<>
			<Router history={history}>
				<Switch>
					<Route
						exact
						path="/login"
						render={props => {
							const hasMap = containsMap(
								window.location.pathname
							);

							return (
								<App auth={auth} hasMap={hasMap}>
									<Listings
										{...props}
										perPage={perPage}
									></Listings>
								</App>
							);
						}}
					></Route>
					<Route
						exact
						path="/"
						render={props => {
							const hasMap = containsMap(
								window.location.pathname
							);

							return (
								<Layout auth={auth} hasMap={hasMap}>
									<Listings
										{...props}
										perPage={perPage}
									></Listings>
								</Layout>
							);
						}}
					></Route>
					<Route
						path="/callback"
						render={() => callbackComponent()}
					></Route>
					<Route
						path="/listings"
						render={props => {
							const hasMap = containsMap(
								window.location.pathname
							);
							return (
								<Layout auth={auth} hasMap={hasMap}>
									<Listings
										{...props}
										perPage={perPage}
									></Listings>
								</Layout>
							);
						}}
					></Route>
					<Route
						path="/map"
						render={props => {
							const hasMap = containsMap(
								window.location.pathname
							);
							return (
								<Layout auth={auth} hasMap={hasMap}>
									<SimpleMap {...props}></SimpleMap>
								</Layout>
							);
						}}
					></Route>
					<Route
						path="/settings"
						render={props => {
							const hasMap = containsMap(
								window.location.pathname
							);
							return (
								<Layout auth={auth} hasMap={hasMap}>
									<Settings {...props}></Settings>
								</Layout>
							);
						}}
					></Route>
				</Switch>
			</Router>
		</>,
		document.getElementById("root")
	);
});
