import axios from "axios";
const BASE_API_URL = "https://citizen-rapporteur-api.herokuapp.com";
const AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
});

AxiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem("token");
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

export default AxiosInstance;