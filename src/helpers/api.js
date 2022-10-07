import axios from "axios";
import { API_BASE_URL } from "../stories/Constant";

const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

AxiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem("token");
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

export default AxiosInstance;
