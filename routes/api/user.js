const { Router } = require("express");
const pool = require("../../database/db");
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

module.exports = router;
