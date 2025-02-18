import { I } from './helpers';

Given('the user is on the registration page', async () => {
  await I.amOnPage('/register'); // Navigate to the registration page
  await I.seeInTitle('Register'); // Ensure the page title contains "Register"
  await I.seeElement('form'); // Ensure that the registration form is on the page
});

Then('the registration form should be visible', async () => {
  // Check that the form fields are visible (ensure labels or inputs are present)
  await I.fillField('First name');  // First name label
  await I.fillField('Last name');   // Last name label
  await I.fillField('email');       // Email label
  await I.fillField('Company name');    // Password label
  await I.fillField('Password'); // Confirm password label
});
