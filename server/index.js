const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 9000;

const sequelize = require("./utils/database");
const listing = require("./routes/api/listing");
const User = require("./models/user");
const user = require("./routes/api/user");

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(cors());

app.use("/listing", listing);
app.use("/user", user);

// Error handling middleware
app.use((err, req, res, next) => {
	if (!err.statusCode) err.statusCode = 500;

	res.status(err.statusCode).json({ type: "error", msg: err.message });
});

/* Cron Jobs */
const { CronJob } = require("cron");
const { scrape, heartbeat } = require("./crons/craigslist/options");
new CronJob(...scrape);
new CronJob(...heartbeat);

const hash = require("./database/hash");
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
				username_hash: hash("zach"),
				password_hash: hash("pass123"),
				base_host: "craigslist.ca",
				city: "Vancouver",
				category: "apa",
				has_pic: 1,
				max_price: 3000,
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
