// src/config.js

// Get API from environment variable
const envApiUrl = import.meta.env.VITE_API_BASE_URL;

// Export a single API constant with fallback
export const API = envApiUrl && envApiUrl.startsWith("http")
  ? envApiUrl
  : "https://hometrust-backend.duckdns.org/api";