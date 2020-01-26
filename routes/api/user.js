const { Router } = require("express");
const hash = require("../../utils/hash");
const pool = require("../../database/db");
const User = require("../../models/user");
const Session = require("../../utils/session");

const router = Router();

router.get("/logout", (req, res, next) => {
	const { email } = Session.parse(req.cookies.session_str);

	pool.query(
		"UPDATE users SET session_id = NULL WHERE email = $1",
		[email],
		(q_error, q_results) => {
			if (q_error) return next(q_error);

			res.clearCookie("session_str");
			res.json({ msg: "Successful logout" });
		}
	);
});

router.get("/authenticated", (req, res, next) => {
	const { email, id } = Session.parse(req.cookies.session_str);

	pool.query(
		"SELECT * FROM users WHERE email = $1",
		[email],
		(q_error, q_results) => {
			if (q_error) return next(q_error);

			res.json({
				authenticated:
					Session.verify(req.cookies.session_str) &&
					q_results.rows[0] && q_results.rows[0].session_id === id
			});
		}
	);
});

module.exports = router;
