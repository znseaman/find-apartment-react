import React from "react";
import { formatDistanceStrict } from "date-fns";
import classes from "./Listing.module.css";
import Carousel from "../../Carousel/Carousel";

export default function Listing(props) {
	const {
		id,
		title,
		description,
		postedAt,
		imageUrls,
		clicked,
		url,
		price,
		beds,
		baths,
		size
	} = props;

	const humanized = formatDistanceStrict(new Date(postedAt), Date.now());

	const carousel = (
		<Carousel
			imageUrls={imageUrls.split(",")}
			dynamicHeight={true}
		></Carousel>
	);

	const openLink = url => {
		window.open(url, "_blank");
	};

	const formatPrice = price => {
		return `$${price.toLocaleString("en")}`;
	};

	const formatBedsBaths = (beds, baths) => {
		return `${beds} BR / ${baths} Ba`;
	};

	const formatSize = size => {
		const regexSq = /\d$/;
		const formatted = size.replace(regexSq, "");
		return (
			<>
				<span>{formatted}</span>
				<sup>2</sup>
			</>
		);
	};

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
				<p className={classes["Listing-title"]}>
					{formatPrice(price) +
						` - ` +
						formatBedsBaths(beds, baths) +
						` - `}
					{formatSize(size)}
					{` - ` + title}
				</p>
			</header>
			{carousel}
			<div style={{ padding: ".5rem 1rem" }}>
				<p
					className={classes["Listing-description"]}
					style={{ "-webkit-box-orient": "vertical" }}
				>
					{description}
				</p>
			</div>
			<div style={{ padding: "1rem 1rem" }}>
				<button onClick={() => openLink(url)}>Details</button>
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
				onClick={event => {
					event.preventDefault();
					clicked(id);
				}}
			>
				&times;
			</a>
		</article>
	);
}
