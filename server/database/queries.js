const util = require("util");
const Listing = require("../models/listing");
const pool = require("./db");
const PER_PAGE = 10;

const getUsers = (request, response) => {
	pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const getUserById = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const createUser = (request, response) => {
	const { name, email } = request.body;

	pool.query(
		"INSERT INTO users (name, email) VALUES ($1, $2)",
		[name, email],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(201).send(`User added with ID: ${result.insertId}`);
		}
	);
};

const updateUser = (request, response) => {
	const id = parseInt(request.params.id);
	const { name, email } = request.body;

	pool.query(
		"UPDATE users SET name = $1, email = $2 WHERE id = $3",
		[name, email, id],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).send(`User modified with ID: ${id}`);
		}
	);
};

const deleteUser = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).send(`User deleted with ID: ${id}`);
	});
};

function getPaginatedItems(items, offset) {
	return items.slice(offset, offset + PER_PAGE);
}

const getListings = async (req, res, next) => {
	const listings = await Listing.findAll();
	const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
	const nextOffset = offset + PER_PAGE;
	const previousOffset = offset - PER_PAGE < 0 ? 0 : offset - PER_PAGE;

	const meta = {
		limit: PER_PAGE,
		next: util.format("?limit=%s&offset=%s", PER_PAGE, nextOffset),
		offset: req.query.offset,
		previous: util.format("?limit=%s&offset=%s", PER_PAGE, previousOffset),
		total_count: listings.length
	};

	const json = {
		meta,
		listings: getPaginatedItems(listings, offset)
	};

	res.status(200).json(json);
};

const deleteListing = (req, res) => {
	const id = parseInt(req.params.id);

	pool.query("DELETE FROM listings WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw error;
		}
		res.status(200).send(`User deleted with ID: ${id}`);
	});
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	getListings,
	deleteListing
};
