import axios from 'axios';

export const subcategoryApi = axios.create({
  baseURL: 'https://admin-frontend-backend-single-app.onrender.com/api/subcategory'
});