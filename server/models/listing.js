const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const { INTEGER, STRING, DOUBLE, TEXT, DATE, GEOMETRY } = Sequelize;
const Listing = sequelize.define("listing", {
	id: {
		type: INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	description: {
		type: TEXT,
		allowNull: false
	},
	pid: STRING,
	title: STRING,
	url: STRING,
	imageUrls: {
		type: TEXT,
		allowNull: false
	},
	// images: {
	//     type: STRING,
	//     allowNull: false
	// },
	latitude: STRING,
	longitude: STRING,
	point: GEOMETRY("POINT", 4326),
	zoom: INTEGER,
	postedAt: DATE,
	polygon_name: STRING
});

module.exports = Listing;
