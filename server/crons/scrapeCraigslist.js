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
	const client = setupClient(userPreferences);
	const listings =
		(await client.search(userPreferences, "").catch(error => {
			if (logging) console.log("Fetching listings...");
			console.error(error);
		})) || [];

	// loop through each listing
	for (const [i, listing] of listings.entries()) {

		const { pid } = listing;
		// check whether the pid already exists in the listings table
		const exists = await Listing.findOne({
			where: {
				pid
			},
			attributes: ["pid"]
		});

		if (exists) {
			break;
		}

		/**
		 * {category, date, hasPic, location, pid, price, title, url} = listing
		 */
		const { price: dirtyPrice } = listing;
		const price = dirtyPrice.replace("$", "");

		const details =
			(await client.details(listing).catch(error => {
				console.error(error);
			})) || {};
		/**
		 * {description, mapUrl, pid, replyUrl, title, url, postedAt, images, attributes} = details
		 */
		const { mapUrl } = details;
		if (!mapUrl) {
			continue;
		}

		// extract the coordinates from mapUrl
		const hasCoords = mapUrl.match(
			/@(-?\d+\.\d+),(-?\d+\.\d+),(\d+\.?\d?)+z/g
		);

		// skip if no coordinates
		if (!hasCoords) {
			continue;
		}

		const [latitude, longitude, zoom] = hasCoords[0]
			.replace("@", "")
			.replace("z", "")
			.split(",");

		const { description, title, url, images = [], postedAt } = details;

		const regex = new RegExp(`no pet`, "i");
		// skip if there's a mention of no pets
		if (regex.test(description)) {
			continue;
		}

		// is lat,lng is within one of the polygons
		const coordinates = [longitude, latitude];
		// @ts-ignore
		var poly = lookup.search(...coordinates);
		if (!poly) {
			continue;
		}

		const { name: polygon_name } = poly.properties;
		const point = {
			type: "Point",
			coordinates,
			crs: {
				type: "name",
				properties: { name: "EPSG:4326" }
			}
		};

		// Reach out to the original posting url to get additional data (# br / # ba, amenities, etc.)
		const fetchData = require("../utils/fetchData");
		const { beds, baths, size, amenities, image } = await fetchData(
			url
		).catch(error => {
			console.error(error);
		});

		// Fixes listings with only 1 picture
		// 		if `listing` object registers as `hasPic: true`,
		//		`details` object will not have `images` property
		if (images.length === 0) images.push(image);

		// join urls together
		const imageUrls = images.join(",");

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
