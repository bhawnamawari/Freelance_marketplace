import api from "./axios";

export const getMatches = (taskId) =>
  api.get(`/matches/tasks/${taskId}/freelancers`);

export const getRecommendedTasks = () =>
  api.get("/matches/freelancers/me/tasks");

export const inviteFreelancer = (taskId, freelancerId) =>
  api.post(`/matches/tasks/${taskId}/invite/${freelancerId}`);

export const applyToTask = (taskId) =>
  api.post(`/matches/tasks/${taskId}/apply`);

export const selectFreelancer = (taskId, freelancerId) =>
  api.post(`/matches/tasks/${taskId}/select/${freelancerId}`);
