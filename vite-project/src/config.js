// src/config.js
// Fallback to default API URL if environment variable is not set
export const API = import.meta.env.VITE_API_BASE_URL || "https://hometrust-backend.duckdns.org/api";