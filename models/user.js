const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const { INTEGER, STRING } = Sequelize;

const hash = require("../utils/hash");

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
}, {
	hooks: {
		beforeCreate(user) {
			user.password = hash(user.password)
		}
	}
});

/* Instance Methods */
User.prototype.verifyPassword = function (password) {
	return this.password == hash(password);
}

module.exports = User;
