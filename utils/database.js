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

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
// Sets up a connection pool
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	dialect: "postgres",
	host: DB_HOST,
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
