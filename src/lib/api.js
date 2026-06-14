import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const TOKEN_KEY = 'lp_token';
export const REFRESH_KEY = 'lp_refresh';
export const USER_KEY = 'lp_user';

/**
 * Single axios instance for the whole app.
 * Backend wraps every response as { success, message, data }.
 * Interceptors below unwrap `data` and handle JWT refresh on 401.
 */
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let queue = [];

const processQueue = (error, token = null) => {
  queue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  queue = [];
};

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

api.interceptors.response.use(
  // Unwrap the ApiResponse envelope: return the `data` payload directly.
  (response) => {
    const body = response.data;
    if (body && typeof body === 'object' && 'success' in body && 'data' in body) {
      return body.data;
    }
    return body;
  },
  async (error) => {
    const original = error.config;
    const status = error.response?.status;
    const refreshToken = localStorage.getItem(REFRESH_KEY);

    // Try a single refresh on 401 (but never for the auth endpoints themselves).
    const isAuthCall = original?.url?.includes('/auth/');
    if (status === 401 && refreshToken && !original._retry && !isAuthCall) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => queue.push({ resolve, reject }))
          .then((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            return api(original);
          });
      }
      original._retry = true;
      isRefreshing = true;
      try {
        const res = await axios.post(`${API_BASE_URL}/api/auth/refresh`, { refreshToken });
        const payload = res.data?.data ?? res.data;
        const newToken = payload.token;
        localStorage.setItem(TOKEN_KEY, newToken);
        if (payload.refreshToken) localStorage.setItem(REFRESH_KEY, payload.refreshToken);
        processQueue(null, newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        clearAuth();
        if (!window.location.pathname.startsWith('/admin/login')) {
          window.location.assign('/admin/login');
        }
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default api;
