const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async url => {
	const { data } = await axios.get(url);
	const $ = cheerio.load(data);

	const price = Number(
		$("body > section > section > h2 > span.postingtitletext > span.price")
			.text()
			.replace("$", "")
	);

	const [beds, baths] = $(
		"body > section > section > section > div.mapAndAttrs > p:nth-child(2) > span:nth-child(1)"
	)
		.text()
		.replace(/br|ba/gi, "")
		.split(" / ")
		.map(Number);

	// TODO: sometimes catches available move in day instead of the size
	// look for if it doesn't have "housing_movein_now" class
	const size = $(
		"body > section > section > section > div.mapAndAttrs > p:nth-child(2) > span:nth-child(2)"
	).text();

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
