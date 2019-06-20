// TODO: put this in a User model
//          have this be specified when the user updates their search preferences
const baseHost = "craigslist.ca";
const city = "Vancouver";

const category = "apa";
const hasPic = "1";
const maxPrice = "2000";
const minPrice = "1000";
const postedToday = 1;

// TODO: put this in a User model
//      have this be specified when the user updates their search preferences
const userPreferences = {
	city,
	baseHost,
	hasPic,
	category,
	maxPrice,
	minPrice,
	postedToday
};

module.exports = userPreferences;
