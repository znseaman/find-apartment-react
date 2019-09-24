import React from "react";

import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import Menu from "../Menu/Menu";
import Logo from "../../Logo/Logo";

const Toolbar = ({ toggle }) => {
	return (
		<header className={classes.Toolbar}>
			<Menu toggle={toggle}></Menu>
			<Logo height="80%"></Logo>
			<nav className={classes.DesktopOnly}>
				<NavigationItems></NavigationItems>
			</nav>
		</header>
	);
};

export default Toolbar;
