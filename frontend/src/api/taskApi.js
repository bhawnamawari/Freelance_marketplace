import api from "./axios";

export const getCategories = () =>
  api.get("/tasks/categories");

export const createCategory = (data) =>
  api.post("/tasks/categories", data);

export const getTasks = (params) =>
  api.get("/tasks", { params });

export const getTask = (id) =>
  api.get(`/tasks/${id}`);

export const createTask = (data) =>
  api.post("/tasks", data);

export const updateTask = (id, data) =>
  api.patch(`/tasks/${id}`, data);

export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`);