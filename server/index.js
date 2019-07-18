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

// TODO: move this to another file
// run at 7:00 am everyday
// const cronExp = "0 0 7 * * *";
const cronExp = "50 37 14 * * *";
new CronJob(
	cronExp,
	async function() {
		console.log("Getting data from craigslist...");
		// TODO: instead of getting these from data, have them come from the DB
		const PolygonLookup = require("polygon-lookup");
		const featureCollection = require("./data/polygons.json");
		const lookup = new PolygonLookup(featureCollection);

		const craigslist = require("node-craigslist");
		const userPreferences = require("./utils/userPreferences");
		const { baseHost, city } = userPreferences;
		let client = new craigslist.Client({
			baseHost,
			city
		});
		const listings = await client.search(userPreferences, "");
		for (const listing of listings) {
			const details = await client.details(listing);

			const { mapUrl } = details;
			if (!mapUrl) {
				break;
			}

			// extract the coordinates from mapUrl
			const hasCoords = details.mapUrl.match(
				/@(-?\d+\.\d+),(-?\d+\.\d+),(\d+\.?\d?)+z/g
			);

			if (hasCoords) {
				let coordinates = hasCoords[0]
					.replace("@", "")
					.replace("z", "")
					.split(",");
				var [latitude, longitude, zoom] = coordinates;

				const {
					description,
					pid,
					title,
					url,
					images,
					postedAt
				} = details;

				const regex = new RegExp(`no pets`, "i");

				// has images & there's no mention of no pets
				if (images && !regex.test(description)) {
					// just combine them
					const imageUrls = images.join(",");

					// is lat,lng is within one of the polygons
					var poly = lookup.search(longitude, latitude);
					if (poly) {
						const { name: polygon_name } = poly.properties;
						const point = {
							type: "Point",
							coordinates: [longitude, latitude],
							crs: {
								type: "name",
								properties: { name: "EPSG:4326" }
							}
						};
						Listing.create({
							description,
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
							userId: 1
						});
					}
				}
			}
		}
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
			user = await User.create({
				name: "Zach",
				email: "zach@test.com",
				base_host: "craigslist.ca",
				city: "Vancouver",
				category: "apa",
				has_pic: 1,
				max_price: 2000,
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
