import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Listing from "../Listings/Listing/Listing"

/* Boilerplate for Leaflet to work in React */
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { getListings, deleteListing } from "../../redux/actions";

const mapStateToProps = state => ({ listings: state.listings });

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
	iconUrl: require("leaflet/dist/images/marker-icon.png"),
	shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const SimpleMap = ({ listings, getListings, deleteListing }) => {
	const [center] = useState([49.2671543446071, -123.14777031540872]);
	const [zoom] = useState(13);

	const [limit, setLimit] = useState(50);
	const [offset, setOffset] = useState(0);
	const map = React.useRef();

	useEffect(() => {
		// @TODO: use a BBOX filter here instead of getListings
		getListings({ limit, offset });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [limit, offset]);

	const renderPopup = listing =>
		<Listing {...listing} clicked={deleteListing} isPopup={true}></Listing>

	const markers =
		listings.length === 0
			? null
			: listings.map(listing => {
				const {
					id,
					latitude: lat,
					longitude: lng,
				} = listing;
				return (
					<Marker key={id} position={[lat, lng]}>
						<Popup>
							{renderPopup(listing)}
						</Popup>
					</Marker>
				);
			});

	const assignRef = event => {
		map.current = event.target;
		// fixes bug with showing grey tiles after zoom level 19
		map.current.setMaxZoom(19);
	}

	return (
		<Map whenReady={assignRef} center={center} zoom={zoom} style={{ width: "100%" }}>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
			/>
			{markers}
		</Map>
	);
};

SimpleMap.propTypes = {
	listings: PropTypes.array.isRequired,
	getListings: PropTypes.func.isRequired,
	deleteListing: PropTypes.func.isRequired
};

export default connect(
	mapStateToProps,
	{ getListings, deleteListing }
)(SimpleMap);
