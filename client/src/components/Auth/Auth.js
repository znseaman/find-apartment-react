import history from "../../utils/history";
import axiosConfig from "../../shared/axios";

class Auth {
	loggedIn = false;

	authenticate = type => async (email, password) => (
		axiosConfig.post(`/${type}`, { email, password })
			.then(data => {
				this.loggedIn = true;
				history.replace("/");
			})
	);

	logout = () => (
		axiosConfig
			.get(`/user/logout`)
			.then(() => {
				this.loggedIn = false;
				history.replace("/login");
			})
	)

	checkAuthentication = async () => (
		axiosConfig
			.get(`/authenticated`)
			.then(data => {
				if (data && data.authenticated) {
					this.loggedIn = true;
				}
			})
	)
}

export const auth = new Auth();
