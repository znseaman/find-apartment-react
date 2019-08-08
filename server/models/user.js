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
	username_hash: STRING(64),
	password_hash: STRING(64),
	session_id: STRING(36)
});

module.exports = User;
