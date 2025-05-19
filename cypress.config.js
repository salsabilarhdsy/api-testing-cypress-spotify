const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://api.spotify.com/v1", // adjust this to your base URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
