import React from "react";
import ReactDOM from "react-dom";
import history from "./utils/history";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./containers/App/App";
import Auth from "./components/Auth/Auth";
import Logout from "./components/Logout/Logout";

const auth = new Auth();

const callbackComponent = () => {
	if (auth.loggedIn) {
		setTimeout(() => history.replace("/"), 1500);
		return <h4>Loading...</h4>;
	} else {
		return <Redirect to={{ pathname: "/" }}></Redirect>;
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
					<Redirect to={{ pathname: "/" }}></Redirect>
				);
			}}
		></Route>
	);
};

auth.checkAuthentication().then(() => {
	ReactDOM.render(
		<Router history={history}>
			<Switch>
				<Route
					exact
					path="/"
					render={() => <App auth={auth} />}
				></Route>
				<Route
					path="/callback"
					render={() => callbackComponent()}
				></Route>
				<Route path="/logout" component={Logout({ auth })}></Route>
			</Switch>
		</Router>,
		document.getElementById("root")
	);
});
