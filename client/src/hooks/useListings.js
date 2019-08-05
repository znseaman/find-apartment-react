import { useState, useEffect } from "react";

export default () => {
	const [listings, setListings] = useState([]);
	const [limit, setLimit] = useState(5);
	const [offset, setOffset] = useState(0);
	const [pageCount, setPageCount] = useState(1);

	useEffect(() => {
		async function fetchData() {
			const url = new URL(`http://localhost:9000/listing/all`);
			const params = { limit, offset };
			Object.keys(params).forEach(key =>
				url.searchParams.append(key, params[key])
			);
			const data = await fetch(url)
				.then(response => response.json())
				.catch(e => {
					console.error(e);
					throw e;
				});

			if (data) {
				setListings(data.listings);
				setPageCount(
					Math.ceil(data.meta.total_count / data.meta.limit)
				);
			}
		}

		fetchData();
	}, [offset, limit]);

	const deleteListingHandler = async id => {
		const body = new FormData();
		body.append("id", id);
		const response = await fetch(`http://localhost:9000/listing/${id}`, {
			method: "DELETE",
			body
		}).catch(e => {
			console.log(e);
			throw e;
		});
		console.log(response);

		const updatedListings = listings.filter(listing => listing.id !== id);
		setListings(updatedListings);
	};

	return [
		listings,
		deleteListingHandler,
		pageCount,
		limit,
		setLimit,
		offset,
		setOffset
	];
};
