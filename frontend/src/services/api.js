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

import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // --- ADD THESE LINES FOR DEBUGGING ---
    console.log('--- Axios Interceptor Fired ---');
    const token = localStorage.getItem('token');
    console.log('Token Found in localStorage:', token);
    // -----------------------------------------

    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;