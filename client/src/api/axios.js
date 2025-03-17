import axios from 'axios';

// Define API URLs
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const CLOUDFLARE_API_URL = 'https://medicare-api.likithmvjce.workers.dev';

// Determine which URL to use based on environment
const baseURL = process.env.NODE_ENV === 'production' ? CLOUDFLARE_API_URL : API_URL;

// Create axios instance
const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance; 