const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 9000;

const sequelize = require("./utils/database");
const listing = require("./routes/api/listing");
const User = require("./models/user");
const user = require("./routes/api/user");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(
	cors({
		// Frontend host
		origin: "http://localhost:3000",
		credentials: true
	})
);

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

(async () => {
	try {
		// sync sequelize db .sync({force: true}) - reset the entire db
		await sequelize.sync();

		let user = await User.findByPk(1);
		if (!user) {
			const {
				city,
				baseHost: base_host,
				hasPic: has_pic,
				category,
				maxPrice: max_price,
				minPrice: min_price,
				postedToday: posted_today
			} = require("./utils/userPreferences");
			const userPreferences = {
				base_host,
				city,
				category,
				has_pic,
				max_price,
				min_price,
				posted_today
			};

			const hash = require("./utils/hash");
			const Session = require("./utils/session");
			const userDetails = require("./secrets/first_user");
			const { id: session_id } = new Session(userDetails.username);
			userDetails.session_id = session_id;
			userDetails.username_hash = hash(userDetails.username);
			delete userDetails.username;
			userDetails.password_hash = hash(userDetails.password);
			delete userDetails.password;

			// TODO: load from userPreferences.js as default
			user = await User.create({
				...userDetails,
				...userPreferences
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
