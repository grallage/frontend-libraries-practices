import { defineConfig } from "cypress";

// https://docs.cypress.io/guides/references/configuration
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },
});
