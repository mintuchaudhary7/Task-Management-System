import axios from "axios";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://task-management-system-gt9h.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

/* REQUEST INTERCEPTOR */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* RESPONSE INTERCEPTOR */
api.interceptors.response.use(
  (response) => response.data, // always return data only
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // optional: logout user
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error.response?.data || error.message);
  },
);

export default api;
