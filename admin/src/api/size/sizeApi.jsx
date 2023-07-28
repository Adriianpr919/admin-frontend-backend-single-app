import axios from 'axios';

export const sizeApi = axios.create({
  baseURL: 'https://admin-frontend-backend-single-app.onrender.com/api/sizes'
});