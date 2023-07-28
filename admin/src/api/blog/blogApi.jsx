import axios from 'axios';

export const blogApi = axios.create({
  baseURL: 'https://admin-frontend-backend-single-app.onrender.com/api/blogs'
});