module.exports = {
  env: {
    AUTH0_BASE_URL: process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'
  }
};
