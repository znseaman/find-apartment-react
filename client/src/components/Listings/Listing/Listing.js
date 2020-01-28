import React from "react";
import { Button } from "react-bootstrap";
import { formatDistanceStrict } from "date-fns";
import classes from "./Listing.module.css";
import Carousel from "../../Carousel/Carousel";
import Emoji from "../../UI/Emoji/Emoji";

export default function Listing(props) {
	const {
		id,
		title,
		description,
		postedAt,
		imageUrls,
		clicked,
		onFavorite,
		url,
		price,
		beds,
		baths,
		size,
		favorite,
		isPopup
	} = props;

	const humanized = formatDistanceStrict(new Date(postedAt), Date.now());

	const carousel = (
		<Carousel imageUrls={imageUrls.split(",")} dynamicHeight={true}></Carousel>
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
		<article className={classes.Listing} style={{ boxShadow: isPopup ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.26)', backgroundColor: favorite && !isPopup ? '#ffc107' : 'white' }}>
			<header
				style={{
					padding: "1rem 1rem",
					paddingTop: "3rem",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap"
				}}
			>
				<p className={classes["Listing-title"]}>
					{formatPrice(price) + ` - ` + formatBedsBaths(beds, baths) + ` - `}
					{size ? formatSize(size) : ""}{` `}
					{favorite ? <Emoji label="star" symbol="⭐️" /> : null}
				</p>
			</header>
			{carousel}
			<div style={{ padding: ".5rem 1rem" }}>
				<p className={classes["Listing-description"]}>
					{title}
				</p>
				<p
					className={classes["Listing-description"]}
					style={{ WebkitBoxOrient: "vertical" }}
				>
					{description}
				</p>
			</div>
			<div style={{ padding: "1rem 1rem", textAlign: "center" }}>
				<Button className="btn btn-secondary" size={isPopup ? `sm` : null} style={{ marginRight: '1rem' }} onClick={() => openLink(url)}>
					Details
				</Button>
				<Button variant="warning" size={isPopup ? `sm` : null} style={{ marginRight: '1rem' }} onClick={event => {
					event.preventDefault();
					onFavorite(id, !favorite);
				}}>{favorite ? 'Favorited!' : 'Favorite'}</Button>
				<Button className="btn btn-danger" size={isPopup ? `sm` : null} onClick={event => {
					event.preventDefault();
					clicked(id);
				}}>Delete</Button>
			</div>
			<p
				style={{
					position: "absolute",
					fontSize: ".65rem",
					top: 0,
					padding: "1rem"
				}}
			>{`${humanized} ago`}</p>
			{!isPopup &&
				<a
					href=''
					aria-label='Delete Listing'
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
			}
		</article >
	);
}
