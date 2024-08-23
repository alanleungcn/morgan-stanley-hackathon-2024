import axios from "axios";

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACCKEND_BASE_URL}`,
});

export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  OPTIONS: "OPTIONS",
} as const;
