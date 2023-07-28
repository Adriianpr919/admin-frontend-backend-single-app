import axios from 'axios';

export const bannerApi = axios.create({
  baseURL: "https://admin-frontend-backend-single-app.onrender.com/api/banners"
});