import React, { useState } from "react";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = ({ hasMap, children, auth }) => {
	const [showSideDrawer, setShowSideDrawer] = useState(false);

	const sideDrawerClosedHandler = () => {
		setShowSideDrawer(false);
	};

	const sideDrawerToggleHandler = () => {
		setShowSideDrawer(prevShowSideDrawer => !prevShowSideDrawer);
	};

	let allClasses = [classes.Layout];
	if (hasMap) {
		allClasses.push(classes.fixed);
	}

	return (
		<>
			<Toolbar {...auth} toggle={sideDrawerToggleHandler}></Toolbar>
			<SideDrawer
				open={showSideDrawer}
				closed={sideDrawerClosedHandler}
			></SideDrawer>
			<main className={allClasses.join(" ")}>{children}</main>
		</>
	);
};

export default Layout;
