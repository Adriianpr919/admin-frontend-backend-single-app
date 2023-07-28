import axios from 'axios';

export const tripletecategoryApi = axios.create({
  baseURL: 'https://admin-frontend-backend-single-app.onrender.com/api/tripletecategory'
});