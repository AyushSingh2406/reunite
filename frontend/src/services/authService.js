// import api from './api'; // Import the new centralized api

// const signup = (username, email, password) => {
//   return api.post('/auth/signup', { username, email, password });
// };

// const login = async (email, password) => {
//   const response = await api.post('/auth/login', { email, password });
//   if (response.data.token) {
//     // Store user and token after successful login
//     localStorage.setItem('token', response.data.token);
//     localStorage.setItem('user', JSON.stringify(response.data.user));
//   }
//   return response.data;
// };

// const logout = () => {
//   localStorage.removeItem('user');
//   localStorage.removeItem('token');
// };

// const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem('user'));
// };

// const authService = {
//   signup,
//   login,
//   logout,
//   getCurrentUser,
// };

// export default authService;

// src/services/authService.js
// src/services/authService.js

import api from './api';

const signup = (userData) => {
  return api.post('/auth/signup', userData);
};

const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  
  // This is the critical fix. It saves the token and the full user object.
  if (response.data.token && response.data.user) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;