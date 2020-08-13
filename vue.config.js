module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "BusPwa",
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/ctpcj-scraper\.now\.sh/,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "ctpcj-scraper",
            expiration: {
              maxEntries: 15,
              maxAgeSeconds: 864000
            }
          }
        }
      ]
    }
  }
};
