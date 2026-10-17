/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [{ protocol: 'https', hostname: 'c.tenor.com' }],
    },
}

module.exports = nextConfig
