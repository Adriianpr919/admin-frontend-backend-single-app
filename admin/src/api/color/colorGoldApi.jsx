import axios from 'axios';

export const colorGoldApi = axios.create({
  baseURL: 'https://admin-frontend-backend-single-app.onrender.com/api/colorsgolds'
});