/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  env: {
    AUTH0_BASE_URL: process.env.VERCEL_URL || 'http://localhost:3000',
  },
}

const pwaConfig = {
  pwa: {
    dest: 'public',
  },
}

const innerConfig = Object.assign({}, nextConfig, pwaConfig)
const withPWA = require('next-pwa')

// do not activate pwa in development environment
const config = process.env.NODE_ENV !== 'development' ? withPWA(innerConfig) : nextConfig

module.exports = config
