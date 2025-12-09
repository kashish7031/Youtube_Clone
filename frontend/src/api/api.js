// frontend/src/api/api.js
import axios from "axios";

/**
 * Frontend axios instance.
 * VITE_API_URL should be defined in frontend/.env (e.g. VITE_API_URL=http://localhost:5000/api)
 * If missing, defaults to http://localhost:5000/api
 */
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 10000, // optional
});

// helper to set Authorization header later if needed
export const setAuthToken = (token) => {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
};

export default api;
