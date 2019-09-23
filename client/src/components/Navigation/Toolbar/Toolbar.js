import React from "react";

import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import Menu from "../Menu/Menu";

const Toolbar = props => {
	return (
		<header className={classes.Toolbar}>
			<Menu></Menu>
			<nav>
				<NavigationItems></NavigationItems>
			</nav>
		</header>
	);
};

export default Toolbar;
