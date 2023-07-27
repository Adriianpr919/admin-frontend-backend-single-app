module.exports = {
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      'process.env.HTTPS': JSON.stringify(process.env.HTTPS),
      'process.env.MONGODB_URL': JSON.stringify(process.env.MONGODB_URL),
      'process.env.HOSTNAME': JSON.stringify(process.env.HOSTNAME),
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.TOKEN_SECRET': JSON.stringify(process.env.TOKEN_SECRET),
      'process.env.REACT_APP_API_KEY': JSON.stringify(process.env.REACT_APP_API_KEY),
      'process.env.DEV_REACT_APP_BASE_URL': JSON.stringify(process.env.DEV_REACT_APP_BASE_URL),
      'process.env.REACT_APP_BASE_URL': JSON.stringify(process.env.REACT_APP_BASE_URL),
      'process.env.NODE_ENV': '"development"' // Tells React to build in
    })
  ]
};