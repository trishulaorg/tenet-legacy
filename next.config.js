/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AUTH0_BASE_URL: process.env.VERCEL_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig
