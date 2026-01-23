import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true, // useful if using cookies
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
  (error) => Promise.reject(error)
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
  }
);

export default api;
