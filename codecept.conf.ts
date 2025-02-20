// codecept.config.ts
const playwrightExtra = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth');

// Apply the stealth plugin to the chromium instance from playwright-extra
playwrightExtra.chromium.use(stealth());

exports.config = {
  output: './output',
  helpers: {
    Playwright: {
      // Override the default playwright with our stealth-enabled instance
      playwright: playwrightExtra,
      browser: 'chromium',
      url: 'https://demo.nopcommerce.com',
      show: true,
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      browserContextOptions: {
        extraHTTPHeaders: {
          'Accept-Language': 'en-US,en;q=0.9'
        }
      }
    }
  },
  include: {
    I: './steps_file'
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: [
      './step_definitions/homepage.steps.ts',
      './step_definitions/homepage-interaction.steps.ts',
      './step_definitions/login.steps.ts'
    ]
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    },
    retryTo: {
      enabled: true
    },
    eachElement: {
      enabled: true
    },
    pauseOnFail: {}
  },
  stepTimeout: 0,
  stepTimeoutOverride: [
    { pattern: 'wait.*', timeout: 0 },
    { pattern: 'amOnPage', timeout: 0 }
  ],
  tests: './tests',
  name: 'noPWebsite-test'
};
