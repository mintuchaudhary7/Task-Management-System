import api from "./axios";

export const loginUser = (payload) => api.post("/users/login", payload);

export const signup = (payload) => api.post("/users/signup", payload);
