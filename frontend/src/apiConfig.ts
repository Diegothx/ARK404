import { OpenAPI } from './api/core/OpenAPI'; 
// Dynamically set BASE from Vite env variable 
OpenAPI.BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';