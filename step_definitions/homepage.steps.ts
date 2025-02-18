import { I } from './helpers';

Given('I open the website', () => {
    I.amOnPage('/'); // Load the homepage
});

Then('I should see the homepage', () => {
    I.waitForElement("body", 10); // Ensure the page has loaded
    I.saveScreenshot('HomepageLoaded.png'); // Debugging screenshot
});
