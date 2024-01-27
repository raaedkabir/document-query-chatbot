/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  webpack: (config) => {
    config.externals.push({
      canvas: 'commonjs canvas',
    })

    return config
  },
}

module.exports = nextConfig
