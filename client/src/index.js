import React from "react";
import ReactDOM from "react-dom";
import history from "./utils/history";
import { Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Auth from "./components/Auth/Auth";
import App from "./containers/App/App";

import * as Sentry from "@sentry/browser";
Sentry.init({
	dsn: "https://3092fecb7cef45e38c5f99ae92609569@sentry.io/1760253"
});

const auth = new Auth();

auth.checkAuthentication().then(() => {
	ReactDOM.render(
		<Router history={history}>
			<App auth={auth} history={history}></App>
		</Router>,
		document.getElementById("root")
	);
});
