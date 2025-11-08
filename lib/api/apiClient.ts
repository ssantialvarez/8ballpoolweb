import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5234/api';

const apiClient: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token if available
apiClient.interceptors.request.use(
    (config) => {
        /*
        // Add authorization header if token exists (e.g., from localStorage or context)
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        */
        console.log('Request Config:', config);
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        // Handle common errors globally (e.g., 401 for unauthorized)
        if (error.response?.status === 401) {
            // Redirect to login or clear token
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        // Log error or show toast notification
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default apiClient;