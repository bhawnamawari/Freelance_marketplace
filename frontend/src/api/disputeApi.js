import api from "./axios";

export const getDisputes = () =>
  api.get("/disputes");

export const raiseDispute = (taskId, data) =>
  api.post(`/disputes/tasks/${taskId}`, data);

export const getDispute = (id) =>
  api.get(`/disputes/${id}`);

export const addEvidence = (id, data) =>
  api.post(`/disputes/${id}/evidence`, data);

export const resolveDispute = (id, data) =>
  api.patch(`/disputes/${id}/resolve`, data);

export const closeDispute = (id) =>
  api.patch(`/disputes/${id}/close`);