import axios, { isAxiosError } from "axios";
import { clearToken, getToken } from "./token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error) && error.response?.status === 401 && getToken()) {
      clearToken();
      window.dispatchEvent(new Event("auth:logout"));
    }
    return Promise.reject(error);
  }
);