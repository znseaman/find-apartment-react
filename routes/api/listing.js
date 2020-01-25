const { Router } = require("express");
const util = require("util");
const Listing = require("../../models/listing");
const pool = require("../../database/db");
const PER_PAGE = 50;
const Session = require("../../utils/session");

const router = Router();

function getPaginatedItems(items, offset) {
	return items.slice(offset, offset + PER_PAGE);
}

router.get("/all", async (req, res, next) => {
	const { session_str } = req.cookies;
	// Check that the email and id are valid
	const { email, id } = Session.parse(session_str);
	pool.query(
		"SELECT * FROM users WHERE email = $1",
		[email],
		async (q_error, q_results) => {
			if (q_error) return next(q_error);

			// if authenticated, go ahead and find all listings
			if (Session.verify(session_str) && q_results.rows[0].session_id === id) {
				let order;
				if (req.query.orderBy && req.query.order) {
					order = [[req.query.orderBy, req.query.order]]
				}
				const listings = await Listing.findAll({
					where: {
						userId: q_results.rows[0].id
					},
					order
				});
				const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
				const nextOffset = offset + PER_PAGE;
				const previousOffset = offset - PER_PAGE < 0 ? 0 : offset - PER_PAGE;

				const meta = {
					limit: PER_PAGE,
					next: util.format("?limit=%s&offset=%s", PER_PAGE, nextOffset),
					offset: req.query.offset,
					previous: util.format(
						"?limit=%s&offset=%s",
						PER_PAGE,
						previousOffset
					),
					total_count: listings.length
				};

				const json = {
					meta,
					listings: getPaginatedItems(listings, offset)
				};

				res.status(200).json(json);
			} else {
				// TODO: this should redirect to the logout page since the cookie isn't valid anymore
				// also, this could be used an attack vector and is some information for malicious actors by sending back such an error
				return next(new Error("Invalid email"));
			}
		}
	);
});

router.delete("/:id", (req, res, next) => {
	const id = Number(req.params.id);

	pool.query("DELETE FROM listings WHERE id = $1", [id], (error, results) => {
		if (error) return next(error);
		res.status(200).send(`User deleted with ID: ${id}`);
	});
});

module.exports = router;
