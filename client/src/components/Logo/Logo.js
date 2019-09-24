import React from "react";

import findApartmentSVG from "../../assets/images/building-regular.svg";
import classes from "./Logo.module.css";

const Logo = ({ height }) => {
	return (
		<div className={classes.Logo} style={{ height }}>
			<img src={findApartmentSVG} alt="Find Apartment Logo"></img>
		</div>
	);
};

export default Logo;
