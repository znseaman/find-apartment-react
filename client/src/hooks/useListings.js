import { useState, useEffect } from "react";

export default useListings => {
	const [listings, setListings] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const data = await fetch("http://localhost:9000/listings")
				.then(response => response.json())
				.catch(e => {
					console.error(e);
					throw e;
				});

			if (data) {
				setListings(data);
			}
		}

		fetchData();
	}, []);

	const deleteListingHandler = async id => {
		const body = new FormData();
		body.append("id", id);
		const response = await fetch(`http://localhost:9000/listings/${id}`, {
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

	return [listings, deleteListingHandler];
};
