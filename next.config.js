const path = require('path')

const isProdMode = process.env.NODE_ENV === 'production'
const removeConsole = isProdMode ? { exclude: ['error'] } : false

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // default: true
  compiler: {
    // Enabled by default in development, disabled in production to reduce file size,  setting this will override the default for all environments.
    styledComponents: false,
    emotion: false,
    removeConsole: removeConsole,
  },
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // https://pullanswer.com/questions/with-msw-unhandledrejection-error-err_unsupported_dir_import
  // fixed msw issue: Did you mean to import @mswjs/interceptors/lib/interceptors/ClientRequest/index.js?
  experimental: {
    esmExternals: false,
  },
}

module.exports = nextConfig
