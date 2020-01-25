import {
	GET_LISTINGS,
	LISTINGS_ERROR,
	DELETE_LISTING
} from "../constants/action-types";

export const getListings = ({ limit, offset }) => async dispatch => {
	var interval = null;
	async function fetchData() {
		const url = new URL(`http://localhost:9000/listing/all`);
		const params = { limit, offset, orderBy: 'postedAt', order: 'DESC' };
		Object.keys(params).forEach(key =>
			url.searchParams.append(key, params[key])
		);

		try {
			const res = await fetch(url, { credentials: "include" });
			const data = await res.json();

			if (data && data.meta && data.listings && data.listings.length > 0) {
				clearInterval(interval);
				interval = null;
			}

			// if no listings found, wait a bit until trying to search again
			if (data && data.listings.length === 0 && interval === null) {
				interval = setInterval(() => {
					fetchData();
				}, 10000);
			}

			const {
				listings,
				meta: { total_count, limit }
			} = data;
			const pageCount = Math.ceil(total_count / limit);
			dispatch({
				type: GET_LISTINGS,
				payload: { listings, pageCount }
			});
		} catch (e) {
			console.error(e);
			dispatch({ type: LISTINGS_ERROR, payload: e });
		}
	}

	fetchData();
};

export const deleteListing = id => async dispatch => {
	try {
		const body = new FormData();
		body.append("id", id);
		await fetch(`http://localhost:9000/listing/${id}`, {
			method: "DELETE",
			body
		});
		dispatch({ type: DELETE_LISTING, payload: id });
	} catch (e) {
		console.error(e);
		dispatch({ type: LISTINGS_ERROR, payload: e });
	}
};
