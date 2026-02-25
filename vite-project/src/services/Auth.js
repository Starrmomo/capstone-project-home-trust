import { API } from "../config";

/**
 * Auth API Service
 * Handles all authentication-related API calls
 */

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} - { token, user } or error
 */
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout user (clears token from localStorage)
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/**
 * Get stored token
 * @returns {string|null} - Token or null
 */
export const getStoredToken = () => {
  return localStorage.getItem("token");
};

/**
 * Store token
 * @param {string} token - Auth token
 */
export const storeToken = (token) => {
  localStorage.setItem("token", token);
};

/**
 * Store user data
 * @param {Object} user - User data
 */
export const storeUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

/**
 * Get stored user
 * @returns {Object|null} - User data or null
 */
export const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
