import React from "react";
import ReactPaginate from "react-paginate";

import Listing from "./Listing/Listing";
import useListings from "../../hooks/useListings";

import "../Listings/ReactPaginate.css";

import Spinner from "../UI/Spinner/Spinner";

const Listings = () => {
	const [
		listings,
		deleteListingHandler,
		pageCount,
		limit,
		setLimit,
		offset,
		setOffset
	] = useListings();

	const perPage = 10;

	const handlePageClick = data => {
		const { selected } = data;
		const offset = Math.ceil(selected * perPage);

		setOffset(offset);
		window.scrollTo(0, 0);
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

	const isLoading = all.length === 0;
	let showListings = (
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
	if (isLoading) {
		showListings = <Spinner></Spinner>;
	}

	return showListings;
};

export default Listings;
