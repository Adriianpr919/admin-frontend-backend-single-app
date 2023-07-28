import axios from 'axios';

export const orderApi = axios.create({
  baseURL: "https://admin-frontend-backend-single-app.onrender.com/api/orders"
});