import {
	GET_LISTINGS,
	LISTINGS_ERROR,
	DELETE_LISTING
} from "../constants/action-types";
import { CONNECTION } from "../../config";
import axiosConfig from '../../shared/axios';

export const getListings = ({ limit, offset }) => async dispatch => {
	var interval = null;
	async function fetchData() {
		const url = new URL(`${CONNECTION}/listing/all`);
		const params = { limit, offset, orderBy: 'postedAt', order: 'DESC' };
		Object.keys(params).forEach(key =>
			url.searchParams.append(key, params[key])
		);

		try {
			var data = await axiosConfig.get(url.toString(), { withCredentials: true }) || {
				listings: [],
				meta: { total_count: 1, limit: 1 }
			};

			// @ts-ignore
			if (data && data.meta && data.listings && data.listings.length > 0) {
				clearInterval(interval);
				interval = null;
			}

			// if no listings found, wait a bit until trying to search again
			// @ts-ignore
			if (data && data.listings && data.listings.length === 0 && interval === null) {
				interval = setInterval(() => {
					fetchData();
				}, 10000);
			}

			const {
				// @ts-ignore
				listings,
				// @ts-ignore
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
		await fetch(`${CONNECTION}/listing/${id}`, {
			method: "DELETE",
			body
		});
		dispatch({ type: DELETE_LISTING, payload: id });
	} catch (e) {
		console.error(e);
		dispatch({ type: LISTINGS_ERROR, payload: e });
	}
};
