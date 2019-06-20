const express = require("express");
// const mongodb = require("mongodb");

const router = express.Router();

// Get Listings
// router.get("/listings", async (req, res, next) => {
// 	const posts = await loadListingsCollection();
// 	res.send(await posts.find({}).toArray());
// });

// Add Listing
// router.post("/", async (req, res, next) => {
// 	const posts = await loadListingsCollection();
// 	const { text } = req.body;
// 	await posts.insertOne({
// 		text,
// 		createdAt: new Date()
// 	});

// 	res.status(201).send();
// });

// // Delete Listing
// router.delete("/:id", async (req, res, next) => {
// 	const posts = await loadListingsCollection();
// 	await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
// 	res.status(200).send();
// });

// async function loadListingsCollection() {
// 	// TODO:
// 	// (1) connect to pg

// 	const client = await mongodb.MongoClient.connect(
// 		// 	// MongoDB Atlas
// 		// 	// "mongodb+srv://znseaman:1pPuxA9562M$H4VE9u@cluster0-7psu1.mongodb.net/test?retryWrites=true",
// 		"postgres://pwjycdnn:3at9AIgDsQpgp1hBa_qyxS-ZCTU2SieA@hanno.db.elephantsql.com:5432/pwjycdnn",
// 		{ useNewUrlParser: true }
// 	);

// 	return client.db("fullstack_vue_express").collection("posts");
// 	// return client.db("vue_express").collection("posts");
// }

module.exports = router;
