import React from "react";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

const Layout = ({ hasMap, children, auth }) => {
	const style = hasMap
		? { position: "fixed", width: "100%", height: "100%" }
		: {};

	return (
		<>
			<Toolbar {...auth}></Toolbar>
			<main className={classes.Layout} style={style}>
				{children}
			</main>
		</>
	);
};

export default Layout;
