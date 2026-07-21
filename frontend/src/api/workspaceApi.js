import api from "./axios";

export const getMessages = (taskId) =>
  api.get(`/workspace/tasks/${taskId}/messages`);

export const sendMessage = (taskId, data) =>
  api.post(`/workspace/tasks/${taskId}/messages`, data);

export const markMessageRead = (id) =>
  api.patch(`/workspace/messages/${id}/read`);

export const uploadFile = (taskId, formData) =>
  api.post(`/workspace/tasks/${taskId}/files`, formData);

export const getFiles = (taskId) =>
  api.get(`/workspace/tasks/${taskId}/files`);

export const downloadFile = (id) =>
  api.get(`/workspace/files/${id}/download`);

export const archiveWorkspace = (taskId) =>
  api.patch(`/workspace/tasks/${taskId}/archive`);