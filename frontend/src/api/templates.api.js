import api from "./axios";

export const getAllTemplates = () => api.get("/templates");

export const createTemplate = (data) => api.post("/templates", data);
