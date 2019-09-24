import React from "react";

import classes from "./SideDrawer.module.css";

import NavigationItems from "../../Navigation/NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = ({ open, closed }) => {
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if (open) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return (
		<>
			<Backdrop show={open} clicked={closed}></Backdrop>
			<div className={attachedClasses.join(" ")}>
				<nav onClick={closed}>
					<NavigationItems></NavigationItems>
				</nav>
			</div>
		</>
	);
};

export default SideDrawer;
