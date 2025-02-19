import { I } from './helpers';

// Step: Navigate to the login page
Given("I am on the login page", () => {
  I.amOnPage('/login'); // Open the login page
  I.wait(3);            // Wait 3 seconds to ensure the page loads
});

// Step: Enter credentials using I.fillForm
When("I enter my credentials", () => {
  // Using I.fillForm to fill the login form.
  // Adjust the form selector if needed (e.g., "form#loginForm").
  I.fillField("Email", process.env.EMAIL);
  I.fillField("Password", process.env.PASSWORD);
});

// Step: Verify that credentials have been entered correctly
Then("credentials are successfully entered", async () => {
  // Grab the values from the fields to verify they were filled correctly.
  const emailVal = await I.grabValueFrom("input[name='Email']");
  const passwordVal = await I.grabValueFrom("input[name='Password']");

  if (emailVal !== process.env.EMAIL || passwordVal !== process.env.PASSWORD) {
    throw new Error("Credentials not correctly entered");
  }
  I.say("Credentials are successfully entered.");
});