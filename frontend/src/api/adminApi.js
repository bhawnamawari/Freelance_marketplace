import api from "./axios";

export const updateUserStatus = (id, data) =>
  api.patch(`/admin/users/${id}/status`, data);

export const updateCategory = (id, data) =>
  api.patch(`/admin/categories/${id}`, data);

export const deleteCategory = (id) =>
  api.delete(`/admin/categories/${id}`);

export const getAnalytics = () =>
  api.get("/admin/analytics");

export const getFlaggedContent = () =>
  api.get("/admin/flagged");

export const overrideDispute = (id, data) =>
  api.patch(`/admin/disputes/${id}/override`, data);