import axios from 'axios';

// Define the base URL for the backend API
// Assuming the backend runs on port 5000 locally
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for sending session cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for handling errors or adding auth tokens globally
// apiClient.interceptors.response.use(
//   response => response,
//   error => {
//     // Handle errors globally (e.g., redirect on 401)
//     if (error.response && error.response.status === 401) {
//       // Maybe redirect to login page
//       console.error('Unauthorized, redirecting to login...');
//       // window.location.href = '/login'; 
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;

