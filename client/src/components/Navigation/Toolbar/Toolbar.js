import React from "react";

import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import Menu from "../Menu/Menu";
import { Button } from "react-bootstrap";

const Toolbar = props => {
	return (
		<header className={classes.Toolbar}>
			<Menu></Menu>
			<nav>
				<NavigationItems></NavigationItems>
			</nav>
			<Button onClick={props.logout}>Log Out</Button>
		</header>
	);
};

export default Toolbar;
