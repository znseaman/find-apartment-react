const { CronJob } = require("cron");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 9000;
const db = require("./database/queries");

const sequelize = require("./utils/database");
const Listing = require("./models/listing");
const User = require("./models/user");

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(cors());

app.get("/", (request, response) => {
	response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/listings", db.getListings);
app.delete("/listings/:id", db.deleteListing);
// app.get("/users", db.getUsers);
// app.get("/users/:id", db.getUserById);
// app.post("/users", db.createUser);
// app.put("/users/:id", db.updateUser);
// app.delete("/users/:id", db.deleteUser);

const scrapeListings = require("./crons/scrapeCraigslist");
/**
 * Fetch listings data from craigslist
 *
 * Example cron expression:
 * run at 7:00 am everyday
 * const cronExp = "0 0 7 * * *";
 */
const cronExp = "5 * * * * *";
new CronJob(
	cronExp,
	function() {
		scrapeListings(true);
	},
	null,
	true,
	"America/Vancouver"
);

/**
 * Fetch status of listings and delete them if they have been deleted or flagged
 *
 */
const heartbeatListings = require("./crons/heartbeatCraigslist");
const cron = "50 * * * * *";
new CronJob(
	cron,
	async function() {
		const listings = await Listing.findAll();
		await heartbeatListings(listings);
	},
	null,
	true,
	"America/Vancouver"
);

Listing.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Listing);

(async () => {
	try {
		// sync sequelize db .sync({force: true}) - reset the entire db
		await sequelize.sync();

		let user = await User.findByPk(1);
		if (!user) {
			// TODO: load from userPreferences.js as default
			user = await User.create({
				name: "Zach",
				email: "zach@test.com",
				base_host: "craigslist.ca",
				city: "Vancouver",
				category: "apa",
				has_pic: 1,
				max_price: 5000,
				min_price: 1000,
				posted_today: 1
			});
		}

		app.listen(port, () => {
			console.log(`App running on port ${port}.`);
		});
	} catch (error) {
		console.error(error);
	}
})();

// Catch unhandled rejections and exceptions
process
	.on("unhandledRejection", (reason, p) => {
		console.error(reason, "Unhandled Rejection at Promise", p);
	})
	.on("uncaughtException", err => {
		console.error(err, "Uncaught Exception thrown");
		process.exit(1);
	});
