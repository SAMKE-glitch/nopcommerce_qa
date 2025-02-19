import { I } from './helpers';

// ------------------------------
// Successful Login Scenario
// ------------------------------

// Step: Navigate to the login page and wait for the form to load
Given("I am on the login page", () => {
  I.amOnPage('/login');                // Open the login page
  I.wait(3);                           // Wait 3 seconds to ensure the page loads
});

// Step: Enter email and password into the login form
When("I enter {string} as the email and {string} as the password", (email, password) => {
  I.fillField("Email", email);         // Fill in the email field with the provided email
  I.fillField("Password", password);   // Fill in the password field with the provided password
});

// Step: Click the login button to trigger the CAPTCHA and login process
When("I click the login button", () => {
  I.click(".login-button");            // Click the login button
  // Wait for CAPTCHA elements to appear after clicking the login button
  I.waitForElement("input[type='checkbox']",10);
  I.click("input[type='checkbox']");
});

// Step: Complete human verification by handling the CAPTCHA (if present)
When("I complete human verification", async () => {
  I.wait(2); // Brief pause to ensure CAPTCHA elements are fully loaded

  // Define selectors for potential CAPTCHA types
  const captchaCheckbox = "label.cb-lb input[type='checkbox']"; // Basic checkbox CAPTCHA
  const captchaIframe = "iframe[title='reCAPTCHA']";             // reCAPTCHA iframe

  // Check if reCAPTCHA iframe exists and handle it
  if (await I.grabNumberOfVisibleElements(captchaIframe) > 0) {
    I.switchTo(captchaIframe);                        // Switch to the reCAPTCHA iframe context
    I.click("div.recaptcha-checkbox-border");         // Click the reCAPTCHA checkbox
    I.switchTo();                                     // Switch back to the main page context
    I.wait(3);                                        // Wait for CAPTCHA verification to process
  }
  // Else, if a basic checkbox CAPTCHA is present, handle it directly
  else if (await I.grabNumberOfVisibleElements(captchaCheckbox) > 0) {
    I.checkOption(captchaCheckbox);                   // Check the CAPTCHA checkbox
    I.wait(3);                                        // Wait for CAPTCHA verification to process
  }
  // Log if no CAPTCHA is detected
  else {
    console.log("No CAPTCHA detected, proceeding...");
  }
});

// Step: Verify that the user is successfully redirected to the dashboard
Then("I should be redirected to the dashboard", () => {
  I.waitForElement("div.dashboard", 10); // Wait up to 10 seconds for the dashboard to load
  I.see("Welcome");                     // Verify that the "Welcome" text appears on the dashboard
});

// ------------------------------
// Unsuccessful Login Scenario
// ------------------------------

// Step: Navigate to the login page and wait for the form to load
Given("I am on the login page", () => {
  I.amOnPage('/login');                // Open the login page
  I.wait(3);                           // Wait 3 seconds to ensure the page loads
});

// Step: Enter email and password into the login form (for invalid login)
When("I enter {string} as the email and {string} as the password", (email, password) => {
  I.fillField("Email", email);         // Fill in the email field with the provided email
  I.fillField("Password", password);   // Fill in the password field with the provided password
});

// Step: Click the login button and verify that an error message is displayed
Then("I should see an error message", () => {
  I.click(".login-button");            // Click the login button
  I.see("Login was unsuccessful.");    // Verify that the expected error message is displayed
});
