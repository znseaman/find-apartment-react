const { Router } = require("express");
const hash = require("../../database/hash");
const pool = require("../../database/db");
const User = require("../../models/user");

const router = new Router();

router.post("/new", (req, res, next) => {
	const { username, password } = req.body;

	const username_hash = hash(username);
	const password_hash = hash(password);

	pool.query(
		"SELECT * FROM users WHERE username_hash = $1",
		[username_hash],
		async (error0, results0) => {
			if (error0) return next(error0);

			if (results0.rows.length === 0) {
				const user = await User.create({
					username_hash,
					password_hash
				});

				res.json({ msg: "Successfully created user!" });
			} else {
				res.status(409).json({
					type: "error",
					msg: "This username has been taken"
				});
			}
		}
	);
});

module.exports = router;
