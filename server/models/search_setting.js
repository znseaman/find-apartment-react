const Sequelize = require("sequelize");
const User = require("./user");

const sequelize = require("../utils/database");
const { INTEGER, STRING } = Sequelize;
const SearchSetting = sequelize.define("search_setting", {
	id: {
		type: INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	type: STRING,
	base_host: STRING,
	city: STRING,
	category: STRING,
	has_pic: INTEGER,
	max_price: INTEGER,
	min_price: INTEGER,
	posted_today: INTEGER
});

// Relations
SearchSetting.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(SearchSetting);

module.exports = SearchSetting;
