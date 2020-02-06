import {
  GET_LISTINGS,
  DELETE_LISTING,
  LISTINGS_ERROR,
  FAVORITE_LISTING,
} from '../constants/action-types'

const initialState = {
  listings: [],
  offset: 0,
  pageCount: 1,
  error: null,
  isLoading: true,
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_LISTINGS:
      const {listings, limit, pageCount} = payload
      return {
        ...state,
        listings: [...listings],
        limit,
        pageCount,
        isLoading: false,
      }
    case DELETE_LISTING:
      return {
        ...state,
        listings: state.listings.filter(listing => listing.id !== payload),
      }
    case LISTINGS_ERROR:
      return {
        ...state,
        error: payload,
      }
    case FAVORITE_LISTING:
      return {
        ...state,
        listings: state.listings.map(listing => {
          if (listing.id == payload.id) {
            listing.favorite = payload.favorite
          }
          return listing
        }),
      }
    default:
      return state
  }
}
