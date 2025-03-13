/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      }
    ]
  },
  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
}

module.exports = nextConfig 