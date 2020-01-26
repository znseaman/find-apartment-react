import history from "../../utils/history";
import { CONNECTION } from "../../config";
import axiosConfig from "../../shared/axios";

class Auth {
	loggedIn = false;

	authenticate = async (email, password, type) => {
		axiosConfig.post(`${CONNECTION}/${type}`, { email, password }, { withCredentials: true })
			.then(data => {
				this.loggedIn = true;
				history.replace("/");
			});
	};

	// TODO: modify to use currying
	signup = (email, password) => {
		this.authenticate(email, password, "signup");
	};

	// TODO: modify to use currying
	login = (email, password) => {
		this.authenticate(email, password, "login");
	};

	logout = () => {
		axiosConfig
			.get(`${CONNECTION}/user/logout`, {
				withCredentials: true
			})
			.then(() => {
				this.loggedIn = false;
				history.replace("/login");
			});
	};

	checkAuthentication = async () => {
		return axiosConfig
			.get(`${CONNECTION}/authenticated`, {
				withCredentials: true
			})
			.then(data => {
				if (data && data.authenticated) {
					this.loggedIn = true;
				}
			});
	};
}

export const auth = new Auth();
