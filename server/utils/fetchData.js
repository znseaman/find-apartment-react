const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async url => {
	const { data } = await axios.get(url).catch(error => {
		console.error(error);
	});
	const $ = cheerio.load(data);

	const price = Number(
		$("body > section > section > h2 > span.postingtitletext > span.price")
			.text()
			.replace("$", "")
	);

	let [beds, baths] = $(
		"body > section > section > section > div.mapAndAttrs > p:nth-child(2) > span:nth-child(1)"
	)
		.text()
		.replace(/br|ba/gi, "")
		.split(" / ")
		.map(Number);

	// catch listings without beds or baths specified
	if (Number.isNaN(beds) || beds == null) {
		beds = 0;
	}
	if (Number.isNaN(baths) || baths == null) {
		baths = 0;
	}

	// sometimes catches available move in day instead of the size, look for if it doesn't have "housing_movein_now" class
	const size = $(
		"body > section > section > section > div.mapAndAttrs > p:nth-child(2) > span:nth-child(2)"
	)
		.not(".housing_movein_now")
		.text();

	const amenities = $(
		"body > section > section > section > div.mapAndAttrs > p:nth-child(3) > span"
	)
		.map((i, el) => {
			return $(el).text();
		})
		.get()
		.join(", ");

	return {
		price,
		beds,
		baths,
		size,
		amenities
	};
};

module.exports = fetchData;
