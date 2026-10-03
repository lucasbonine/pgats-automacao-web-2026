const { defineConfig } = require("cypress");
const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, ".env"), quiet: true });

if (!process.env.CYPRESS_BASE_URL) {
  throw new Error("Defina CYPRESS_BASE_URL no .env. Use .env.example como modelo.");
}

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    watchForFileChanges: false,
     video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
