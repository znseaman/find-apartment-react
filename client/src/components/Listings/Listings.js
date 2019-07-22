import React from "react";

import Listing from "./Listing/Listing";
import useListings from "../../hooks/useListings";

const Listings = () => {
	const [listings, deleteListingHandler] = useListings();

	const all = listings.map(listing => {
		return (
			<Listing
				key={listing.id}
				{...listing}
				clicked={deleteListingHandler}
			/>
		);
	});
	return all;
};

export default Listings;
