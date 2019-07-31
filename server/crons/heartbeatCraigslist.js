const axios = require("axios");
const Listing = require("../models/listing");

function wasFlagged(html) {
	const regex = /flagged/g;
	return regex.test(html);
}

function wasDeleted(html) {
	const regex = /deleted/g;
	return regex.test(html);
}

const heartbeatCraigslist = async (listings, deleteFunc) => {
	console.log("--------------");
	console.log(
		`Starting check for deleted / flagged listings for ${listings.length} listings on craigslist...`
	);

	let totalDeleted = 0;
	// Loop through listings for urls
	for await (const listing of listings) {
		const { id, url } = listing;
		// TODO: fix what occurs when this throws an error due to destructuring
		const { data } = (await axios.get(url).catch(async error => {
			if (error.response) {
				if (error.response.status === 404) {
					// delete listing from the DB
					const res = await Listing.destroy({
						where: {
							id
						}
					});

					if (res) {
						totalDeleted += 1;
					}
				}
			}
		})) || { data: "" };
		// Check if the page contains "deleted" or "flagged"
		if (wasFlagged(data) || wasDeleted(data)) {
			// delete listing from the DB
			const res = await Listing.destroy({
				where: {
					id
				}
			});

			if (res) {
				totalDeleted += 1;
			}
		}
	}

	console.log("Finished check for deleted / flagged listings on craigslist");
	console.log(`Deleted ${totalDeleted} irrelevant listings from craigslist`);
	console.log("--------------");
};

module.exports = heartbeatCraigslist;
