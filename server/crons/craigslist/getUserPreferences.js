const SearchSetting = require("../../models/search_setting");

const getUserPreferences = async id => {
	const search_setting = await SearchSetting.findOne({
		where: {
			userId: id
		}
	});

	// TODO: handle error if no user is found
	// TODO: create a function that converts between snake_case & camelCase
	const {
		type,
		city,
		base_host: baseHost,
		has_pic: hasPic,
		category,
		max_price: maxPrice,
		min_price: minPrice,
		posted_today: postedToday
	} = search_setting;

	return {
		type,
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
