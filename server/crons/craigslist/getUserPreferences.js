const User = require("../../models/user");

const getUserPreferences = async id => {
	const user = await User.findByPk(id);
	// TODO: handle error if no user is found
	const {
		city,
		base_host: baseHost,
		has_pic: hasPic,
		category,
		max_price: maxPrice,
		min_price: minPrice,
		posted_today: postedToday
	} = user;

	return {
		city,
		baseHost,
		hasPic,
		category,
		maxPrice,
		minPrice,
		postedToday
	};
};

module.exports = getUserPreferences;
