import {
	GET_LISTINGS,
	DELETE_LISTING,
	LISTINGS_ERROR
} from "../constants/action-types";

const initialState = {
	listings: [],
	offset: 0,
	pageCount: 1,
	error: null
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_LISTINGS:
			const { listings, limit, pageCount } = payload;
			return {
				...state,
				listings: [...listings],
				limit,
				pageCount
			};
		case DELETE_LISTING:
			return {
				...state,
				listings: state.listings.filter(listing => listing.id !== payload)
			};
		case LISTINGS_ERROR:
			return {
				...state,
				error: payload
			};
		default:
			return state;
	}
};
