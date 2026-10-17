const path = require('path')

// Blog images are served from the R2 public URL (r2.dev or a custom domain)
const getR2RemotePattern = () => {
    if (!process.env.R2_PUBLIC_URL) return []
    const { protocol, hostname } = new URL(process.env.R2_PUBLIC_URL)
    return [{ protocol: protocol.replace(':', ''), hostname }]
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    outputFileTracingRoot: path.join(__dirname),
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'c.tenor.com' },
            ...getR2RemotePattern(),
        ],
    },
}

module.exports = nextConfig
