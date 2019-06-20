// TODO: move this to a config.json or some other external file so as not to be hacked
const Pool = require("pg").Pool;
const pool = new Pool({
	user: "me",
	host: "localhost",
	database: "find_apartment_react",
	password: "password",
	port: 5432
});

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

const getListings = (req, res, next) => {
	// get them by user_id
	pool.query(`SELECT * FROM listings ORDER BY id ASC`, (error, results) => {
		if (error) {
			throw error;
		}
		res.status(200).json(results.rows);
	});
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
