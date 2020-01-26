const { Router } = require("express");
const Session = require("../../utils/session");
const User = require("../../models/user");

const router = Router();

router.get("/logout", async (req, res, next) => {
	const { email, id: session_id } = Session.parse(req.cookies.session_str);

	try {
		await User.update({
			session_id: null
		},
			{
				where: {
					email, session_id
				}
			});

		res.clearCookie("session_str");
		res.json({ msg: "Successful logout" })
	} catch (error) {
		next(error);
	}
});

module.exports = router;
