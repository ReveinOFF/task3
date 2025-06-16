import axios from "axios";

const api = axios.create({
  baseURL: "https://jsearch.p.rapidapi.com",
});

api.interceptors.request.use((config) => {
  config.headers["x-rapidapi-key"] = process.env.NEXT_PUBLIC_API_KEY || "";
  config.headers["x-rapidapi-host"] = process.env.NEXT_PUBLIC_API_HOST || "";
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default api;
