import React from "react";
import { withRouter } from "react-router-dom";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { auth } from '../../Auth/Auth';

const NavigationItems = ({ loggedIn }) => {
	const items = auth.loggedIn ? (
		<>
			<NavigationItem exact link="/">
				Listings
			</NavigationItem>
			<NavigationItem exact link="/favorites">Favorites</NavigationItem>
			<NavigationItem exact link="/map">Map</NavigationItem>
			<NavigationItem exact link="/settings">Settings</NavigationItem>
			<NavigationItem exact link="/logout">Logout</NavigationItem>
		</>) : (
			<><NavigationItem exact link="/login">
				Log In
			</NavigationItem>
				<NavigationItem exact link="/signup">
					Sign Up
		</NavigationItem></>)

	return (
		<ul className={classes.NavigationItems}>
			{items}
		</ul>
	);
};

export default withRouter(NavigationItems);
