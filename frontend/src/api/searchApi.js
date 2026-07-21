import api from "./axios";

export const searchTasks = (params) =>
  api.get("/search/tasks", { params });

export const searchFreelancers = (params) =>
  api.get("/search/freelancers", { params });

export const getTrending = () =>
  api.get("/search/trending");

export const saveSearch = (data) =>
  api.post("/search/saved", data);

export const getSavedSearches = () =>
  api.get("/search/saved");