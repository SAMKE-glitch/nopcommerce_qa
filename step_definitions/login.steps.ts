const { I } = require('./helpers');

// Helper functions for human-like behavior
const humanDelay = async (min = 1000, max = 5000) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  await I.wait(delay / 1000);
};

const randomScroll = async () => {
  const viewportHeight = await I.executeScript(() => window.innerHeight);
  const scrollDistance = Math.floor(Math.random() * viewportHeight * 0.7);
  await I.scrollTo(0, scrollDistance);
};

const simulateTyping = async (selector, text) => {
  // Wait for the element to be visible before typing
  await I.waitForVisible(selector, 20);
  const chars = text.split('');
  for (const char of chars) {
    await I.appendField(selector, char);
    await humanDelay(50, 150);
  }
};

// New helper function to complete the Cloudflare challenge
const completeCloudflareChallenge = async () => {
  const captchaIframe = "iframe[title='reCAPTCHA']";
  const simpleCheckbox = "input[type='checkbox']";

  // Check for reCAPTCHA iframe first
  if (await I.grabNumberOfVisibleElements(captchaIframe) > 0) {
    await I.switchTo(captchaIframe);
    await I.usePlaywrightTo('Click reCAPTCHA checkbox', async ({ page }) => {
      const checkbox = await page.$('div.recaptcha-checkbox-border');
      if (checkbox) {
        const box = await checkbox.boundingBox();
        await page.mouse.click(
          box.x + box.width / 2 + Math.random() * 10 - 5,
          box.y + box.height / 2 + Math.random() * 10 - 5,
          { delay: 100 + Math.random() * 100 }
        );
      }
    });
    await I.switchTo();
    await humanDelay(3000, 5000);
  } else {
    // For a simple checkbox challenge, try repeatedly clicking until it disappears
    let attempts = 0;
    const maxAttempts = 5;
    let checkboxVisible = await I.grabNumberOfVisibleElements(simpleCheckbox) > 0;
    while (checkboxVisible && attempts < maxAttempts) {
      attempts++;
      await I.waitForVisible(simpleCheckbox, 10);
      await I.click(simpleCheckbox);
      await humanDelay(2000, 3000);
      try {
        await I.waitForInvisible(simpleCheckbox, 5);
        checkboxVisible = false;
      } catch (err) {
        checkboxVisible = true;
      }
    }
    if (checkboxVisible) {
      console.log("Cloudflare challenge checkbox still visible after multiple attempts.");
    }
  }
};

// ------------------------------
// Successful Login Scenario
// ------------------------------

Given("I am on the login page", async () => {
  await I.amOnPage('/login');
  // Adjusted selector for the email input to match the DOM element
  await I.waitForVisible('input[name="Email"]', 20);
  await humanDelay(2000, 4000);
  await randomScroll();
});

When("I enter {string} as the email and {string} as the password", async (email, password) => {
  await simulateTyping('input[name="Email"]', email);
  await humanDelay(1000, 2000);
  await randomScroll();
  await simulateTyping('input[name="Password"]', password);
});

When("I click the login button", async () => {
  await I.usePlaywrightTo('Simulate mouse movement', async ({ page }) => {
    await page.mouse.move(
      Math.floor(Math.random() * 800),
      Math.floor(Math.random() * 600)
    );
  });
  await I.click(".login-button");
  await humanDelay(500, 1500);
});

When("I complete human verification", async () => {
  await humanDelay(2000, 4000);
  await completeCloudflareChallenge();
});

Then("I should be redirected to the dashboard", async () => {
  // Instead of waiting for div.dashboard, verify that the "My account" link is visible
  await I.waitForElement("a.ico-account", 30);
  await I.see("My account", "a.ico-account");
  await randomScroll();
});

// ------------------------------
// Unsuccessful Login Scenario
// ------------------------------

When("I enter {string} as the email and {string} as the password", async (email, password) => {
  await simulateTyping('input[name="Email"]', email);
  await humanDelay(1000, 2000);
  await randomScroll();
  await simulateTyping('input[name="Password"]', password);
});

Then("I should see an error message", async () => {
  await I.click(".login-button");
  await humanDelay(1500, 3000);
  await completeCloudflareChallenge();
  await I.see("Login was unsuccessful.");
});
