import api from "./axios";

export const getAllInstances = () => api.get("/instances");

export const createInstance = (data) => {
  return api.post("/instances", data);
};

export const getInstanceById = (id) => {
  return api.get(`/instances/${id}`);
};

export const getMyInstances = async () => {
  return await api.get("/instances/my-instances");
};
