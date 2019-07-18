import React from "react";
// TODO: find out why css-modules aren't working
// import styles from "./Listing.css"
// styles.Listing
import "./Listing.css";

export default function Listing(props) {
	return (
		<article className="Listing">
			<header>
				<h1>{props.title}</h1>
				<h3>{props.date.toLocaleDateString("en-US")}</h3>
			</header>
			<div>
				<img src={props.img} alt="" />
			</div>
			<div>
				<h3>{`${props.lat}, ${props.lng}`}</h3>
				<p>{props.description}</p>
			</div>
			<div>
				<button>Favorite</button>
				<button>Delete</button>
			</div>
		</article>
	);
}
