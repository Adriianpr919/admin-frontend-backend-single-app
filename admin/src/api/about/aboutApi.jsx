import axios from 'axios';

export const aboutApi = axios.create({
  baseURL: 'https://admin-frontend-backend-single-app.onrender.com/api/abouts'
});