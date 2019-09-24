import React from "react";

import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import Menu from "../Menu/Menu";

const Toolbar = ({ toggle }) => {
	return (
		<header className={classes.Toolbar}>
			<Menu toggle={toggle}></Menu>
			<nav className={classes.DesktopOnly}>
				<NavigationItems></NavigationItems>
			</nav>
		</header>
	);
};

export default Toolbar;
