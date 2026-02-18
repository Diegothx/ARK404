import { OpenAPI } from './api/core/OpenAPI';

// Get the backend URL from Vite env variables
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Set OpenAPI.BASE only if defined
if (backendUrl) {
  OpenAPI.BASE = backendUrl; 
} else {
  console.warn('VITE_BACKEND_URL is not set; OpenAPI.BASE remains unchanged.');
}
