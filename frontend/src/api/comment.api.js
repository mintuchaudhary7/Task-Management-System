import api from "./axios";

export const addComment = async (taskId, message) => {
  return await api.post(`/comments/${taskId}`, { message });
};

export const getTaskComments = async (taskId) => {
  return await api.get(`/comments/${taskId}`);
};
