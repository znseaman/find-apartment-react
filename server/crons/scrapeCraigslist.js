const Listing = require("../models/listing");
const getUserPreferences = require("./craigslist/getUserPreferences");
const setupClient = require("./craigslist/setupClient");

const scrapeCraigslist = async (logging = false) => {
	if (logging) console.log("Getting data from craigslist...");
	// TODO: instead of getting these from data, have them come from the DB
	const PolygonLookup = require("polygon-lookup");
	const featureCollection = require("../data/polygons.json");
	const lookup = new PolygonLookup(featureCollection);

	// get listings
	const userPreferences = await getUserPreferences(1);
	const noPhotos = {
		...userPreferences,
		hasPic: "*$%&"
	};
	const client = setupClient(userPreferences);
	const listings =
		(await client.search(noPhotos, "").catch(error => {
			if (logging) console.log("Fetching listings...");
			console.error(error);
		})) || [];

	// loop through each listing
	for (const listing of listings) {
		const details =
			(await client.details(listing).catch(error => {
				console.error(error);
			})) || {};

		const { mapUrl } = details;
		if (!mapUrl) {
			continue;
		}

		// extract the coordinates from mapUrl
		const hasCoords = details.mapUrl.match(
			/@(-?\d+\.\d+),(-?\d+\.\d+),(\d+\.?\d?)+z/g
		);

		// skip if no coordinates
		if (!hasCoords) {
			continue;
		}

		let coordinates = hasCoords[0]
			.replace("@", "")
			.replace("z", "")
			.split(",");
		var [latitude, longitude, zoom] = coordinates;

		const { description, pid, title, url, images = [], postedAt } = details;

		const regex = new RegExp(`no pet`, "i");
		// skip if there's a mention of no pets
		if (regex.test(description)) {
			continue;
		}

		// just combine them
		const imageUrls = images.join(",");

		// is lat,lng is within one of the polygons
		var poly = lookup.search(longitude, latitude);
		if (!poly) {
			continue;
		}

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

		if (exists) {
			break;
		}

		// Reach out to the original posting url to get additional data (# br / # ba, price, amenities, etc.)
		const fetchData = require("../utils/fetchData");
		const { price, beds, baths, size, amenities } = await fetchData(
			url
		).catch(error => {
			console.error(error);
		});

		// clean description before entering into the DB
		const desc = description.replace("QR Code Link to This Post", "");

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
			userId: 1,
			price,
			beds,
			baths,
			size,
			amenities
		});
	}
};

module.exports = scrapeCraigslist;
