module.exports = {
  reactStrictMode: true,
  env: {
    AUTH0_BASE_URL: process.env.VERCEL_URL || 'http://localhost:3000',
  },
}
