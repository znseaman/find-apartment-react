import { useState, useEffect } from "react";
import { updateObject } from "../shared/updateObject";
import { CONNECTION } from "../config";
import { auth } from "../components/Auth/Auth";

export default () => {
	const [searchSettings, setSearchSettings] = useState({
		has_pic: {
			elementType: "select",
			elementConfig: {
				options: [{ value: 1, text: "Yes" }, { value: 0, text: "No" }]
			},
			value: 1,
			label: "Has Pic"
		},
		min_price: {
			elementType: "input",
			elementConfig: {
				type: "text"
			},
			value: "",
			label: "Min Price"
		},
		max_price: {
			element: "input",
			elementConfig: {
				type: "text"
			},
			value: "",
			label: "Max Price"
		},
		posted_today: {
			elementType: "select",
			elementConfig: {
				options: [{ value: 1, text: "Yes" }, { value: 0, text: "No" }]
			},
			value: 1,
			label: "Posted Today"
		}
	});

	useEffect(() => {
		async function fetchData() {
			const url = new URL(`${CONNECTION}/search_setting`);
			try {
				const data = await fetch(url, { credentials: "include" })
					.then(response => response.json())

				if (data) {
					const { has_pic, min_price, max_price, posted_today } = data;
					const updatedSearchSettings = updateObject(searchSettings, {
						has_pic: updateObject(searchSettings["has_pic"], {
							value: has_pic
						}),
						min_price: updateObject(searchSettings["min_price"], {
							value: min_price
						}),
						max_price: updateObject(searchSettings["max_price"], {
							value: max_price
						}),
						posted_today: updateObject(searchSettings["posted_today"], {
							value: posted_today
						})
					});

					setSearchSettings(updatedSearchSettings);
				}
			} catch (error) {
				auth.logout();
			}
		}

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return [searchSettings, setSearchSettings];
};
