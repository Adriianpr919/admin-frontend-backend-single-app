import axios from 'axios';

export const categoryApi = axios.create({
  baseURL: 'https://admin-frontend-backend-single-app.onrender.com/api/category'
});