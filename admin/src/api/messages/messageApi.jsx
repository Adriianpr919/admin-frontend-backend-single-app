import axios from 'axios';

export const messageApi = axios.create({
  baseURL: 'https://admin-frontend-backend-single-app.onrender.com/api/messagesopcions'
});