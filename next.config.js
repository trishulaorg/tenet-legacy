/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // reactStrictMode: true, 
  env: {
    AUTH0_BASE_URL: process.env.VERCEL_URL || 'http://localhost:3000',
  },
}

const withPWA = require('next-pwa')({
  dest: 'public',
})

// do not activate pwa in development environment
const config = process.env.NODE_ENV !== 'development' ? withPWA(nextConfig) : nextConfig

module.exports = config
