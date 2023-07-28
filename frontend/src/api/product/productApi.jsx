import axios from 'axios';

export const productApi = axios.create({
  baseURL: "https://admin-frontend-backend-single-app.onrender.com/api/products"
});