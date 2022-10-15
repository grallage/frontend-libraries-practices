const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // default: true
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // https://pullanswer.com/questions/with-msw-unhandledrejection-error-err_unsupported_dir_import
  // fixed msw issue: Did you mean to import @mswjs/interceptors/lib/interceptors/ClientRequest/index.js?
  experimental: {
    esmExternals: false,
  },
}

module.exports = nextConfig
