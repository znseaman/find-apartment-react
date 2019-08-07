import React from "react";
import ReactDOM from "react-dom";
import history from "./utils/history";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./containers/App/App";
import Auth from "./components/Auth/Auth";

const auth = new Auth();

const callbackComponent = props => {
	if (props.location.hash.includes("access_toke")) {
		setTimeout(() => auth.handleAuthentication());
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

ReactDOM.render(
	<Router history={history}>
		<Switch>
			<Route exact path="/" render={() => <App auth={auth} />}></Route>
			<Route
				path="/callback"
				render={props => callbackComponent(props)}
			></Route>
		</Switch>
	</Router>,
	document.getElementById("root")
);
