import React from "react";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

const Layout = ({ hasMap, children }) => {
	const style = hasMap
		? { position: "fixed", width: "100%", height: "100%" }
		: {};

	return (
		<>
			<Toolbar></Toolbar>
			<main className={classes.Layout} style={style}>
				{children}
			</main>
		</>
	);
};

export default Layout;
