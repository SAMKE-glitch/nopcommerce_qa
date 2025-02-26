// Import login steps to reuse the authentication workflow
import './login.steps';
import { I } from './helpers';

// -----------------------------
// Search & Add-to-Cart Steps
// -----------------------------

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
  I.waitForElement(".result-listings-wrapper", 10);
  I.see(`results for ${query}`);
});

// Step: Click on the first search result item and switch to new tab
When("I click on the first search result item", () => {
  I.waitForElement('.listing-item', 5);
  I.click(locate('.listing-item').first().find('a'));
  I.wait(5);           // Allow time for the new tab to open
  I.switchToNextTab(); // Switch control to the new tab where the product is displayed
});

// Step: Add the item to the cart in the new tab
When("I add the item to the cart", () => {
  I.waitForElement('button.opt-btn.yellow-btn', 5);
  I.click('button.opt-btn.yellow-btn');
});

// Step: Verify the transient success message appears
Then("I should see the success message {string}", (message: string) => {
  I.waitForText(message, 5);
});

// Step: Verify the cart notification icon is visible
Then("I should see the cart notification icon", () => {
  I.waitForElement('img.opt-btn-icon', 5);
  I.seeElement('img.opt-btn-icon');
});

// -----------------------------
// Checkout Flow Steps
// -----------------------------

// Step: Confirm there is an item in the cart
Given("I have an item in my cart", () => {
  I.waitForElement('img.opt-btn-icon', 5);
  I.seeElement('img.opt-btn-icon');
});

// Step: Click on the cart icon
When("I click on the cart icon", () => {
  I.waitForElement('img.opt-btn-icon', 5);
  I.click('img.opt-btn-icon');
});

// Step: Click on the Proceed to Check out button
When("I click on the Proceed to Check out button", () => {
  I.waitForElement("button.check-out-btn", 10);
  I.waitForText("Proceed to Check out", 10);
  I.click(locate("button").withText("Proceed to Check out"));
});

// Step: Verify redirection to the checkout page
Then("I should be redirected to the checkout page", () => {
  I.waitForURL("https://www.kilimall.co.ke/checkout?form=cart", 30);
});
