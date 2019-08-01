import React, { useState } from "react";
import classes from "./App.module.css";

import Layout from "../hoc/Layout/Layout";

import Listings from "../components/Listings/Listings";
import SimpleMap from "../components/SimpleMap/SimpleMap";

const App = () => {
	const [viewType] = useState("list");

	const hasMap = viewType === "map";
	const view = hasMap ? (
		<SimpleMap />
	) : (
		<>
			<Listings perPage={10}></Listings>
		</>
	);

	return (
		<div className={classes.App}>
			<header className={classes["App-header"]}>
				<Layout hasMap={hasMap}>{view}</Layout>
			</header>
		</div>
	);
};

export default App;
