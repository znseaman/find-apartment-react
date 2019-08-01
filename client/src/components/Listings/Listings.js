import React from "react";

import Listing from "./Listing/Listing";
import useListings from "../../hooks/useListings";

import "../Listings/ReactPaginate.css";

const Listings = ({ perPage }) => {
	const [
		listings,
		deleteListingHandler,
		pageCount,
		limit,
		setLimit,
		offset,
		setOffset
	] = useListings();


	const handlePageClick = data => {
		const { selected } = data;
		const offset = Math.ceil(selected * perPage);

		setOffset(offset);
	};

	const all = listings.map(listing => {
		return (
			<Listing
				key={listing.id}
				{...listing}
				clicked={deleteListingHandler}
			/>
		);
	});
	return (
		<>
			{all}
			<ReactPaginate
				previousLabel={"previous"}
				nextLabel={"next"}
				breakLabel={"..."}
				breakClassName={"break-me"}
				pageCount={pageCount}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={handlePageClick}
				containerClassName={"pagination"}
				subContainerClassName={"pages pagination"}
				activeClassName={"active"}
			/>
		</>
	);
};

export default Listings;
