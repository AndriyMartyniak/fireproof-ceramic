/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fireproof-ceramic.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig 