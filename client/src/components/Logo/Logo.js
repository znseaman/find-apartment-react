import React from "react";
import { NavLink } from "react-router-dom";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Logo.module.css";

const Logo = ({ height }) => {
	return (
		<div className={classes.Logo} style={{ height }}>
			<NavLink exact to="/">
				<FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon> {"Find Apartment"}</NavLink>
		</div>
	);
};

export default Logo;
