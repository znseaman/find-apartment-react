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
	email: STRING,
	password: STRING(64),
	session_id: STRING(36)
});

module.exports = User;
