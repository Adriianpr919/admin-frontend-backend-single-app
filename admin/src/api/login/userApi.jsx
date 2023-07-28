import axios from 'axios';

export const userApi = axios.create({
  baseURL: 'https://admin-frontend-backend-single-app.onrender.com/api/users'
});