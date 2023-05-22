const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.notion.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': 'v1',
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      },
    })
  )
}
