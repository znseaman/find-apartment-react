import React, { useState } from "react";
import classes from "./App.module.css";

import Layout from "../hoc/Layout/Layout";

import Listings from "../components/Listings/Listings";
import SimpleMap from "../components/SimpleMap/SimpleMap";

const App = () => {
	const [viewType] = useState("list");

	const view = viewType === "map" ? <SimpleMap /> : <Listings></Listings>;

	return (
		<div className={classes.App}>
			<header className={classes["App-header"]}>
				<Layout>{view}</Layout>
			</header>
		</div>
	);
};

export default App;
