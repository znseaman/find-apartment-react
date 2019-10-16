import React from "react";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Logo.module.css";

const Logo = ({ height }) => {
	return (
		<div className={classes.Logo} style={{ height }}>
			<FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon> {"Find Apartment"}
		</div>
	);
};

export default Logo;
