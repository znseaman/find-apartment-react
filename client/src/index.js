import React from "react";
import ReactDOM from "react-dom";
import history from "./utils/history";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Auth from "./components/Auth/Auth";
import App from "./containers/App/App";

const auth = new Auth();

auth.checkAuthentication().then(() => {
	ReactDOM.render(
		<Router history={history}>
			<App auth={auth} history={history}></App>
		</Router>,
		document.getElementById("root")
	);
});
