# nopCommerce Website Automation Tests

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Automated test suite for nopCommerce website functionality using CodeceptJS with Playwright, TypeScript and Gherkin syntax.

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+
- Codeceptjs
- Playwright
- TypeScript
- Gherkin Syntax

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/SAMKE-glitch/nopcommerce_qa.git
cd nopcommerce_qa
```

2. **Install dependencies**
```bash
npm install
```
3. **Install Playwright browsers**
```bash
npx playwright install
```

4. **🔧 Gherkin Integration**
````bash
npx codeceptjs gherkin:init
````
5. **🛠️ Configuration**

Prior to executing tests, please ensure that your configuration files (e.g., `codecept.conf.ts` or `codecept.conf.js`) are properly tailored to your testing environment. This includes, but is not limited to, setting the appropriate base URL, browser options, and timeout values. Adjust these settings to align with your specific infrastructure requirements.

6. **⚙️🧪 Running Tests**
````bash
npx codeceptjs run --features
````
7. **Run Specific Tests**
````bash
# Run tests with grep pattern
npx codeceptjs run --grep "Login Functionality"

# Run in headed mode
npx codeceptjs run --features --plugins "windowSize=1920x1080, headed"
````

8. **Run With UI**
````bash
npx codecept-ui
````
9. **Common Scripts (add to package.json)**
````bash
"scripts": {
  "test": "codeceptjs run --features",
  "test:headed": "codeceptjs run --features --plugins \"windowSize=1920x1080, headed\"",
  "test:login": "codeceptjs run --grep \"Login Functionality\"",
  "ui": "codecept-ui"
}
````

10. **📂 Project Structure**
````bash
.
├── README.md
├── codecept.conf.ts         // CodeceptJS configuration file
├── features                 // Directory for Gherkin feature files
├── homepageteststests       // Test cases specific to homepage functionality
├── node_modules             // Dependency directory managed by npm
├── output                   // Test output and logs
├── package-lock.json        // Ensures consistent dependency installation
├── package.json             // Project metadata and scripts
├── step_definitions         // Contains the step definitions for Gherkin tests
├── steps.d.ts               // TypeScript definitions for steps
├── steps_file.ts            // Common steps or utility functions for tests
├── tests                    // Additional test suites
└── tsconfig.json            // TypeScript configuration file

````