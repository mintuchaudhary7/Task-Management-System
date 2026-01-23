import axios from "./axios";

export const getAdminStats = () => {
  return axios.get("/admin/stats");
};
