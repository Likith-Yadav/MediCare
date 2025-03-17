import axios from 'axios';

// Use environment variable for API URL or default to local development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Create axios instance with the correct baseURL
const api = axios.create({
    baseURL: API_URL,
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