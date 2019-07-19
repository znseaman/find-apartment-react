import React from "react";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

const Layout = ({ children }) => {
	return (
		<>
			<Toolbar></Toolbar>
			<main className={classes.Layout}>{children}</main>
		</>
	);
};

export default Layout;
