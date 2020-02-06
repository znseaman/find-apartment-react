import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import ReactPaginate from 'react-paginate'

import Listing from './Listing/Listing'

import '../Listings/ReactPaginate.css'

import Spinner from '../UI/Spinner/Spinner'
import {getListings, deleteListing, favoriteListing} from '../../redux/actions'

const mapStateToProps = state => ({
  listings: state.listings,
  pageCount: state.pageCount,
  isLoading: state.isLoading,
})

const Listings = ({
  listings,
  pageCount,
  getListings,
  deleteListing,
  favoriteListing,
  isLoading,
}) => {
  const [limit, setLimit] = useState(50)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    getListings({limit, offset})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, offset])

  const handlePageClick = data => {
    const {selected} = data
    const offset = Math.ceil(selected * limit)

    setOffset(offset)
    window.scrollTo(0, 0)
  }

  const all = listings.map(listing => {
    return (
      <Listing
        key={listing.id}
        {...listing}
        clicked={deleteListing}
        onFavorite={favoriteListing}
      />
    )
  })

  let showListings = (
    <>
      {all}
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </>
  )
  if (isLoading) {
    showListings = <Spinner></Spinner>
  }

  if (!isLoading && listings.length == 0) {
    showListings = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        No listings found yet. For new accounts, refresh in a few minutes. For
        existing users, check back at 7am Pacific.
      </div>
    )
  }

  return showListings
}

Listings.propTypes = {
  listings: PropTypes.array.isRequired,
  pageCount: PropTypes.number.isRequired,
  getListings: PropTypes.func.isRequired,
  deleteListing: PropTypes.func.isRequired,
  favoriteListing: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, {
  getListings,
  deleteListing,
  favoriteListing,
})(Listings)
