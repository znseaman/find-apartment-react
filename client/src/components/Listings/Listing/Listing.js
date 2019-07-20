import React from "react";
import classes from "./Listing.module.css";

export default function Listing(props) {
	return (
		<article className={classes.Listing}>
			<header
				style={{
					padding: "2rem 1rem",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap"
				}}
			>
				<p className={classes["Listing-title"]}>{props.title}</p>
			</header>
			<div>
				<img src={props.img} alt="" />
			</div>
			<div style={{ padding: "1rem" }}>
				<p
					className={classes["Listing-description"]}
					style={{ "-webkit-box-orient": "vertical" }}
				>
					{props.description}
				</p>
			</div>
			<div>
				<button>Favorite</button>
			</div>
			<a
				href=""
				aria-label="Delete Listing"
				style={{
					textDecoration: "none",
					color: "#535362",
					position: "absolute",
					top: "0",
					right: "0",
					padding: "0 .25rem"
				}}
				onClick={() => props.clicked(props.id)}
			>
				&times;
			</a>
		</article>
	);
}
