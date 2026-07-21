import api from "./axios";

export const addPortfolio = (data) =>
  api.post("/portfolio/portfolio", data);

export const updatePortfolio = (id, data) =>
  api.patch(`/portfolio/portfolio/${id}`, data);

export const getPortfolio = (id) =>
  api.get(`/portfolio/portfolio/${id}`);

export const submitRating = (taskId, data) =>
  api.post(`/portfolio/ratings/tasks/${taskId}`, data);

export const getRatings = (userId) =>
  api.get(`/portfolio/ratings/${userId}`);