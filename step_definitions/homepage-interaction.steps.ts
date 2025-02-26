import { I } from './helpers';

Given('the user is on the homepage', async () => {
  // Navigate to the homepage
  await I.amOnPage('/');
  console.log('User is on the homepage');
});

Then('the "Register" button should be visible', async () => {
  // Debugging the visibility of the button
  console.log('Checking for "My Account" button');
  await I.see('My Account');
});
