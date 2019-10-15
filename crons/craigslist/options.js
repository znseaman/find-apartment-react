/**
 * Fetch listings data from craigslist
 *
 * Example cron expression:
 * run at 7:00 am everyday
 * 		0 0 7 * * *
 */
const scrapeListings = require("./scrape");
const User = require("../../models/user");
const Sequelize = require("sequelize");
const { Op } = Sequelize;
const { ne: $ne } = Op;
const scrape = [
	"50 * * * * *",
	async function() {
		// get all the active users (i.e. ones with sessions set)
		const users = await User.findAll({
			where: {
				session_id: {
					[$ne]: null
				}
			},
			attributes: ["id"]
		});
		console.log();
		for await (const user of users) {
			const { id } = user;
			scrapeListings(true, id);
		}
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
