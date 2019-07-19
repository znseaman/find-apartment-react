import React from "react";

import classes from "./NavigationItem.module.css";

const NavigationItem = ({ children }) => {
	return <li className={classes.NavigationItem}>{children}</li>;
};

export default NavigationItem;
