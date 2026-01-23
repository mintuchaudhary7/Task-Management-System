import api from "./axios";

export const getAllTasks = () => api.get("/tasks");

export const userTasks = (userId) => api.get(`/tasks/${userId}`);

export const updateTaskStatus = (taskId, newStatus) =>
  api.patch(`/tasks/${taskId}/status`, { status: newStatus });
