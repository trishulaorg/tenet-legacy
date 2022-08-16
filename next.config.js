/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
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
const nextConfigWithPWA = withPWA(innerConfig)

module.exports = nextConfigWithPWA
