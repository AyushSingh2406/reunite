// import axios from 'axios';

// const api = axios.create({
//   baseURL: '/api', // The proxy will handle routing to localhost:5000
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// /**
//  * This is the critical part. This code runs BEFORE every API request is sent.
//  * It finds the token in localStorage and adds it to the request header
//  * with the exact name the backend is expecting: 'x-auth-token'.
//  */
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['x-auth-token'] = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;

// src/services/api.js

// src/services/api.js



// import axios from 'axios';
// import authService from './authService';

// // Create a central Axios instance
// const api = axios.create({
//   baseURL: '/api',
//   // DO NOT set a global Content-Type header here.
// });

// // Request interceptor to add the auth token to headers
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['x-auth-token'] = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle token errors
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       authService.logout();
//       window.location.reload();
//       alert('Your session has expired. Please log in again.');
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;




import axios from 'axios';
import authService from './authService'; // Import authService to use the logout function

// Create a central Axios instance for your live backend
const api = axios.create({
  baseURL: 'https://reunite-vh55.onrender.com/api',
  // We do not set a global Content-Type header, so Axios can handle
  // both JSON and file uploads automatically.
});

// Request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to automatically handle expired tokens (401 errors)
api.interceptors.response.use(
  (response) => {
    // If the request was successful, just return the response
    return response;
  },
  (error) => {
    // Check if the error is a 401 Unauthorized (which means the token is invalid)
    if (error.response && error.response.status === 401) {
      // If the token is invalid, log the user out
      authService.logout();
      // Reload the page to reset the application state
      window.location.reload();
      // You can also show a message to the user
      alert('Your session has expired. Please log in again.');
    }
    // For all other errors, just pass them along
    return Promise.reject(error);
  }
);

export default api;
