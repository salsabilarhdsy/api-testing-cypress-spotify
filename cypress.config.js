const { defineConfig } = require('cypress');  // dari 'cypress'
require('dotenv').config();                    // import dan jalankan dotenv config

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://api.spotify.com/v1",
    env: {
      SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
      SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
      SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
    },
  },
});
