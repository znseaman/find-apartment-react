import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

/* Boilerplate for Leaflet to work in React */
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import useListings from "../../hooks/useListings";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
	iconUrl: require("leaflet/dist/images/marker-icon.png"),
	shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const SimpleMap = () => {
	const [center] = useState([49.2671543446071, -123.14777031540872]);
	const [zoom] = useState(13);
	const [listings, deleteListingHandler] = useListings([]);

	const markers =
		listings.length === 0
			? null
			: listings.map(listing => {
					const {
						id,
						latitude: lat,
						longitude: lng,
						title,
						description,
						url,
						postedAt
					} = listing;
					const position = [lat, lng];
					return (
						<Marker key={id} position={position}>
							<Popup>
								<h3>{title}</h3>
								<h4>{description}</h4>
								<h5>Date Posted: {postedAt}</h5>
								<a href={url} target="_blank">
									Original Post
								</a>
								<button
									onClick={() => deleteListingHandler(id)}
								>
									Delete Post
								</button>
							</Popup>
						</Marker>
					);
			  });

	return (
		<Map center={center} zoom={zoom} style={{ width: "100%" }}>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
			/>
			{markers}
		</Map>
	);
};

export default SimpleMap;
