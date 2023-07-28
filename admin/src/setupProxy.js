const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://admin-frontend-backend-single-app.onrender.com',
      changeOrigin: true,
    })
  );
};