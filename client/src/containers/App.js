import React, { Component } from "react";
import "./App.css";

import Listing from "../components/Listing";
import SimpleMap from "../components/SimpleMap";

class App extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		view_type: "map",
		// TODO: make state dynamic
		listings: [
			{
				id: 1,
				title: "Luxury furnished 2-Bedroom apt",
				url:
					"https://vancouver.craigslist.org/van/apa/d/vancouver-luxury-furnished-2-bedroom-apt/6897449040.html",
				date: new Date(),
				description:
					"one of the finest condo in the area. steps away from the seawall, seabus, shops, Stanley Park & Marina. Panoramic views of Ocean, Stanley Park, Marina & Northshore mountains. Two Units per floor!. Sleek glass exterior & unique triangular building design. Geothermal heating/cooling system. 1 Parking stalls & 1 storage locker. Walking distance to Urban Fair, Seven Eleven, Liquor store, Steve Nash, Fit for Less, Shoppers, A&W",
				lat: 49.288494,
				lng: -123.124674,
				img:
					"https://images.craigslist.org/00y0y_VnFvICjp2j_600x450.jpg"
			},
			{
				id: 2,
				title: "Suite in Vancouver",
				url:
					"https://vancouver.craigslist.org/van/apa/d/vancouver-suite-in-vancouver/6897391481.html",
				date: new Date(),
				description:
					"You will be pleased when entering this furnished 1 bedroom plus den condo at The Hudson thanks to its laminate flooring and fun furnishings. Upon entry, you will discover the home office which is furnished with a glass table, super cool lucite chair, black leather arm chair, floating glass shelves, and a funky accent wall. The tiled kitchen area will make home cooking a dream thanks to the stainless steel appliances, abundance of cabinetry and large island with granite countertops. Dine in style at the four person modern glass top table which sits beneath a fabulous crystal chandelier. You can relax and unwind on the grey sectional couch which sits in front of a flat screen TV and is decorated with a funky area rug and classy standing lamp.",
				lat: 49.281345,
				lng: -123.119869,
				img:
					"https://images.craigslist.org/01515_8t0nwgUz5it_600x450.jpg"
			},
			{
				id: 3,
				title: "Cozy 1-bedroom basement",
				url: "https://google.com",
				date: new Date(),
				description:
					"Situated in downtown Kerrisdale, this 1-bedroom basement suite is perfect for a young couple. We accept dogs.",
				lat: 49.234547,
				lng: -123.164058,
				img:
					"https://geo0.ggpht.com/maps/photothumb/fd/v1?bpb=ChAKDnNlYXJjaC5UQUNUSUxFEiAKEgmhKmC0enOGVBGJrMuYZeStgioKDQAAAAAVAAAAABoGCPABEJgD&gl=CA"
			}
		]
	};

	render() {
		if (this.state.view_type === "map") {
			return (
				<div className="App">
					<header className="App-header">
						<SimpleMap />
					</header>
				</div>
			);
		} else {
			// Listings view
			const listings = this.state.listings.map(listing => {
				return (
					<Listing
						key={listing.id}
						title={listing.title}
						url={listing.url}
						date={listing.date}
						description={listing.description}
						lat={listing.lat}
						lng={listing.lng}
						img={listing.img}
					/>
				);
			});
			return (
				<div className="App">
					<header className="App-header">{listings}</header>
				</div>
			);
		}
	}
}

export default App;
