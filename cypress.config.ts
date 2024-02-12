import { defineConfig } from 'cypress'

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: true,
  watchForFileChanges: false,
  screenshotOnRunFailure: true,
  chromeWebSecurity: false,
  screenshotsFolder: 'cypress/report/screenshots',
  videosFolder: 'cypress/report/videos',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/report',
    overwrite: true,
    reportPageTitle: 'Tests Run Report',
    saveAllAttempts: false,
    charts: true,
    embeddedScreenshots: true,
    videoOnFailOnly: true
  },
  retries: 1,
  e2e: {
    baseUrl: 'https://allo.ua/',
    experimentalModifyObstructiveThirdPartyCode: true,
    setupNodeEvents (on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    }
  }
})
