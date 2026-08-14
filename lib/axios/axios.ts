import axios from "axios";

/**
 * Axios Client
 *
 * Shared Axios instance used for all HTTP requests.
 *
 * Responsibilities:
 * - Configures the application's base API URL.
 * - Automatically attaches the authentication token.
 * - Centralizes request and response configuration.
 *
 * Relationship with the application:
 * - Used by every API function.
 * - Reads the authentication token from local storage.
 * - Ensures authenticated requests include the
 *   Authorization header.
 */
export const api = axios.create({
  baseURL: "",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },

  timeout: 10000,
});

/**
 * Request Interceptor
 *
 * Automatically attaches the JWT token before
 * sending any authenticated request.
 */
api.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem("auth-storage");

  if (!authStorage) {
    return config;
  }

  try {
    const { state } = JSON.parse(authStorage);

    if (state?.token) {
      config.headers.Authorization = `Bearer ${state.token}`;
    }
  } catch (error) {
    console.error("Invalid auth storage format.", error);
  }

  return config;
});

/**
 * Response Interceptor
 *
 * Returns successful responses as-is and forwards
 * failed requests to React Query.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);