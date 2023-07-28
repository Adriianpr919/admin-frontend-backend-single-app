import axios from 'axios';

export const colorStoneApi = axios.create({
  baseURL: 'https://admin-frontend-backend-single-app.onrender.com/api/colorsstones'
});