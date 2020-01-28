import axios from "axios";
import { CONNECTION } from "../config";
import { auth } from "../components/Auth/Auth";
const baseURL = CONNECTION;

const instance = axios.create({
  baseURL
});

instance.interceptors.response.use(res => res.data, error => {
  if (error.response && error.response.status == 401) {
    auth.logout();
    return false;
  }

  return Promise.reject(error.response);
});

export default instance;