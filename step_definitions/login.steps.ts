// Assuming your helper file exports I using inject()
import { I } from './helpers';

// Step: Navigate to the login page
Given("I am on the login page", () => {
  I.amOnPage('/login'); // Open the login page
  I.wait(3);            // Wait 3 seconds to ensure the page loads
});

// Step: Enter account credentials (phone/email and password)
When("I enter my account credentials", () => {
  I.fillField("account", process.env.EMAIL);     // Using EMAIL env var for account input (phone/email)
  I.fillField("password", process.env.PASSWORD);   // Using PASSWORD env var for password input
});

// Step: Verify that credentials have been entered correctly
Then("credentials are successfully entered", async () => {
  const accountVal = await I.grabValueFrom("input[name='account']");
  const passwordVal = await I.grabValueFrom("input[name='password']");
  if (accountVal !== process.env.EMAIL || passwordVal !== process.env.PASSWORD) {
    throw new Error("Credentials not correctly entered");
  }
  I.say("Credentials are successfully entered.");
});

// Step: Click the Submit button
When("I click the Submit button", () => {
  I.click("button[type='submit']"); // Updated selector for the Submit button
  I.wait(3); // Allow time for transitions
});

// Step: Verify redirection to the dashboard (Kilimall homepage)
Then("I should be redirected to the dashboard", () => {
  I.seeInCurrentUrl("https://www.kilimall.co.ke/"); // Verifies that the current URL matches the expected destination
});

