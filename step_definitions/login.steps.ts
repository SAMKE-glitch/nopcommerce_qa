import { I } from './helpers';

// Step: Navigate to the login page
Given("I am on the login page", () => {
  I.amOnPage('/login');    // Open the login page
  I.wait(3);               // Wait 3 seconds to ensure the page loads
});

// Step: Enter credentials using I.fillForm
When("I enter {string} as the email and {string} as the password", (email, password) => {
  // Using I.fillForm to fill the login form.
  // Adjust the form selector if needed (e.g., "form#loginForm").
  I.fillField("Email", email);
  I.fillField("Password", password);
});

// Step: Verify that credentials have been entered correctly
Then("credentials are successfully entered", async () => {
  // Grab the values from the fields to verify they were filled correctly.
  const emailVal = await I.grabValueFrom("input[name='Email']");
  const passwordVal = await I.grabValueFrom("input[name='Password']");

  if (emailVal !== "sammythemwa@gmail.com" || passwordVal !== "Ednah2025") {
    throw new Error("Credentials not correctly entered");
  }
  I.say("Credentials are successfully entered.");
});
