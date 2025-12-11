const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development"
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost"
      },
      {
        protocol: "http",
        hostname: "127.0.0.1"
      },
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  // Externalize problematic native modules
  serverExternalPackages: [
    "sharp",
    "onnxruntime-node",
    "@xenova/transformers"
  ],
  webpack: (config, { isServer }) => {
    // Exclude native node modules from webpack bundling
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push({
        "onnxruntime-node": "commonjs onnxruntime-node",
        sharp: "commonjs sharp",
        "@xenova/transformers": "commonjs @xenova/transformers"
      })
    }

    // Ignore .node binary files
    config.module.rules.push({
      test: /\.node$/,
      loader: "ignore-loader"
    })

    // Fallbacks for browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        os: false
      }
    }

    return config
  }
}

module.exports = withBundleAnalyzer(withPWA(nextConfig))
