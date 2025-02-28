/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // This tells Next.js that the app lives in the src directory
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig 