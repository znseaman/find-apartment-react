const Listing = require("../../models/listing");
const getUserPreferences = require("./getUserPreferences");
const setupClient = require("./setupClient");
const { getRandomFSA_Vancouver, getRandomInt } = require("./getRandomFS");

const scrapeCraigslist = async (logging = false, userId) => {
	if (logging) console.log(`\n-------------------------------------\n`);
	if (logging)
		console.log(`Getting data from craigslist for userId #${userId} ...`);
	// TODO: instead of getting these from data, have them come from the DB
	const PolygonLookup = require("polygon-lookup");
	const featureCollection = require("../../data/local_area_boundary.json");
	const lookup = new PolygonLookup(featureCollection);

	// get listings
	const userPreferences = await getUserPreferences(userId);
	const superPreferences = {
		...userPreferences,
		postal: getRandomFSA_Vancouver()(),
		searchDistance: getRandomInt(1, 40),
		nocache: 1
	};
	const client = setupClient(userPreferences);
	const listings =
		(await client.search(superPreferences, "").catch(error => {
			if (logging) console.log("Fetching listings...");
			console.error(error);
		})) || [];

	// loop through each listing
	for (const [i, listing] of listings.entries()) {
		const { location } = listing;
		// skip ignored locations
		const ignoredLocs = [
			"burnaby",
			"new westminster",
			"surrey",
			"north vancouver",
			"west vancouver",
			"mission",
			"coquitlam",
			"delta",
			"east vancouver"
		];
		const ignoredLocations = new RegExp(`${ignoredLocs.join("|")}`, "i");
		if (ignoredLocations.test(location)) {
			continue;
		}

		const { pid } = listing;
		// check whether the pid already exists in the listings table
		const exists = await Listing.findOne({
			where: {
				pid
			},
			attributes: ["pid"]
		});

		if (exists) {
			continue;
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

		if (Object.keys(details) === 0) {
			continue;
		}

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

		const regexDog = new RegExp(`no dog`, "i");
		// skip if there's a mention of no dogs
		if (regexDog.test(description)) {
			continue;
		}

		// is lat,lng is within one of the polygons
		const coordinates = [longitude, latitude];
		// @ts-ignore
		// const poly = { properties: { name: "" } };
		const poly = lookup.search(...coordinates);
		if (!poly) {
			continue;
		}

		const { NAME: polygon_name } = poly.properties;
		const point = {
			type: "Point",
			coordinates,
			crs: {
				type: "name",
				properties: { name: "EPSG:4326" }
			}
		};

		// Reach out to the original posting url to get additional data (# br / # ba, amenities, etc.)
		const fetchData = require("../../utils/fetchData");

		let response;
		try {
			response = await fetchData(url);
		} catch (e) {
			console.error(e);
			continue;
		}

		const { beds, baths, size, amenities, image } = response;

		// check for duplicate post (the listing price, size, and coordinates are the same as a previously saved entry)
		// this protects against the multiple posts issue, when users post to get their listing to appear fresh when it's been on the market for a while
		const duplicate_post = await Listing.findOne({
			where: {
				price,
				size,
				latitude,
				longitude
			},
			attributes: ["price", "size", "postedAt", "latitude", "longitude"]
		});

		if (duplicate_post) {
			// FEATURE IDEA: add a desperation level to the post depending on the posts that match title & coordinates criteria
			continue;
		}

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
			userId,
			price,
			beds,
			baths,
			size,
			amenities,
			favorite: false
		});
	}

	if (logging)
		console.log(
			"Finished getting",
			listings.length,
			`listings from craigslist for userId #${userId} ...`
		);
	if (logging) console.log(`\n-------------------------------------\n`);
};

module.exports = scrapeCraigslist;
