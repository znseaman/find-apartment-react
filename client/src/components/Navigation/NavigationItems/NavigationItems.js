import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem>Listings</NavigationItem>
			<NavigationItem>Map</NavigationItem>
			<NavigationItem></NavigationItem>
		</ul>
	);
};

export default NavigationItems;
