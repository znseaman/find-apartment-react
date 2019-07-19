import { useState, useEffect } from "react";

export default () => {
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
	}, [listings]);

	return [listings, setListings];
};
