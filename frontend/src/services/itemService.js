// import api from './api'; // Import the same centralized api

// const getItems = () => {
//   return api.get('/items');
// };

// const createItem = (itemData) => {
//   // This request will now automatically include the 'x-auth-token' header
//   return api.post('/items', itemData);
// };

// const itemService = {
//   getItems,
//   createItem,
// };

// export default itemService;

// src/services/itemService.js

// import api from './api'; // Import the centralized api instance with the interceptor

// const getItems = () => {
//   return api.get('/items');
// };

// // This function will now automatically have the auth token attached.
// const createItem = (itemData) => {
//   return api.post('/items', itemData);
// };
// const claimItem = (id) => {
//   return api.post(`/items/${id}/claim`);
// };
// const itemService = {
//   getItems,
//   createItem,
//   claimItem,
// };

// export default itemService;

// src/services/itemService.js

import api from './api'; // Import the central api instance with the interceptor

const getItems = () => {
  return api.get('/items');
};

const createItem = (itemData) => {
  return api.post('/items', itemData);
};


// This function must use the 'api' instance to have the token attached
const claimItem = (id) => {
  return api.post(`/items/${id}/claim`);
};
const resolveItem = (id) => {
  return api.post(`/items/${id}/resolve`);
};
const itemService = {
  getItems,
  createItem,
  claimItem,
  resolveItem,
};


export default itemService;