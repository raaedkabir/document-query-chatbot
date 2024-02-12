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
  webpack: (config, { webpack }) => {
    config.externals.push({
      canvas: 'commonjs canvas',
    })

    // https://github.com/langchain-ai/langchain/issues/4491#issuecomment-1935274842
    config.externals['node:fs'] = 'commonjs node:fs'
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '')
      })
    )

    return config
  },
}

module.exports = nextConfig
