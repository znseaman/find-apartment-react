import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "../../UI/Spinner/Spinner";

const Logout = props => {
	useEffect(() => {
		props.auth.logout();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <Redirect to="/login"></Redirect>;
};

export default Logout;
