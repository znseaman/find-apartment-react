import axios from "axios";
import { auth } from "../components/Auth/Auth";
import config from "../config/index";
const { SERVER_URL: baseURL } = config;

const instance = axios.create({
  baseURL,
  withCredentials: true
});

instance.interceptors.response.use(res => res.data, error => {
  if (error.response && error.response.status == 401) {
    auth.logout();
    return false;
  }

  return Promise.reject(error.response);
});

export default instance;