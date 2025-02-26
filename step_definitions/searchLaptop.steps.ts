// Import login steps to reuse the authentication workflow
import './login.steps';
import { I } from './helpers';

// Step: Click on the search field container to focus the input field
When("I click on the search field container", () => {

  I.click(".van-field__control");
});

// Step: Type a query into the search field (the actual input element)
When("I type {string} into the search field", (query: string) => {

  I.fillField(".van-field__control", query);
});

// Step: Click the search button to trigger the search
When("I click the search button", () => {
  I.click(".search-button");
});

// Step: Verify that search results contain the expected query
Then("I should see search results for {string}", (query: string) => {
  // Adjust the selector below to match the actual search results container in your app.
  I.waitForElement(".result-listings-wrapper", 5);
  I.see(`results for ${query}`);
});

// Step: Click on the first search result item
When("I click on the first search result item", () => {
  // Wait for listings to load and click the first item
  I.waitForElement('.listing-item', 5);
  I.click(locate('.listing-item').first().find('a'));
  I.wait(5); // Allow time for the new tab to open
  I.switchToNextTab(); // Switch control to the new tab where the product is displayed
});

// Step: Add the item to the cart
When("I add the item to the cart", () => {
  // Wait for the product page to load and click the "Add to Cart" button
  I.waitForElement('button.opt-btn.yellow-btn', 5);
  I.click('button.opt-btn.yellow-btn');
});

// Step: Verify the item is in the cart
Then("I should see the success message {string}", (message: string) => {
  // Wait for the transient success message to appear
  I.waitForText(message, 5);
});

// Step: Verify the cart notification icon is visible
Then("I should see the cart notification icon", () => {
  // Additionally, check that the cart notification icon is present
  I.waitForElement('img.opt-btn-icon', 5);
  I.seeElement('img.opt-btn-icon');
});

