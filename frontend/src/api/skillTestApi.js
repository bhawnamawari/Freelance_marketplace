import api from "./axios";

export const getTests = () =>
  api.get("/skill-tests");

export const createTest = (data) =>
  api.post("/skill-tests", data);

export const getMyAttempts = () =>
  api.get("/skill-tests/attempts/me");

export const gradeAttempt = (id, data) =>
  api.patch(`/skill-tests/attempts/${id}/grade`, data);

export const getTest = (skill) =>
  api.get(`/skill-tests/${skill}`);

export const submitAttempt = (id, data) =>
  api.post(`/skill-tests/${id}/attempts`, data);
