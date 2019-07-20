import React from "react";

import Listing from "./Listing/Listing";
import useListings from "../../hooks/useListings";

const Listings = () => {
	const [listings, deleteListingHandler] = useListings();

	const all = listings.map(listing => {
		// use 1st image from the imageUrls
		const [img] = listing.imageUrls.split(",");
		return (
			<Listing
				key={listing.id}
				id={listing.id}
				title={listing.title}
				url={listing.url}
				description={listing.description}
				lat={listing.latitude}
				lng={listing.longitude}
				img={img}
				clicked={deleteListingHandler}
			/>
		);
	});
	return all;
};

export default Listings;
