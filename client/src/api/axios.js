import axios from 'axios';

// Use environment variable for API URL or default to local development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// For Cloudflare deployment, we'll use the Worker URL
const CLOUDFLARE_API_URL = 'https://medicare-api.likithmvjce.workers.dev';

// Determine which URL to use based on environment
const baseURL = process.env.NODE_ENV === 'production' 
  ? CLOUDFLARE_API_URL 
  : API_URL;

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to include the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api; 