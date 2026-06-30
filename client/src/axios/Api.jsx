import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Api = axios.create({
  baseURL: BASE_URL + "/web",
});

Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => Promise.reject(error));

export default Api;