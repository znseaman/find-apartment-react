import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const carousel = ({ imageUrls, showThumbs = false, dynamicHeight = false }) => {
	return (
		<Carousel showThumbs={showThumbs} dynamicHeight={dynamicHeight}>
			{imageUrls.map((src, i) => (
				<img src={src} alt={`Photo ` + (i + 1)} />
			))}
		</Carousel>
	);
};

export default carousel;
