module.exports = {
  pwa: {
    name: "BusPwa",
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/ctpcj-scraper\.now\.sh/,
          handler: "staleWhileRevalidate",
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
}
