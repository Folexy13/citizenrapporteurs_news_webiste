import axios from "axios";
const BASE_API_URL = "https://cr-news-api.herokuapp.com";
// const BASE_API_URL = "http://localhost:8080"

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
