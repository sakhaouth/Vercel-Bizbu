/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env :
  {
    // PUBLIC : 'http://localhost:8000'
    PUBLIC : 'https://api-bizbud.onrender.com'
  },
}

module.exports = nextConfig
