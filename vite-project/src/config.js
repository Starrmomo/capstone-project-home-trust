// src/config.js
export const API = import.meta.env.VITE_API_BASE_URL;

// Fallback to default API URL if environment variable is not set
// Ensure we always use the full backend URL, not a relative path
const envApiUrl = import.meta.env.VITE_API_BASE_URL;
export const API = envApiUrl && envApiUrl.startsWith('http') 
  ? envApiUrl 
  : "https://hometrust-backend.duckdns.org/api";

