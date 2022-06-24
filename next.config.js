module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en-US", "pt-BR"],
    defaultLocale: "en-US",
    fallbackLng: "en-US",
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },

}
