const Listing = require("../models/listing");

const fetchDataFromCraigslist = async () => {
	console.log("Getting data from craigslist...");
	// TODO: instead of getting these from data, have them come from the DB
	const PolygonLookup = require("polygon-lookup");
	const featureCollection = require("../data/polygons.json");
	const lookup = new PolygonLookup(featureCollection);

	const craigslist = require("node-craigslist");
	const userPreferences = require("../utils/userPreferences");
	const { baseHost, city } = userPreferences;
	let client = new craigslist.Client({
		baseHost,
		city
	});
	const listings = await client.search(userPreferences, "");
	for (const listing of listings) {
		const details = await client.details(listing);

		const { mapUrl } = details;
		if (!mapUrl) {
			break;
		}

		// extract the coordinates from mapUrl
		const hasCoords = details.mapUrl.match(
			/@(-?\d+\.\d+),(-?\d+\.\d+),(\d+\.?\d?)+z/g
		);

		if (hasCoords) {
			let coordinates = hasCoords[0]
				.replace("@", "")
				.replace("z", "")
				.split(",");
			var [latitude, longitude, zoom] = coordinates;

			const { description, pid, title, url, images, postedAt } = details;

			const regex = new RegExp(`no pets`, "i");

			// has images & there's no mention of no pets
			if (images && !regex.test(description)) {
				// just combine them
				const imageUrls = images.join(",");

				// is lat,lng is within one of the polygons
				var poly = lookup.search(longitude, latitude);
				if (poly) {
					const { name: polygon_name } = poly.properties;
					const point = {
						type: "Point",
						coordinates: [longitude, latitude],
						crs: {
							type: "name",
							properties: { name: "EPSG:4326" }
						}
					};

					// check whether the pid is not unique in the listings table
					const exists = await Listing.findOne({
						where: {
							pid
						}
					});

					if (!exists) {
						// clean description before entering into the DB
						const desc = description.replace(
							"QR Code Link to This Post",
							""
						);

					Listing.create({
							description: desc,
						pid,
						title,
						url,
						imageUrls,
						latitude,
						longitude,
						point,
						zoom,
						postedAt,
						polygon_name,
						userId: 1
					});
				}
			}
		}
	}
};

module.exports = fetchDataFromCraigslist;
