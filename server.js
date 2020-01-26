const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 9000;

const sequelize = require("./utils/database");
const listing = require("./routes/api/listing");
const user = require("./routes/api/user");
const search_setting = require("./routes/api/search_setting");
const { login, signup, protect } = require("./utils/auth");

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

app.post("/login", login);
app.post("/signup", signup);
app.use("/listing", protect, listing);
app.use("/user", user);
app.use("/search_setting", protect, search_setting);

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
