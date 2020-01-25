const { Router } = require("express");
const hash = require("../../utils/hash");
const pool = require("../../database/db");
const User = require("../../models/user");
const Session = require("../../utils/session");

const router = Router();

const set_session_cookie = (session_str, res) => {
	res.cookie("session_str", session_str, {
		// TODO: express this through date-fns to be more precise for maintenance
		expire: Date.now() + 3600000,
		httpOnly: true,
		secure: false // use with https for a secure cookie (set to true when using https)
	});
};

const set_session = (email, res, session_id) => {
	let session;
	let session_str;

	if (session_id) {
		session_str = Session.dataToString(email, session_id);
	} else {
		session = new Session(email);
		session_str = session.toString();
	}

	return new Promise((resolve, reject) => {
		if (session_id) {
			set_session_cookie(session_str, res);
			resolve();
		} else {
			pool.query(
				"UPDATE users SET session_id = $1 WHERE email = $2",
				[session.id, email],
				(q_error, q_result) => {
					if (q_error) return reject(q_error);
					set_session_cookie(session_str, res);
					resolve();
				}
			);
		}
	});
};

router.post("/new", (req, res, next) => {
	const { email, password } = req.body;

	pool.query(
		"SELECT * FROM users WHERE email = $1",
		[email],
		async (error0, results0) => {
			if (error0) return next(error0);

			if (results0.rows.length === 0) {
				const user = await User.create({
					email,
					password: hash(password)
				});

				// setup initial search settings for new user
				const {
					city,
					baseHost: base_host,
					hasPic: has_pic,
					category,
					maxPrice: max_price,
					minPrice: min_price,
					postedToday: posted_today
				} = require("../../utils/userPreferences");
				const userPreferences = {
					type: "craigslist",
					base_host,
					city,
					category,
					has_pic,
					max_price,
					min_price,
					posted_today,
					userId: user.id
				};

				// make them just a little different from the default
				userPreferences.min_price = 4000;
				userPreferences.max_price = 5000;

				const SearchSetting = require("../../models/search_setting");
				const search_setting = await SearchSetting.create(
					userPreferences
				);

				set_session(email, res)
					.then(() => {
						res.json({ msg: "Successfully created user!" });
					})
					.catch(error => {
						next(error);
					});
			} else {
				res.status(409).json({
					type: "error",
					msg: "This email has been taken"
				});
			}
		}
	);
});

router.post("/login", (req, res, next) => {
	const { email, password } = req.body;

	pool.query(
		"SELECT * FROM users WHERE email = $1",
		[email],
		(q_error, results) => {
			if (q_error) return next(q_error);

			const user = results.rows[0];

			if (user && user.password === hash(password)) {
				set_session(email, res, user.session_id)
					.then(() => {
						res.json({ msg: "Successful login!" });
					})
					.catch(error => {
						next(error);
					});
			} else {
				res.status(400).json({
					type: "error",
					msg: "Incorrect email/password"
				});
			}
		}
	);
});

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
					q_results.rows[0].session_id === id
			});
		}
	);
});

module.exports = router;
