const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const { INTEGER, STRING } = Sequelize;
const User = sequelize.define("user", {
	id: {
		type: INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: STRING,
	email: STRING,
	username: STRING,
	password: STRING,
	// TODO: move the below fields into a separate table
	base_host: STRING,
	city: STRING,
	category: STRING,
	has_pic: INTEGER,
	max_price: INTEGER,
	min_price: INTEGER,
	posted_today: INTEGER
});

module.exports = User;
