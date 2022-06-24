const { i18n } = require('./next-18next-config')

module.exports = {
  reactStrictMode: true,
  i18n,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  
}
