import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "../../UI/Spinner/Spinner";
import config from "../../../config/index";
const { CLIENT_URL: baseURL } = config;

const Logout = props => {
	useEffect(() => {
		props.auth.logout();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <Redirect to={`${baseURL}/login`}></Redirect>;
};

export default Logout;
