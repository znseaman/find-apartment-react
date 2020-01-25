const { Router } = require("express");
const hash = require("../../utils/hash");
const pool = require("../../database/db");
const Session = require("../../utils/session");
const SearchSetting = require("../../models/search_setting");

const router = Router();

router.get("/", (req, res, next) => {
	const { session_str } = req.cookies;
	// Check that the email and id are valid
	const { email, id } = Session.parse(session_str);
	pool.query(
		"SELECT * FROM users WHERE email = $1",
		[email],
		async (q_error, q_results) => {
			if (q_error) return next(q_error);

			// if authenticated, go ahead and find search settings for user
			if (
				Session.verify(session_str) &&
				q_results.rows[0].session_id === id
			) {
				const search_settings = await SearchSetting.findOne({
					where: {
						userId: q_results.rows[0].id
					}
				});

				res.status(200).json(search_settings);
			} else {
				// TODO: this should redirect to the logout page since the cookie isn't valid anymore
				// also, this could be used an attack vector and is some information for malicious actors by sending back such an error
				return next(new Error("Invalid query"));
			}
		}
	);
});

router.post("/edit", (req, res, next) => {
	const { has_pic, min_price, max_price, posted_today } = req.body;

	const { session_str } = req.cookies;
	// Check that the email and id are valid
	const { email, id } = Session.parse(session_str);
	pool.query(
		"SELECT * FROM users WHERE email = $1",
		[email],
		async (q_error, q_results) => {
			if (q_error) return next(q_error);

			// if authenticated, go ahead and replace search settings for user
			if (
				Session.verify(session_str) &&
				q_results.rows[0].session_id === id
			) {
				const result = await SearchSetting.update(
					{
						has_pic,
						min_price,
						max_price,
						posted_today
					},
					{ where: { userId: q_results.rows[0].id } }
				);

				res.status(200).json(result);
			} else {
				// TODO: this should redirect to the logout page since the cookie isn't valid anymore
				// also, this could be used an attack vector and is some information for malicious actors by sending back such an error
				return next(new Error("Invalid query"));
			}
		}
	);
});

module.exports = router;
