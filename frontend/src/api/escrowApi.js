import api from "./axios";

export const createMilestones = (taskId, data) =>
  api.post(`/escrow/tasks/${taskId}/milestones`, data);

export const getMilestones = (taskId) =>
  api.get(`/escrow/tasks/${taskId}/milestones`);

export const getTransactions = (taskId) =>
  api.get(`/escrow/tasks/${taskId}/transactions`);

export const fundMilestone = (id) =>
  api.post(`/escrow/milestones/${id}/fund`);

export const submitMilestone = (id) =>
  api.post(`/escrow/milestones/${id}/submit`);

export const releaseMilestone = (id) =>
  api.post(`/escrow/milestones/${id}/release`);

export const refundMilestone = (id) =>
  api.post(`/escrow/milestones/${id}/refund`);