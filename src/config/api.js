// src/config/api.js
const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// Auth API endpoints
export const AUTH_URL = `${BASE_URL}/user`;
export const ADMIN_LOGIN_URL = `${AUTH_URL}/admin/login`;

// Order Management API endpoints - Fixed routing
export const API_URL = BASE_URL;
export const ORDER_MANAGEMENT_URL = `${BASE_URL}/admin/orders`;  // This should work with backend route
export const ORDER_STATUS_UPDATE_URL = (id) => `${BASE_URL}/admin/orders/${id}/status`;  // Fixed path

// Product API endpoints
export const PRODUCT_URL = `${BASE_URL}/sampleproduct`;
export const PRODUCT_ALL_URL = `${PRODUCT_URL}/all`;
export const PRODUCT_ADD_URL = `${PRODUCT_URL}/add`;
export const PRODUCT_UPDATE_URL = (id) => `${PRODUCT_URL}/update/${id}`;
export const PRODUCT_DELETE_URL = (id) => `${PRODUCT_URL}/delete/${id}`;

//Appointment API endpoint
export const APPOINTMENTS_URL = `${BASE_URL}/appointments`; // For appointment operations

export default {
  API_URL,
  AUTH_URL,
  ADMIN_LOGIN_URL,
  ORDER_MANAGEMENT_URL,
  ORDER_STATUS_UPDATE_URL,
  PRODUCT_URL,
  PRODUCT_ALL_URL,
  PRODUCT_ADD_URL,
  PRODUCT_UPDATE_URL,
  PRODUCT_DELETE_URL
};