import { Given, When, Then } from '@codeceptjs/gherkin';
import { I } from '../steps_file';

Given('I am on the homepage', async () => {
  await I.amOnPage('/');
});

When('I search for {string}', async (searchTerm: string) => {
  await I.fillField('input[id="small-searchterms"]', searchTerm);
  await I.click('button[type="submit"]');
});

Then('I should see results related to {string}', async (searchTerm: string) => {
  await I.seeInCurrentUrl(`/search?q=${searchTerm}`);  // ✅ Check URL change
  await I.seeInTitle(searchTerm);
  await I.seeElement('.product-item');
});
