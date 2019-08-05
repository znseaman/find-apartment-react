/**
 * Fetch listings data from craigslist
 *
 * Example cron expression:
 * run at 7:00 am everyday
 * 		0 0 7 * * *
 */
const scrapeListings = require("./scrape");
const scrape = [
	"0 * * * * *",
	function() {
		scrapeListings(true);
	},
	null,
	true,
	"America/Vancouver"
];

/**
 * Fetch status of listings and delete them if they have been deleted or flagged
 *
 */
const heartbeatListings = require("./heartbeat");
const Listing = require("../../models/listing");
const heartbeat = [
	"10 * * * * *",
	async function() {
		const listings = await Listing.findAll();
		await heartbeatListings(listings);
	},
	null,
	true,
	"America/Vancouver"
];

module.exports = {
	scrape,
	heartbeat
};
