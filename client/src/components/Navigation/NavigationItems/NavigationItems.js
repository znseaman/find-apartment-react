import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem exact link="/">
				Listings
			</NavigationItem>
			<NavigationItem link="/map">Map</NavigationItem>
			<NavigationItem link="/settings">Settings</NavigationItem>
			<NavigationItem link="/logout">Logout</NavigationItem>
		</ul>
	);
};

export default NavigationItems;
