exports.config = {
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://demo.nopcommerce.com',
      show: true
    }
  },
  include: {
    I: './steps_file'  // This could still be your global steps file if you need one
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature', // Path for your feature files
    steps: ['./step_definitions/homepage.steps.ts', './step_definitions/homepage-interaction.steps.ts', './step_definitions/login.steps.ts'] // Directly include step definition files
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
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
    {
      pattern: 'amOnPage',
      timeout: 0
    }
  ],
  tests: './tests', // Make sure this is where your test files are
  name: 'noPWebsite-test'
};
