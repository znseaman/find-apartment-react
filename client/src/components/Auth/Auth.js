import history from "../../utils/history";
import { CONNECTION } from "../../config";
import axios from "axios";

class Auth {
	loggedIn = false;

	authenticate = async (username, password, type) => {
		fetch(`${CONNECTION}/user/${type}`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ username, password })
		})
			.then(response => response.json())
			.then(json => {
				if (json.type === "error") {
					alert(json.msg);
				} else {
					this.loggedIn = true;
					history.replace("/");
				}
			});
	};

	// TODO: modify to use currying
	signup = (username, password) => {
		this.authenticate(username, password, "new");
	};

	// TODO: modify to use currying
	login = (username, password) => {
		this.authenticate(username, password, "login");
	};

	logout = () => {
		axios
			.get(`${CONNECTION}/user/logout`, {
				withCredentials: true
			})
			.then(response => response.data)
			.then(() => {
				this.loggedIn = false;
				history.replace("/login");
			});
	};

	checkAuthentication = async () => {
		return axios
			.get(`${CONNECTION}/user/authenticated`, {
				withCredentials: true
			})
			.then(response => response.data)
			.then(data => {
				if (data.authenticated) {
					this.loggedIn = true;
				}
			})
			.catch(error => {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.log(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log("Error", error.message);
				}
				console.log(error.config);
			});
	};
}

export const auth = new Auth();
