import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useUserService } from '../services/user.service';

// Base API URL
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  withCredentials: true,
});

// Request interceptor: attach access token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// List of endpoints where we don't want to trigger token refresh
const skipRefreshRoutes = ['/user/signin', '/user/signup', '/user/refresh-token'];

// Response interceptor: handle 401 errors and attempt token refresh if applicable
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isUnauthorized = error.response?.status === 401;
    const isSkippable = skipRefreshRoutes.some((route) =>
      originalRequest.url?.includes(route)
    );

    if (isUnauthorized && !isSkippable) {
      const { refreshAccessToken } = useUserService();

      try {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          localStorage.setItem('token', newAccessToken);
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest); // Retry original request
        } else {
          // Refresh failed
          toast.error('Session expired. Please log in again.');
          localStorage.removeItem('token');
        }
      } catch (refreshError) {
        console.error('Token refresh error:', refreshError);
        toast.error('Error refreshing session. Please log in again.');
        localStorage.removeItem('token');
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
