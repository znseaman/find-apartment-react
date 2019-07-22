import React from "react";
import { formatDistanceStrict } from "date-fns";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import classes from "./Listing.module.css";

export default function Listing(props) {
	const { id, title, description, postedAt, imageUrls, clicked } = props;

	const humanized = formatDistanceStrict(new Date(postedAt), Date.now());

	const carousel = (
		<Carousel showThumbs={false} dynamicHeight={true}>
			{imageUrls.split(",").map(img => (
				<div>
					<img src={img} alt="" />
				</div>
			))}
		</Carousel>
	);

	return (
		<article className={classes.Listing}>
			<header
				style={{
					padding: "1rem 1rem",
					paddingTop: "3rem",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap"
				}}
			>
				<p className={classes["Listing-title"]}>{title}</p>
			</header>
			<div>{carousel}</div>
			<div style={{ padding: ".5rem 1rem" }}>
				<p
					className={classes["Listing-description"]}
					style={{ "-webkit-box-orient": "vertical" }}
				>
					{description}
				</p>
			</div>
			<div style={{ padding: "1rem 1rem" }}>
				<button>Details</button>
				<button>Favorite</button>
			</div>
			<p
				style={{
					position: "absolute",
					fontSize: ".65rem",
					top: 0,
					padding: "1rem"
				}}
			>{`${humanized}`}</p>
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
				onClick={() => clicked(id)}
			>
				&times;
			</a>
		</article>
	);
}
