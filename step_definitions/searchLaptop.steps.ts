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
