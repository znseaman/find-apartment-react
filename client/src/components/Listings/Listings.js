import React from "react";

import Listing from "./Listing/Listing";

const Listings = props => {
	const { listings } = props;
	const all = listings.map(listing => {
		return (
			<Listing
				key={listing.id}
				title={listing.title}
				url={listing.url}
				date={listing.date}
				description={listing.description}
				lat={listing.lat}
				lng={listing.lng}
				img={listing.img}
			/>
		);
	});
	return all;
};

export default Listings;
