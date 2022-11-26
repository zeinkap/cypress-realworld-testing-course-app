import { defineConfig } from "cypress"

export default defineConfig({
  projectId: 'hbgmom',
  experimentalWebKitSupport: true,
  component: {
    viewportHeight: 1000,
    viewportWidth: 1280,
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
    viewportHeight: 1000,
    viewportWidth: 1280,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
