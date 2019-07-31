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

// Sets up a connection pool
const sequelize = new Sequelize("find_apartment_react", "me", "password", {
	dialect: "postgres",
	host: "localhost",
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
