import {
  GET_LISTINGS,
  LISTINGS_ERROR,
  DELETE_LISTING,
  FAVORITE_LISTING,
} from '../constants/action-types'
import axiosConfig from '../../shared/axios'
import config from '../../config/index'
const {FULL_SERVER_URL} = config

export const getListings = ({limit, offset}) => async dispatch => {
  var interval = null
  var times = 0
  var maxTimes = 5
  async function fetchData() {
    const url = new URL(`${FULL_SERVER_URL}/listing/all`)
    const params = {limit, offset, orderBy: 'postedAt', order: 'DESC'}
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key]),
    )

    try {
      var data = (await axiosConfig.get(url.toString(), {
        withCredentials: true,
      })) || {
        listings: [],
        meta: {total_count: 1, limit: 1},
      }

      // @ts-ignore
      if (data && data.meta && data.listings && data.listings.length > 0) {
        clearInterval(interval)
        interval = null
      }

      times++
      // stop interval after maxTimes
      if (interval && times == maxTimes) {
        clearInterval(interval)
        interval = null
        times = 0
        return false
      }

      // if no listings found, wait a bit until trying to search again
      // @ts-ignore
      if (
        data &&
        data.listings &&
        data.listings.length === 0 &&
        interval === null
      ) {
        interval = setInterval(() => {
          fetchData()
        }, 30000)
      }

      const {
        // @ts-ignore
        listings,
        // @ts-ignore
        meta: {total_count, limit},
      } = data
      const pageCount = Math.ceil(total_count / limit)
      dispatch({
        type: GET_LISTINGS,
        payload: {listings, pageCount},
      })
    } catch (e) {
      console.error(e)
      dispatch({type: LISTINGS_ERROR, payload: e})
    }
  }

  fetchData()
}

export const deleteListing = id => async dispatch => {
  try {
    await axiosConfig.delete(`/listing/${id}`, {withCredentials: true})
    dispatch({type: DELETE_LISTING, payload: id})
  } catch (e) {
    console.error(e)
    dispatch({type: LISTINGS_ERROR, payload: e})
  }
}

export const favoriteListing = (id, favorite) => async dispatch => {
  try {
    await axiosConfig.post(`/listing/favorite`, {
      id,
      favorite,
    })
    dispatch({type: FAVORITE_LISTING, payload: {id, favorite}})
  } catch (e) {
    console.error(e)
    dispatch({type: LISTINGS_ERROR, payload: e})
  }
}
