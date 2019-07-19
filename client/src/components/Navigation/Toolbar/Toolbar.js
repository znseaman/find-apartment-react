import React from "react";

import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import Menu from "../Menu/Menu";

const Toolbar = () => {
	return (
		<header className={classes.Toolbar}>
			<Menu></Menu>
			<nav style={{ width: "100%" }}>
				<NavigationItems></NavigationItems>
			</nav>
		</header>
	);
};

export default Toolbar;
