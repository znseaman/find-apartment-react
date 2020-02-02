const SearchSetting = require("../../models/search_setting");

const getUserPreferences = async userId => {
	try {
		const search_setting = await SearchSetting.findOne({
			where: {
				userId
			}
		});

		if (!search_setting) {
			return Promise.reject(`No search settings found for userId: ${userId}`);
		}

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
	} catch (error) {
		throw error;
	}
};

module.exports = getUserPreferences;
