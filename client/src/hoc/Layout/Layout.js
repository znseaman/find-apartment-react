import React from "react";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

const Layout = ({ hasMap, children, auth }) => {
	let allClasses = [classes.Layout];
	if (hasMap) {
		allClasses.push(classes.fixed);
	}

	return (
		<>
			<Toolbar {...auth}></Toolbar>
			<main className={allClasses.join(" ")}>{children}</main>
		</>
	);
};

export default Layout;
