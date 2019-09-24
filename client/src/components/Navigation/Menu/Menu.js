import React from "react";

import classes from "./Menu.module.css";

const Menu = ({ toggle }) => {
	return (
		<div className={classes.Menu} onClick={toggle}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default Menu;
