/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ protocol: 'https', hostname: 'm.media-amazon.com' }]
    },
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            net: false,
            dns: false,
            child_process: false,
            tls: false,
        }
        return config;
    }

}

module.exports = nextConfig
