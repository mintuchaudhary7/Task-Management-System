import api from "./axios";

export const getAllTasks = () => api.get("/tasks");

export const userTasks = (userId) => api.get(`/tasks/${userId}`);

export const updateTaskStatus = (taskId, newStatus) =>
  api.patch(`/tasks/${taskId}/status`, { status: newStatus });

export const getTaskDetails = (taskId) => {
  return api.get(`/tasks/details/${taskId}`);
};
