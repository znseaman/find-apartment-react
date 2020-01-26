const { Router } = require("express");
const util = require("util");
const Listing = require("../../models/listing");
const PER_PAGE = 50;

const router = Router();

function getPaginatedItems(items, offset) {
	return items.slice(offset, offset + PER_PAGE);
}

router.get("/all", async (req, res, next) => {
	const { user } = req;
	let order;
	if (req.query.orderBy && req.query.order) {
		order = [[req.query.orderBy, req.query.order]]
	}
	const listings = await Listing.findAll({
		where: {
			userId: user.id
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
});

router.delete("/:id", async (req, res, next) => {
	const { id: userId } = req.user;
	const id = Number(req.params.id);

	try {
		await Listing.destroy({
			where: {
				id,
				userId
			}
		});
		res.status(200).json({ id });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
