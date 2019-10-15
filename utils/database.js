const Sequelize = require("sequelize");
const { Op } = Sequelize;
const {
	and: $and,
	or: $or,
	eq: $eq,
	gt: $gt,
	lt: $lt,
	lte: $lte,
	like: $like
} = Op;

const { database, user, password, host } = require("../secrets/db_config");
// Sets up a connection pool
const sequelize = new Sequelize(database, user, password, {
	dialect: "postgres",
	host,
	operatorsAliases: {
		$and,
		$or,
		$eq,
		$gt,
		$lt,
		$lte,
		$like
	},
	logging: false
});

module.exports = sequelize;
