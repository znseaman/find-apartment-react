import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./SimpleMap.css";
import Listing from "./Listing";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
	iconUrl: require("leaflet/dist/images/marker-icon.png"),
	shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default class SimpleMap extends Component {
	state = {
		lat: 49.2671543446071,
		lng: -123.14777031540872,
		zoom: 13,
		listings: []
	};

	async componentDidMount() {
		const listings = await fetch("http://localhost:9000/listings")
			.then(response => response.json())
			.catch(e => {
				console.error(e);
				throw e;
			});
		this.setState({ listings });
	}

	deleteListingHandler = async id => {
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

		const listings = this.state.listings.filter(
			listing => listing.id !== id
		);
		this.setState({ listings });
	};

	render() {
		const center = [this.state.lat, this.state.lng];

		const markers =
			this.state.listings.length === 0
				? null
				: this.state.listings.map(listing => {
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
										onClick={() =>
											this.deleteListingHandler(id)
										}
									>
										Delete Post
									</button>
								</Popup>
							</Marker>
						);
				  });

		return (
			<Map center={center} zoom={this.state.zoom}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				{markers}
			</Map>
		);
	}
}
