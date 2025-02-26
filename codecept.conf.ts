require('dotenv').config();
const argv = require('minimist')(process.argv.slice(2));

// Set environment variables from CLI arguments
if (argv.email) process.env.EMAIL = argv.email;
if (argv.password) process.env.PASSWORD = argv.password;

// Validate credentials
if (!process.env.EMAIL || !process.env.PASSWORD) {
  throw new Error('Please provide credentials using --email=... --password=... or environment variables');
}

// Import playwright-extra and the stealth plugin
const playwrightExtra = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth');
playwrightExtra.chromium.use(stealth());

exports.config = {
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://www.kilimall.co.ke',
      show: true,
      // Use our custom playwright-extra (with stealth) instead of default playwright
      playwright: playwrightExtra,
      // Optionally set a custom User-Agent and extra HTTP headers globally
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
    I: './steps_file'  // Global steps file if needed
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature', // Path for your feature files
    steps: [
      './step_definitions/homepage.steps.ts',
      './step_definitions/homepage-interaction.steps.ts',
      './step_definitions/login.steps.ts',
      './step_definitions/searchLaptop.steps.ts'
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
  tests: './tests', // Path to your test files
  name: 'noPWebsite-test'
};
